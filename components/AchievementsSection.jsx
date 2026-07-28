"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Code, FolderGit2, GitCommit, Trophy, Award } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

function AnimatedCounter({ target, shouldAnimate }) {
  const [count, setCount] = useState(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(0);
      return;
    }

    // Cancel any previous animation
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let startTime = null;
    const duration = 1200; // 1.2 seconds

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.ceil(eased * target));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldAnimate, target]);

  return <span className="counter-num">{count}</span>;
}

export default function AchievementsSection() {
  const { counters, highlight } = portfolioData.achievements;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset then trigger so it always animates on scroll-in
          setInView(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setInView(true));
          });
        } else {
          setInView(false); // reset when scrolled away so it re-animates
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getIcon = (key) => {
    switch (key) {
      case "Code": return <Code size={28} />;
      case "FolderGit2": return <FolderGit2 size={28} />;
      case "GitCommit": return <GitCommit size={28} />;
      case "Trophy": return <Trophy size={28} />;
      default: return <Code size={28} />;
    }
  };

  return (
    <section className="section achievements-section" id="achievements" ref={sectionRef}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-tag">Milestones</span>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="achievements-grid" id="counters-box">
          {counters.map(({ iconKey, target, label }) => (
            <div className="counter-card glass-card" key={label}>
              <div className="counter-icon">{getIcon(iconKey)}</div>
              <AnimatedCounter target={target} shouldAnimate={inView} />
              <span className="counter-plus">+</span>
              <p>{label}</p>
            </div>
          ))}
          <div className="counter-card glass-card full-width-counter">
            <div className="counter-icon"><Award size={28} /></div>
            <div className="top-placement-title">{highlight.title}</div>
            <p>{highlight.subtitle}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
