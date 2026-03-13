import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import "../styles/SkillDragDrop.css";
import { analyzeSkills } from "../services/skillService";
/* -------------------- Initial Skills -------------------- */

const initialSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Spring Boot",
  "Java",
  "Python",
  "Cyber Security",
  "Cloud",
  "AI/ML",
  "Data Science",
  "DevOps",
];

/* -------------------- Skill Categories -------------------- */

const skillCategories = [
  "Web Development",
  "Cyber Security",
  "Cloud Computing",
  "AI / ML",
  "Programming Languages",
];

/* -------------------- Draggable Skill -------------------- */

function DraggableSkill({ skill }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: skill,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="skill-card"
      style={style}
    >
      {skill}
    </div>
  );
}

/* -------------------- Droppable Box -------------------- */

function DroppableBox({ id, title, items, removeSkill }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`drop-box ${isOver ? "active-drop" : ""}`}>
      <h3>
        {title} ({items.length})
      </h3>

      {items.length === 0 && <p className="empty-text">Drag skills here</p>}

      {items.map((skill) => (
        <div key={skill} className="drop-skill">
          {skill}

          <button
            className="remove-btn"
            title="Remove skill"
            onClick={() => removeSkill(id, skill)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}

/* -------------------- Main Component -------------------- */

function SkillDragDrop() {
  const [available, setAvailable] = useState(initialSkills);
  const [learning, setLearning] = useState([]);
  const [master, setMaster] = useState([]);
  const [future, setFuture] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);

  const handleDragStart = (event) => {
    setActiveSkill(event.active.id);
  };

  const handleDragEnd = (event) => {
    const skill = event.active.id;
    const dropZone = event.over?.id;

    setActiveSkill(null);

    if (!dropZone) return;

    setAvailable((prev) => prev.filter((s) => s !== skill));

    if (dropZone === "learning" && !learning.includes(skill)) {
      setLearning((prev) => [...prev, skill]);
    }

    if (dropZone === "master" && !master.includes(skill)) {
      setMaster((prev) => [...prev, skill]);
    }

    if (dropZone === "future" && !future.includes(skill)) {
      setFuture((prev) => [...prev, skill]);
    }
  };

  /* Remove skill from box */

  const removeSkill = (section, skill) => {
    if (section === "learning") {
      setLearning((prev) => prev.filter((s) => s !== skill));
    }

    if (section === "master") {
      setMaster((prev) => prev.filter((s) => s !== skill));
    }

    if (section === "future") {
      setFuture((prev) => prev.filter((s) => s !== skill));
    }

    setAvailable((prev) => [...prev, skill]);
  };

  /* Analyze Button */

  const handleAnalyze = async () => {
    const data = {
      learning,
      master,
      future,
    };

    try {
      const result = await analyzeSkills(data);

      console.log("AI Result:", result);
    } catch (error) {
      console.error("Failed to analyze skills");
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {/* Page Header */}

      <div className="hero-section">
        <h1>SkillVista AI</h1>
        <p>
          Drag and organize your skills to analyze your future learning path
        </p>
      </div>

      {/* Skill Categories */}

      <div className="category-container">
        {skillCategories.map((cat) => (
          <div key={cat} className="category-card">
            {cat}
          </div>
        ))}
      </div>

      {/* Available Skills */}

      <h2 className="title">Available Skills</h2>

      <div className="skills-container">
        {available.map((skill) => (
          <DraggableSkill key={skill} skill={skill} />
        ))}
      </div>

      {/* Drop Sections */}

      <div className="drop-container">
        <DroppableBox
          id="learning"
          title="Currently Learning"
          items={learning}
          removeSkill={removeSkill}
        />

        <DroppableBox
          id="master"
          title="Master Skills"
          items={master}
          removeSkill={removeSkill}
        />

        <DroppableBox
          id="future"
          title="Future Goals"
          items={future}
          removeSkill={removeSkill}
        />
      </div>

      {/* Analyze Button */}

      <div className="analyze-container">
        <button onClick={handleAnalyze} className="analyze-btn">
          Analyze My Skills
        </button>
      </div>

      {/* Dashboard Section */}

      <div className="dashboard-placeholder">
        <h3>Skill Analysis Dashboard</h3>
        <p>Your AI-generated insights and learning roadmap will appear here.</p>
      </div>

      {/* Drag Overlay */}

      <DragOverlay>
        {activeSkill ? (
          <div className="skill-card overlay">{activeSkill}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default SkillDragDrop;
