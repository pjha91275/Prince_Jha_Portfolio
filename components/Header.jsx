"use client";
export default function Header({ backendStatus }) {
  const { connected } = backendStatus;
  return (
    <header className="app-header">
      <a href="#" className="logo-text">
        <h2>PJ<span>.</span></h2>
      </a>
      <nav className="nav-menu">
        <a href="#about" className="nav-link">About</a>
        <a href="#education" className="nav-link">Education</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#achievements" className="nav-link">Achievements</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
      <div className="header-actions">
        <div className={`backend-badge${connected ? " connected" : ""}`} id="backend-status-badge">
          <span className="badge-dot" />
          <span id="backend-status-text">{connected ? "Backend Active" : "Offline Fallback"}</span>
        </div>
      </div>
    </header>
  );
}
