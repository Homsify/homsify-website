"use client";
import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", as: Tag = "div" }: {
  children: React.ReactNode; className?: string; as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref as any} className={`rv ${className}`}>{children}</Tag>;
}
