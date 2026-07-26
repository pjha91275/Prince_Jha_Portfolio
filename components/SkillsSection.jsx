"use client";
import { Binary, Layout, Server, Database, Wrench, BookOpen, BarChart2 } from "lucide-react";

const skillCategories = [
  {
    icon: Binary,
    title: "Languages",
    chips: ["C++", "Java", "JavaScript", "Python", "C"],
  },
  {
    icon: Layout,
    title: "Web Frontend",
    chips: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    icon: Server,
    title: "Web Backend",
    chips: ["Node.js", "Express.js", "REST APIs", "EJS"],
  },
  {
    icon: Database,
    title: "Databases",
    chips: ["MongoDB", "MySQL", "Mongoose"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    chips: ["Linux (Ubuntu)", "Git", "GitHub", "Postman", "MongoDB Atlas", "MongoDB Compass", "Vercel", "Render", "VS Code", "Antigravity IDE"],
  },
  {
    icon: BookOpen,
    title: "CS Fundamentals",
    chips: ["Object-Oriented Programming", "DSA", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    icon: BarChart2,
    title: "Data Science",
    chips: ["NumPy"],
  },
];

export default function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-header">
        <span className="section-tag">What I Work With</span>
        <h2 className="section-title">Technical Skills</h2>
      </div>
      <div className="skills-grid">
        {skillCategories.map(({ icon: Icon, title, chips }) => (
          <div className="skill-category glass-card" key={title}>
            <div className="category-header">
              <Icon size={20} />
              <h3>{title}</h3>
            </div>
            <div className="skill-chips">
              {chips.map((chip) => (
                <span className="skill-chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
