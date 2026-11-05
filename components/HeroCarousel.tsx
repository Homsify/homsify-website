"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = hero.slides.length;

  const stop = () => { if (timer.current) clearInterval(timer.current); };
  const start = useCallback(() => {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setCur(c => (c + 1) % n), INTERVAL);
  }, [n]);

  useEffect(() => { start(); return stop; }, [start]);

  const goTo = (i: number) => { setCur(i); start(); };

  return (
    <>
      <div className="hero__slides" aria-hidden="true">
        {hero.slides.map((s, i) => (
          <div key={s.src} className={`hero__slide${i === cur ? " active" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          </div>
        ))}
      </div>
      <div className="hero__dots" role="tablist" aria-label="Hero images">
        {hero.slides.map((s, i) => (
          <button key={s.src} role="tab" aria-current={i === cur}
            aria-label={`Show image ${i + 1} of ${n}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </>
  );
}
