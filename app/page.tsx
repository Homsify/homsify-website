import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import SeasonBand from "@/components/SeasonBand";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import {
  company, hero, about, sectors, process, projects,
  cities, testimonials, serviceGroups,
} from "@/content/site";

const Tick = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2 8l4 4 7-9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Header />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <HeroCarousel />
        <div className="hero__scrim" />
        <div className="hero__in">
          <p className="eyebrow eyebrow--light">{hero.eyebrow}</p>
          <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: hero.titleHtml }} />
          <p className="hero__sub">{hero.subtitle}</p>
          <div className="hero__actions">
            <Link className="btn" href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
            <Link className="btn btn--outline-light" href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
          </div>
        </div>
      </section>

      <div className="statbar">
        <div className="statbar__in">
          {hero.stats.map(s => (
            <div className="statbar__item" key={s.label}><b>{s.value}</b><small>{s.label}</small></div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section className="sec" id="about">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.image} alt={about.imageAlt} loading="lazy" decoding="async" />
              </div>
            </Reveal>
            <Reveal>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 className="dsp" style={{ marginTop: 16 }}
                dangerouslySetInnerHTML={{ __html: about.title }} />
              <p className="lede" style={{ marginTop: 22 }}>{about.body}</p>
              <ul className="ticks">
                {about.points.map(p => <li key={p}><Tick />{p}</li>)}
              </ul>
              <Link className="btn btn--outline" href="#quote" style={{ marginTop: 30 }}>Get a free quote</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SEASON BAND ──────────────────────────────────────── */}
      <SeasonBand />

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="sec" id="services">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Twenty-Three Services.<br />One Contract.</h2>
            </div>
            <p className="lede">
              Every trade below is scoped, scheduled and warrantied by {company.name}.
              Combine as many as the property needs — you still get one project
              manager and one invoice.
            </p>
          </div>
          {serviceGroups.map(g => (
            <div className="svcgroup" key={g.id}>
              <div className="svcgroup__label">
                <h3>{g.title}</h3><span>{g.note}</span>
              </div>
              <div className="svclist">
                {g.services.map(s => (
                  <Link className="svc" href={`/services/${s.slug}`} key={s.slug}>
                    <span className="svc__code">{s.code}</span>
                    <span className="svc__name">{s.name}</span>
                    <span className="svc__desc">{s.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTORS ──────────────────────────────────────────── */}
      <section className="sec rule-t" id="sectors">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Who we serve</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Built for Anyone<br />Responsible for a Building.</h2>
            </div>
            <p className="lede">
              The scope changes. The standard doesn&rsquo;t. {company.name} is fully
              insured and WSIB covered across all three sectors.
            </p>
          </div>
          <div className="sectors">
            {sectors.map(s => (
              <article className="sector" key={s.slug}>
                <div className="sector__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={`${s.title} project`} loading="lazy" decoding="async" />
                </div>
                <div className="sector__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul>
                  <Link className="sector__link" href="#quote">{s.title} quote →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="sec" id="process">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Four Steps, and a<br />Date on the Calendar.</h2>
            </div>
            <p className="lede">
              No vague ranges, no &ldquo;we&rsquo;ll get back to you.&rdquo; Every project
              follows the same sequence, from a tap repair to a municipal retrofit.
            </p>
          </div>
          <div className="steps">
            {process.map(s => (
              <Reveal className="step" key={s.n}>
                <div className="step__n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────── */}
      <section className="sec rule-t" id="work">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Recent Projects</h2>
            </div>
            <p className="lede">
              A cross-section of a year — century homes, retail plazas, municipal
              facilities and everything between.
            </p>
          </div>
          <div className="work">
            {projects.map(p => (
              <article className="proj" key={p.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                <div className="proj__meta">
                  <p className="eyebrow eyebrow--light">{p.sector}</p>
                  <h3>{p.title}</h3>
                  <p>{p.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="quotes">
            {testimonials.map(t => (
              <figure className="quote" key={t.name}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption><b>{t.name}</b>{t.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE WE WORK ────────────────────────────────────── */}
      <section className="sec places" id="areas">
        <div className="wrap">
          <div className="places__in">
            <div>
              <p className="eyebrow">Where we work</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Based in Ontario.</h2>
              <p className="lede" style={{ marginTop: 22 }}>
                Our crews work out of London and cover the major centres across the
                region. Somewhere else in Ontario? Ask anyway — for larger contracts we travel.
              </p>
              <Link className="btn btn--outline" href="#quote" style={{ marginTop: 28 }}>Check my address</Link>
            </div>
            <div className="places__list">
              {cities.map(c => (
                <div className="city" key={c.name}><b>{c.name}</b><span>{c.note}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteForm />
      <Footer />
    </>
  );
}
