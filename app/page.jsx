"use client";
import { useState, useEffect } from "react";
import { checkBackendStatus } from "@/lib/api";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import SpaceBackground from "@/components/SpaceBackground";

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState({
    connected: false,
    apiKeyConfigured: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await checkBackendStatus();
      if (data) {
        setBackendStatus({ connected: true, apiKeyConfigured: data.api_key_configured });
      } else {
        setBackendStatus({ connected: false, apiKeyConfigured: false });
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SpaceBackground />

      <Header backendStatus={backendStatus} />

      <main className="portfolio-container">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection backendConnected={backendStatus.connected} />
      </main>

      <Footer />
      <ChatbotWidget backendStatus={backendStatus} />
    </>
  );
}
