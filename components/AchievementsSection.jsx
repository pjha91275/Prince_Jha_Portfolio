"use client";
import { useEffect, useRef, useState } from "react";
import { Code, FolderGit2, GitCommit, Trophy, Award } from "lucide-react";

const counters = [
  { icon: Code, target: 100, label: "DSA Problems Solved" },
  { icon: FolderGit2, target: 30, label: "GitHub Repositories" },
  { icon: GitCommit, target: 550, label: "GitHub Commits" },
  { icon: Trophy, target: 10, label: "Hackathons Participated" },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const increment = target / (duration / 16);
          let current = 0;
          const tick = () => {
            current += increment;
            if (current < target) {
              setCount(Math.ceil(current));
              requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="counter-num">{count}</div>;
}

export default function AchievementsSection() {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="section-header">
        <span className="section-tag">Milestones</span>
        <h2 className="section-title">Achievements</h2>
      </div>
      <div className="achievements-grid" id="counters-box">
        {counters.map(({ icon: Icon, target, label }) => (
          <div className="counter-card glass-card" key={label}>
            <div className="counter-icon"><Icon size={28} /></div>
            <AnimatedCounter target={target} />
            <span className="counter-plus">+</span>
            <p>{label}</p>
          </div>
        ))}
        <div className="counter-card glass-card full-width-counter">
          <div className="counter-icon"><Award size={28} /></div>
          <div className="top-placement-title">Top 8</div>
          <p>IEEE Mega Project Finalist</p>
        </div>
      </div>
    </section>
  );
}
