"use client";
import { useEffect, useState } from "react";

const NAV_SECTIONS = [
  { id: "about",        label: "About" },
  { id: "education",   label: "Education" },
  { id: "skills",      label: "Skills" },
  { id: "projects",    label: "Projects" },
  { id: "achievements",label: "Achievements" },
  { id: "contact",     label: "Contact" },
];

import { Sun, Moon } from "lucide-react";

export default function Header({ backendStatus }) {
  const { connected } = backendStatus;
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Load theme from localStorage on client side mount
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Build a map of id → entry so we always pick the one highest in viewport
    const sectionMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionMap.set(entry.target.id, entry);
        });

        // Find the section that is intersecting AND closest to top of viewport
        let best = null;
        sectionMap.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) {
              best = entry;
            }
          }
        });

        if (best) {
          setActiveSection(best.target.id);
        }
      },
      {
        // Fire when ≥20% of the section is visible
        threshold: 0.2,
        // Shrink the top of the root by header height so sections below header trigger correctly
        rootMargin: "-70px 0px 0px 0px",
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="app-header">
      <a href="#" className="logo-text">
        <h2>PJ<span>.</span></h2>
      </a>
      <nav className="nav-menu">
        {NAV_SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link${activeSection === id ? " nav-link-active" : ""}`}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className={`backend-badge${connected ? " connected" : ""}`} id="backend-status-badge">
          <span className="badge-dot" />
          <span id="backend-status-text">{connected ? "Backend Active" : "Offline Fallback"}</span>
        </div>
      </div>
    </header>
  );
}
