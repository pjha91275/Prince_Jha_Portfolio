"use client";
import { Award, MapPin, Code2, Lightbulb, Users, TrendingUp } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  const { mainParagraphs, careerGoal, highlights } = portfolioData.aboutBio;

  // Helper to map icon names to Lucide icons
  const renderIcon = (name) => {
    switch (name) {
      case "MapPin": return <MapPin size={16} />;
      case "Code2": return <Code2 size={16} />;
      case "Lightbulb": return <Lightbulb size={16} />;
      case "Users": return <Users size={16} />;
      case "TrendingUp": return <TrendingUp size={16} />;
      default: return null;
    }
  };

  return (
    <section className="section about-section" id="about">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </div>
      <div className="about-grid">
        {/* Python VS Code Editor Mockup Card */}
        <div className="code-editor-card glass-card">
          <div className="editor-header">
            <div className="editor-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="editor-tabs">
              <div className="editor-tab active">
                <span className="tab-icon">🐍</span>
                <span className="tab-name">profile.py</span>
              </div>
            </div>
          </div>
          <div className="editor-body">
            <pre className="code-lines">
              <code>
                <span className="code-keyword">class</span> <span className="code-class">PrinceJha</span>:<br />
                {"    "}<span className="code-keyword">def</span> <span className="code-func">__init__</span>(<span className="code-self">self</span>):<br />
                {"        "}<span className="code-self">self</span>.name = <span className="code-string">&quot;Prince Jha&quot;</span><br />
                {"        "}<span className="code-self">self</span>.role = <span className="code-string">&quot;Computer Engineering Student&quot;</span><br />
                {"        "}<span className="code-self">self</span>.college = <span className="code-string">&quot;TCET, Mumbai&quot;</span><br />
                {"        "}<span className="code-self">self</span>.focus = [<span className="code-string">&quot;Full Stack&quot;</span>, <span className="code-string">&quot;Software Eng&quot;</span>]<br />
                <br />
                {"    "}<span className="code-keyword">def</span> <span className="code-func">is_available</span>(<span className="code-self">self</span>):<br />
                {"        "}<span className="code-keyword">return</span> <span className="code-keyword">True</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Narrative bio */}
        <div className="about-card main-about glass-card">
          {mainParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="goal-box">
            <Award size={20} />
            <div>
              <h4>Career Goal</h4>
              <p>{careerGoal}</p>
            </div>
          </div>
        </div>

        {/* Quick highlights list */}
        <div className="about-card highlights-card glass-card">
          <h3>Quick Highlights</h3>
          <ul className="highlight-list">
            {highlights.map((highlight, index) => (
              <li key={index}>
                {renderIcon(highlight.icon)}
                <span>{highlight.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
