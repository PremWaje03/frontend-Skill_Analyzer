<div className="dashboard-placeholder">
  <h3>Skill Analysis Dashboard</h3>

  {analysis ? (
    <div className="analysis-result">
      <h4>Recommended Career Path</h4>
      <p>{analysis.recommended_path}</p>

      <h4>Skill Gap</h4>
      <ul>
        {analysis.skill_gap.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h4>Confidence</h4>
      <p>{analysis.confidence * 100}%</p>
    </div>
  ) : (
    <p>Your AI-generated insights and learning roadmap will appear here.</p>
  )}
</div>;
