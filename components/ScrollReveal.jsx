"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "" }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else {
          setIsRevealed(false);
        }
      },
      {
        threshold: 0.02, // trigger when 2% is visible
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-container ${isRevealed ? "revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
