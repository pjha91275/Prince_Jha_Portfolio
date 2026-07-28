"use client";
import { portfolioData } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function EducationSection() {
  const { education } = portfolioData;

  return (
    <section className="section education-section" id="education">
      <ScrollReveal>
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
      </ScrollReveal>
    </section>
  );
}
