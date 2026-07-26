"use client";

const education = [
  { period: "2023 - Present", degree: "Bachelor of Engineering", field: "Computer Engineering", institute: "Thakur College of Engineering and Technology (TCET)", scoreLabel: "CGPI", scoreValue: "9.25" },
  { period: "2021 - 2023", degree: "Higher Secondary Certificate (HSC)", field: "Science Stream", institute: "Maharashtra State Board", scoreLabel: "Percentage", scoreValue: "78.83%" },
  { period: "2020 - 2021", degree: "Secondary School Certificate (SSC)", field: "General Education", institute: "Maharashtra State Board", scoreLabel: "Percentage", scoreValue: "78.80%" },
];

export default function EducationSection() {
  return (
    <section className="section education-section" id="education">
      <div className="section-header">
        <span className="section-tag">Qualifications</span>
        <h2 className="section-title">Education</h2>
      </div>
      <div className="timeline">
        {education.map((edu, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-dot" />
            <div className="timeline-content glass-card">
              <span className="timeline-date">{edu.period}</span>
              <h3>{edu.degree}</h3>
              <h4>{edu.field}</h4>
              <p className="institute">{edu.institute}</p>
              <div className="academic-score">
                <span className="score-label">{edu.scoreLabel}</span>
                <span className="score-value">{edu.scoreValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
