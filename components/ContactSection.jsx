"use client";
import { useState } from "react";
import { Mail, Phone, Globe, GitFork, Link2 } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export default function ContactSection({ backendConnected }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.id.replace("form-", "")]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await submitContactForm(form);
      if (res.success) {
        setStatus({ type: "success", msg: res.message });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: res.error || "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    }
    setSubmitting(false);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact</h2>
      </div>
      <div className="contact-grid">
        <div className="contact-info glass-card">
          <h3>Contact Information</h3>
          <p>Feel free to reach out for research discussions, freelance collaborations, or job opportunities.</p>
          <div className="contact-details">
            <div className="contact-item">
              <Mail size={20} className="contact-icon" />
              <div><h4>Email</h4><a href="mailto:pjha91275@gmail.com">pjha91275@gmail.com</a></div>
            </div>
            <div className="contact-item">
              <Phone size={20} className="contact-icon" />
              <div><h4>Phone</h4><a href="tel:+919876543210">+91 98765 43210</a></div>
            </div>
            <div className="contact-item">
              <Globe size={20} className="contact-icon" />
              <div><h4>Portfolio Website</h4><a href="#" target="_blank">princejha.me</a></div>
            </div>
          </div>
          <div className="social-links">
            <a href="https://github.com/pjha91275/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitFork /></a>
            <a href="https://linkedin.com/in/prince-jha-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Link2 /></a>
          </div>
        </div>

        <div className="contact-form-container glass-card">
          <h3>Send a Message</h3>
          <form id="portfolio-contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="form-name">Name</label>
                <input type="text" id="form-name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="form-email">Email</label>
                <input type="email" id="form-email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="form-subject">Subject</label>
              <input type="text" id="form-subject" placeholder="Collaboration Inquiry" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="form-message">Message</label>
              <textarea id="form-message" rows={5} placeholder="Write your message here..." value={form.message} onChange={handleChange} required />
            </div>
            {status.msg && (
              <div className={status.type === "success" ? "form-success" : "form-error"}>
                {status.msg}
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
