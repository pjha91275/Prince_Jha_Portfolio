"use client";
import { GraduationCap, ShoppingBag, FileText, TrendingUp, GitFork, ExternalLink, Check } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function ProjectsSection() {
  const { projects } = portfolioData;

  // Helper to map icon keys to Lucide icons
  const getIcon = (key) => {
    switch (key) {
      case "GraduationCap": return <GraduationCap size={24} />;
      case "ShoppingBag": return <ShoppingBag size={24} />;
      case "FileText": return <FileText size={24} />;
      case "TrendingUp": return <TrendingUp size={24} />;
      default: return <GraduationCap size={24} />;
    }
  };

  return (
    <section className="section projects-section" id="projects">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-grid">
        {projects.map(({ iconKey, title, type, desc, features, tech, github, demo, image }) => (
          <div className="project-card glass-card" key={title}>
            <div className="project-banner">
              <img 
                src={image} 
                alt={title} 
                className="project-thumbnail" 
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
              <div className="project-banner-overlay">
                <span className="overlay-icon-box">
                  {getIcon(iconKey)}
                </span>
              </div>
            </div>
            <div className="project-content">
              <h3>{title}</h3>
              <span className="project-type">{type}</span>
              <p>{desc}</p>
              <ul className="project-features">
                {features.map((f) => (
                  <li key={f}><Check size={14} />{f}</li>
                ))}
              </ul>
              <div className="project-tech">
                {tech.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                <a
                  href={github} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary project-link-btn"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
                >
                  <GitFork size={14} /> Code
                </a>
                <a
                  href={demo} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary project-link-btn"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Projects Callout */}
      <div className="more-projects-callout glass-card" style={{
        marginTop: "2.5rem",
        padding: "1.75rem 2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        borderRadius: "var(--radius-lg, 16px)",
        border: "1px dashed rgba(255, 255, 255, 0.15)",
        background: "rgba(255, 255, 255, 0.02)"
      }}>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          lineHeight: "1.6",
          margin: 0,
          maxWidth: "600px"
        }}>
          <strong style={{ color: "var(--text-primary)" }}>...and many more projects!</strong> Visit my GitHub to explore all 40+ repositories across full-stack applications, AI integrations, and hackathon projects.
        </p>
        <a
          href="https://github.com/pjha91275"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          id="more-projects-github-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.65rem 1.4rem",
            fontSize: "0.9rem",
            borderRadius: "var(--radius-md, 10px)"
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span>Visit GitHub to View All Projects</span>
          <ExternalLink size={14} />
        </a>
      </div>
      </ScrollReveal>
    </section>
  );
}
