"use client";
import { Award, MapPin, Code2, Lightbulb, Users, TrendingUp } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="section-header">
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-card main-about glass-card">
          <p>
            I am currently a <strong>3rd Year Computer Engineering Student</strong> pursuing my
            Bachelor&apos;s degree at <strong>Thakur College of Engineering and Technology (TCET),
            Mumbai</strong>. My academic journey is fueled by an intense passion for Software
            Engineering and emerging AI technologies.
          </p>
          <p>
            I thrive in fast-paced environments, actively participating in hackathons to engineer
            functional solutions in competitive timelines. I love continuous learning and adapting
            to modern software stacks.
          </p>
          <div className="goal-box">
            <Award size={20} />
            <div>
              <h4>Career Goal</h4>
              <p>Become a Software Engineer at a top-tier product-based company, driving impactful tech initiatives.</p>
            </div>
          </div>
        </div>
        <div className="about-card highlights-card glass-card">
          <h3>Quick Highlights</h3>
          <ul className="highlight-list">
            <li><MapPin size={16} /><span>Based in Mumbai, Maharashtra</span></li>
            <li><Code2 size={16} /><span>Focused on Full Stack &amp; AI Integrations</span></li>
            <li><Lightbulb size={16} /><span>Strong Problem-Solving &amp; Algorithmic Mindset</span></li>
            <li><Users size={16} /><span>Active Hackathon Participant &amp; Collaborator</span></li>
            <li><TrendingUp size={16} /><span>Constantly learning new architectures</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
