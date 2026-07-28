"use client";
import { Download, Briefcase, MessageSquareCode, Layers, Binary, Globe, Settings } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

export default function HeroSection() {
  const { name, title, subtitles, bio, resumeLink } = portfolioData.personalInfo;
  
  // Floating general technical capability tags
  const floatingTags = [
    { text: "Full Stack Development", iconType: "Layers", className: "badge-fullstack" },
    { text: "DSA", iconType: "Binary", className: "badge-dsa" },
    { text: "Technology", iconType: "Globe", className: "badge-tech" },
    { text: "Software Engineering", iconType: "Settings", className: "badge-se" }
  ];

  const renderBadgeIcon = (type) => {
    switch (type) {
      case "Layers": return <Layers size={14} className="badge-lucide-icon" />;
      case "Binary": return <Binary size={14} className="badge-lucide-icon" />;
      case "Globe": return <Globe size={14} className="badge-lucide-icon" />;
      case "Settings": return <Settings size={14} className="badge-lucide-icon" />;
      default: return null;
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-tag">Welcome to my space</div>
        <h1 className="hero-title">{name}</h1>
        <h2 className="hero-tagline">{title}</h2>
        <div className="hero-subtitles">
          {subtitles.map((sub, index) => (
            <span key={sub} className="subtitle-wrapper">
              {index > 0 && <span className="subtitle-separator">•</span>}
              <span className="subtitle-item">{sub}</span>
            </span>
          ))}
        </div>
        <p className="hero-bio">{bio}</p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary">
            <Briefcase size={16} /> View Projects
          </a>
          <a
            href={resumeLink}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary" id="resume-download-btn"
          >
            <Download size={16} /> Download Resume
          </a>
          <button
            className="btn btn-accent" id="hero-chat-btn"
            onClick={() => document.getElementById("chatbot-float-btn")?.click()}
          >
            <MessageSquareCode size={16} /> Chat with AI Assistant
          </button>
        </div>
      </div>
      <div className="hero-graphic">
        <div className="graphic-circle">
          <div className="inner-core">
            <img 
              src="/assets/profile.jpg" 
              alt="Prince Jha" 
              className="hero-profile-image" 
            />
          </div>
          <div className="orbital orbital-1">
            <span className="orbital-sparkle sparkle-1" />
          </div>
          <div className="orbital orbital-2">
            <span className="orbital-sparkle sparkle-2" />
          </div>
          <div className="orbital orbital-3">
            <span className="orbital-sparkle sparkle-3" />
          </div>
          
          {/* Floating interactive skill badges */}
          {floatingTags.map((tag, idx) => (
            <div key={tag.text} className={`floating-badge ${tag.className}`}>
              <span className="badge-pulse-dot" />
              {renderBadgeIcon(tag.iconType)}
              <span className="badge-text">{tag.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
