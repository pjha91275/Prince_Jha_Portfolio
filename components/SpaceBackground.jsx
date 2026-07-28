"use client";
import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Starfield (130 stars)
    const numStars = 130;
    const stars = [];
    const colors = ["#ffffff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#38bdf8", "#818cf8"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.3 + 0.4,
        speed: Math.random() * 0.12 + 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkle: Math.random() * 0.02,
        twinkleDir: 1,
        alpha: Math.random(),
      });
    }

    // 2. Primary Galaxy Spiral Stars (Top Right Black Hole)
    const numGalaxyStars = 90;
    const galaxyStars = [];
    for (let i = 0; i < numGalaxyStars; i++) {
      const arm = Math.random() < 0.5 ? 0 : Math.PI;
      const distance = Math.random() * 200 + 20;
      const angleOffset = Math.random() * 0.35 - 0.175;
      const theta = distance * 0.025 + arm + angleOffset;
      galaxyStars.push({
        distance,
        theta,
        size: Math.random() * 1.4 + 0.4,
        speed: Math.random() * 0.0018 + 0.0008,
        color: Math.random() < 0.4 ? "#38bdf8" : Math.random() < 0.8 ? "#c7d2fe" : "#7c3aed"
      });
    }

    // 3. Secondary Galaxy Spiral Stars (Bottom Left)
    const numGalaxyStars2 = 60;
    const galaxyStars2 = [];
    for (let i = 0; i < numGalaxyStars2; i++) {
      const arm = Math.random() < 0.5 ? 0 : Math.PI;
      const distance = Math.random() * 140 + 15;
      const angleOffset = Math.random() * 0.4 - 0.2;
      const theta = distance * 0.035 + arm + angleOffset;
      galaxyStars2.push({
        distance,
        theta,
        size: Math.random() * 1.2 + 0.4,
        speed: -(Math.random() * 0.0015 + 0.0005), // rotates reverse
        color: Math.random() < 0.5 ? "#f43f5e" : "#db2777" // reddish-pink arm stars
      });
    }

    // 4. Orbiting Solar System Planets (3 Planets revolving around Galaxy Core)
    const planets = [
      {
        orbitRadius: 130,
        orbitSpeed: 0.0035,
        angle: Math.random() * Math.PI * 2,
        size: 9,
        color1: "#fbbf24", // Glowing Gold / Amber
        color2: "#d97706",
        ring: false
      },
      {
        orbitRadius: 210,
        orbitSpeed: 0.002,
        angle: Math.random() * Math.PI * 2,
        size: 14,
        color1: "#06b6d4", // Cyan Planet
        color2: "#0891b2",
        ring: true,
        ringColor: "rgba(6, 182, 212, 0.28)",
      },
      {
        orbitRadius: 290,
        orbitSpeed: -0.0012,
        angle: Math.random() * Math.PI * 2,
        size: 19,
        color1: "#a855f7", // Purple Gas Giant
        color2: "#7e22ce",
        moons: [
          { orbitRadius: 26, speed: 0.014, angle: 0, size: 3, color: "#cbd5e1" }
        ]
      }
    ];

    // Event horizon dust around Black Hole
    const rings = [
      { radius: 100, speed: 0.0018, angle: 0, color: "rgba(56, 189, 248, 0.07)", count: 12 },
      { radius: 160, speed: -0.0012, angle: Math.PI / 4, color: "rgba(124, 58, 237, 0.07)", count: 18 },
      { radius: 220, speed: 0.0009, angle: Math.PI / 2, color: "rgba(37, 99, 235, 0.05)", count: 22 }
    ];

    const dustParticles = [];
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const particleAngle = (i / ring.count) * Math.PI * 2 + Math.random() * 0.4;
        dustParticles.push({
          ring,
          angle: particleAngle,
          size: Math.random() * 1.0 + 0.3,
          radialOffset: (Math.random() - 0.5) * 15,
          color: ring.color.replace("0.07", "0.3").replace("0.05", "0.25"),
        });
      }
    });

    // Shooting stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.35),
          len: Math.random() * 70 + 40,
          speed: Math.random() * 9 + 5,
          angle: Math.PI / 6 + Math.random() * (Math.PI / 12),
          opacity: 1,
        });
      }
    };

    // Parallax mouse position
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.03;
      mouseY = (e.clientY - height / 2) * 0.03;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      ctx.fillStyle = "rgba(9, 13, 22, 1)";
      ctx.fillRect(0, 0, width, height);

      // Shifting background nebulas/clouds
      const neb1X = width * 0.15 - mouseX * 0.2;
      const neb1Y = height * 0.35 - mouseY * 0.2;
      const neb1Glow = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, 600);
      neb1Glow.addColorStop(0, "rgba(124, 58, 237, 0.08)");
      neb1Glow.addColorStop(0.5, "rgba(37, 99, 235, 0.03)");
      neb1Glow.addColorStop(1, "transparent");
      ctx.fillStyle = neb1Glow;
      ctx.beginPath();
      ctx.arc(neb1X, neb1Y, 600, 0, Math.PI * 2);
      ctx.fill();

      const neb2X = width * 0.5 - mouseX * 0.15;
      const neb2Y = height * 0.7 - mouseY * 0.15;
      const neb2Glow = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, 500);
      neb2Glow.addColorStop(0, "rgba(56, 189, 248, 0.05)");
      neb2Glow.addColorStop(0.5, "rgba(76, 29, 149, 0.01)");
      neb2Glow.addColorStop(1, "transparent");
      ctx.fillStyle = neb2Glow;
      ctx.beginPath();
      ctx.arc(neb2X, neb2Y, 500, 0, Math.PI * 2);
      ctx.fill();

      // Galaxy 1: Top Right Galaxy center (Black Hole Core)
      const bhX = width * 0.84 + mouseX * 0.4;
      const bhY = height * 0.16 + mouseY * 0.4;

      const bhGlow = ctx.createRadialGradient(bhX, bhY, 0, bhX, bhY, 350);
      bhGlow.addColorStop(0, "rgba(76, 29, 149, 0.18)");
      bhGlow.addColorStop(0.3, "rgba(37, 99, 235, 0.09)");
      bhGlow.addColorStop(0.7, "rgba(56, 189, 248, 0.02)");
      bhGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bhGlow;
      ctx.beginPath();
      ctx.arc(bhX, bhY, 350, 0, Math.PI * 2);
      ctx.fill();

      // Black Hole Event Horizon
      const coreGlow = ctx.createRadialGradient(bhX, bhY, 0, bhX, bhY, 40);
      coreGlow.addColorStop(0, "rgba(9, 13, 22, 1)");
      coreGlow.addColorStop(0.5, "rgba(13, 10, 28, 0.95)");
      coreGlow.addColorStop(0.8, "rgba(56, 189, 248, 0.35)");
      coreGlow.addColorStop(0.9, "rgba(124, 58, 237, 0.6)");
      coreGlow.addColorStop(1, "transparent");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(bhX, bhY, 45, 0, Math.PI * 2);
      ctx.fill();

      // Galaxy 2: Bottom Left Secondary Galaxy Center
      const bg2X = width * 0.12 - mouseX * 0.25;
      const bg2Y = height * 0.82 - mouseY * 0.25;

      const bg2Glow = ctx.createRadialGradient(bg2X, bg2Y, 0, bg2X, bg2Y, 220);
      bg2Glow.addColorStop(0, "rgba(244, 63, 94, 0.15)"); // rose/pink center glow
      bg2Glow.addColorStop(0.4, "rgba(219, 39, 119, 0.06)");
      bg2Glow.addColorStop(1, "transparent");
      ctx.fillStyle = bg2Glow;
      ctx.beginPath();
      ctx.arc(bg2X, bg2Y, 220, 0, Math.PI * 2);
      ctx.fill();

      // Render Galaxy 1 Spiral Stars
      galaxyStars.forEach((gStar) => {
        gStar.theta += gStar.speed;
        const gx = bhX + Math.cos(gStar.theta) * gStar.distance * 1.35;
        const gy = bhY + Math.sin(gStar.theta) * gStar.distance * 0.78;

        ctx.fillStyle = gStar.color;
        ctx.globalAlpha = Math.max(0.15, 1 - (gStar.distance / 210));
        
        if (gStar.size <= 0.8) {
          ctx.fillRect(gx, gy, 1, 1);
        } else {
          ctx.beginPath();
          ctx.arc(gx, gy, gStar.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render Galaxy 2 Spiral Stars
      galaxyStars2.forEach((gStar) => {
        gStar.theta += gStar.speed;
        const gx = bg2X + Math.cos(gStar.theta) * gStar.distance * 1.4;
        const gy = bg2Y + Math.sin(gStar.theta) * gStar.distance * 0.7;

        ctx.fillStyle = gStar.color;
        ctx.globalAlpha = Math.max(0.15, 1 - (gStar.distance / 150));
        
        if (gStar.size <= 0.8) {
          ctx.fillRect(gx, gy, 1, 1);
        } else {
          ctx.beginPath();
          ctx.arc(gx, gy, gStar.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // Draw Orbiting Planets (Solar System) & Dotted Orbit Tracks
      planets.forEach((p) => {
        p.angle += p.orbitSpeed;
        const px = bhX + Math.cos(p.angle) * p.orbitRadius * 1.45;
        const py = bhY + Math.sin(p.angle) * p.orbitRadius * 0.75;

        // Draw dotted orbital track
        ctx.strokeStyle = "rgba(56, 189, 248, 0.035)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6]);
        ctx.save();
        ctx.translate(bhX, bhY);
        ctx.scale(1.45, 0.75);
        ctx.beginPath();
        ctx.arc(0, 0, p.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]); // clear dash

        // Rings
        if (p.ring) {
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 3;
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1.4, 0.32);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Planet Body
        const pGlow = ctx.createRadialGradient(px - p.size*0.25, py - p.size*0.25, 0, px, py, p.size);
        pGlow.addColorStop(0, p.color1);
        pGlow.addColorStop(1, p.color2);
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Moons
        if (p.moons) {
          p.moons.forEach((m) => {
            m.angle += m.speed;
            const mx = px + Math.cos(m.angle) * m.orbitRadius;
            const my = py + Math.sin(m.angle) * m.orbitRadius * 0.45;

            ctx.fillStyle = m.color;
            ctx.beginPath();
            ctx.arc(mx, my, m.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      });

      // Background starfield
      stars.forEach((star) => {
        star.alpha += star.twinkle * star.twinkleDir;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        const sx = star.x - mouseX * star.speed * 1.5;
        const sy = star.y - mouseY * star.speed * 1.5;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        if (star.size <= 0.8) {
          ctx.fillRect(sx, sy, 1, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // Event Horizon Dust Particles
      dustParticles.forEach((dp) => {
        dp.angle += dp.ring.speed;
        const xDist = (dp.ring.radius + dp.radialOffset) * 1.35;
        const yDist = (dp.ring.radius + dp.radialOffset) * 0.58;
        
        const ringCos = Math.cos(dp.ring.angle);
        const ringSin = Math.sin(dp.ring.angle);
        
        const localX = Math.cos(dp.angle) * xDist;
        const localY = Math.sin(dp.angle) * yDist;
        
        const px = bhX + (localX * ringCos - localY * ringSin);
        const py = bhY + (localX * ringSin + localY * ringCos);

        ctx.fillStyle = dp.color;
        if (dp.size <= 0.8) {
          ctx.fillRect(px, py, 1, 1);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, dp.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.016;

        if (ss.opacity <= 0 || ss.x < 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${ss.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
}
