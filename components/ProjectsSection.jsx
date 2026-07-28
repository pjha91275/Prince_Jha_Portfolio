"use client";
import { GraduationCap, ShoppingBag, FileText, GitFork, ExternalLink, Check } from "lucide-react";
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
      </ScrollReveal>
    </section>
  );
}
