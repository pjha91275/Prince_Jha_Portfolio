"use client";
import { Binary, Layout, Server, Database, Wrench, BookOpen, BarChart2 } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

const deviconMap = {
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "EJS": "/assets/skills/ejs.png",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Mongoose": "/assets/skills/mongoose.png",
  "Linux (Ubuntu)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  "MongoDB Atlas": "/assets/skills/mongodb_atlas.png",
  "MongoDB Compass": "/assets/skills/mongodb_compass.png",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "Render": "/assets/skills/render.png",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Antigravity IDE": "/assets/skills/antigravity.png",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Object-Oriented Programming": "/assets/skills/oop.png",
  "DSA": "/assets/skills/dsa.png",
  "DBMS": "/assets/skills/dbms.png",
  "Operating Systems": "/assets/skills/os.png",
  "Computer Networks": "/assets/skills/networks.png",
};

export default function SkillsSection() {
  const { skillCategories } = portfolioData;

  // Helper to map icon keys to Lucide components
  const getIcon = (key) => {
    switch (key) {
      case "Binary": return <Binary size={20} />;
      case "Layout": return <Layout size={20} />;
      case "Server": return <Server size={20} />;
      case "Database": return <Database size={20} />;
      case "Wrench": return <Wrench size={20} />;
      case "BookOpen": return <BookOpen size={20} />;
      case "BarChart2": return <BarChart2 size={20} />;
      default: return <Binary size={20} />;
    }
  };

  return (
    <section className="section skills-section" id="skills">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-tag">What I Work With</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid">
        {skillCategories.map(({ iconKey, title, chips }) => (
          <div className="skill-category glass-card" key={title}>
            <div className="category-header">
              {getIcon(iconKey)}
              <h3>{title}</h3>
            </div>
            <div className="skill-chips">
              {chips.map((chip) => {
                const logoUrl = deviconMap[chip];
                const invert = ["Express.js", "Vercel", "GitHub"].includes(chip);
                const scaleUp = ["MongoDB Atlas", "MongoDB Compass", "Antigravity IDE", "Mongoose"].includes(chip);
                const logoClasses = `skill-logo ${invert ? "logo-invert-dark" : ""} ${scaleUp ? "logo-scale-up" : ""}`;
                return (
                  <span className="skill-chip" key={chip}>
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={chip} 
                        className={logoClasses.trim()}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="skill-logo-fallback">💻</span>
                    )}
                    <span className="skill-chip-text">{chip}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      </ScrollReveal>
    </section>
  );
}
