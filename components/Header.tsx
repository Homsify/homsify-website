"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { company } from "@/content/site";

const LINKS: [string, string][] = [
  ["/#services", "Services"], ["/#sectors", "Who we serve"], ["/#process", "Process"],
  ["/#work", "Work"], ["/#areas", "Where we work"], ["/#about", "About"], ["/blog", "Blog"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <header className={`hdr${solid ? " solid" : ""}`}>
        <div className="hdr__in">
          <Link href="/" className="hdr__logo" aria-label="Homsify home"><Logo height={34} /></Link>
          <nav className="nav" aria-label="Primary">
            {LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="hdr__cta">
            <a className="hdr__tel" href={company.phoneHref}>{company.phone}</a>
            <Link className="btn" href="/#quote">Get a quote</Link>
            <button className="burger" aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mnav${open ? " open" : ""}`} id="mnav">
        {LINKS.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link href="/#quote" onClick={() => setOpen(false)}>Get a quote</Link>
      </div>
    </>
  );
}
