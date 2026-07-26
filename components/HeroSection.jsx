"use client";
import { Download, Briefcase, MessageSquareCode } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-tag">Welcome to my space</div>
        <h1 className="hero-title">Prince Jha</h1>
        <div className="hero-subtitles">
          <span className="subtitle-item">Computer Engineering Student</span>
          <span className="subtitle-separator">•</span>
          <span className="subtitle-item">Full Stack Web Developer</span>
          <span className="subtitle-separator">•</span>
          <span className="subtitle-item">AI &amp; Software Enthusiast</span>
        </div>
        <p className="hero-bio">
          I am a passionate Computer Engineering student focused on Full Stack Web Development,
          Artificial Intelligence applications, problem solving, and building scalable software
          solutions. I enjoy transforming innovative ideas into real-world projects.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary">
            <Briefcase size={16} /> View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1zSXDfPcrSPvWcmVW1YmSAWW1mpBpWy0e/view?usp=drive_link"
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
          <div className="inner-core">🤖</div>
          <div className="orbital orbital-1" />
          <div className="orbital orbital-2" />
        </div>
      </div>
    </section>
  );
}
