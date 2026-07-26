"use client";
import { GraduationCap, ShoppingBag, FileText, GitFork, ExternalLink, Check } from "lucide-react";

const projects = [
  {
    icon: GraduationCap,
    title: "SkillBridge",
    type: "Placement Preparation Platform",
    desc: "An intelligent web ecosystem designed to streamline placement prep for students.",
    features: ["Resume Analysis", "Placement Readiness Score", "Skill Gap Analysis", "Roadmaps & DSA Tracker"],
    tech: ["Python", "Flask", "Tailwind CSS", "Gemini API"],
    github: "https://github.com/pjha91275/SkillBridge",
    demo: "https://skillbridgehq.vercel.app",
  },
  {
    icon: ShoppingBag,
    title: "Quickzy",
    type: "Quick Commerce Platform",
    desc: "High-performance quick-commerce web app built for rapid ordering and item delivery.",
    features: ["Secure Authentication", "Cart & Wishlist System", "Razorpay Payment Gateway", "Admin Product Dashboard"],
    tech: ["HTML5", "CSS3", "Vanilla JS", "NodeJS"],
    github: "https://github.com/pjha91275/Quickzy",
    demo: "https://quickzy-zap.vercel.app",
  },
  {
    icon: FileText,
    title: "Blog Management System",
    type: "Full Stack Blog Platform",
    desc: "A full stack content platform allowing developers to read, write, and render blogs.",
    features: ["JWT Secure Authentication", "Full Blog CRUD Actions", "Express Backend", "Markdown Blog Rendering"],
    tech: ["Express", "MongoDB", "NodeJS", "Bootstrap"],
    github: "https://github.com/pjha91275/Blog-Management-System",
    demo: "https://blog-management-system-kns5.onrender.com",
  },
];

export default function ProjectsSection() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-header">
        <span className="section-tag">My Work</span>
        <h2 className="section-title">Featured Projects</h2>
      </div>
      <div className="projects-grid">
        {projects.map(({ icon: Icon, title, type, desc, features, tech, github, demo }) => (
          <div className="project-card glass-card" key={title}>
            <div className="project-banner">
              <Icon size={40} />
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
    </section>
  );
}
