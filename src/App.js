import Navbar from "./components/Navbar";
import SkillDragDrop from "./components/SkillDragDrop";

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1 style={{ textAlign: "center" }}>Skill Analyzer</h1>

        <SkillDragDrop />
      </div>
    </div>
  );
}

export default App;
