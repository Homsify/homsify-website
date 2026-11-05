import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { allServices, serviceGroups, company, process, cities, hero } from "@/content/site";

export function generateStaticParams() {
  return allServices.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = allServices.find(x => x.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.name} in Ontario — Homsify`,
    description: `${s.short} Homsify serves London, Windsor, Kitchener, Sarnia and Chatham-Kent. Free written quotes for residential, commercial and public-sector property. Open 24/7.`,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = allServices.find(s => s.slug === params.slug);
  if (!service) notFound();

  const group = serviceGroups.find(g => g.services.some(s => s.slug === service.slug))!;
  const related = group.services.filter(s => s.slug !== service.slug);

  return (
    <>
      <Header />

      <section className="hero" style={{ minHeight: "clamp(460px,64svh,640px)" }}>
        <div className="hero__slides" aria-hidden="true">
          <div className="hero__slide active">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.slides[0].src} alt="" fetchPriority="high" decoding="async" />
          </div>
        </div>
        <div className="hero__scrim" />
        <div className="hero__in">
          <p className="eyebrow eyebrow--light">{service.code} · {group.title}</p>
          <h1 className="hero__title" style={{ fontSize: "clamp(36px,5vw,66px)" }}>{service.name}</h1>
          <p className="hero__sub">{service.short}</p>
          <div className="hero__actions">
            <Link className="btn" href="#quote">Get a quote for this</Link>
            <a className="btn btn--outline-light" href={company.phoneHref}>{company.phone}</a>
          </div>
        </div>
      </section>

      <div className="statbar">
        <div className="statbar__in">
          <div className="statbar__item"><b>Free</b><small>On-site estimates</small></div>
          <div className="statbar__item"><b>24/7</b><small>Always available</small></div>
          <div className="statbar__item"><b>Fixed</b><small>Written quotes</small></div>
          <div className="statbar__item"><b>2 yr</b><small>Workmanship warranty</small></div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">How this job runs</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>Same Four Steps,<br />Every Time.</h2>
            </div>
            <p className="lede">
              Whether it&rsquo;s a half-day repair or a multi-week build,
              {" "}{service.name.toLowerCase()} follows the same {company.name} sequence.
            </p>
          </div>
          <div className="steps">
            {process.map(s => (
              <div className="step" key={s.n}>
                <div className="step__n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec rule-t">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Often booked together</p>
              <h2 className="dsp" style={{ marginTop: 16 }}>{group.title}</h2>
            </div>
            <p className="lede">
              Bundle these into the same visit and the same quote — one crew,
              one schedule, one invoice.
            </p>
          </div>
          <div className="svclist">
            {related.map(s => (
              <Link className="svc" href={`/services/${s.slug}`} key={s.slug}>
                <span className="svc__code">{s.code}</span>
                <span className="svc__name">{s.name}</span>
                <span className="svc__desc">{s.short}</span>
              </Link>
            ))}
          </div>

          <p className="eyebrow" style={{ marginTop: 52 }}>Available across</p>
          <div className="places__list" style={{ marginTop: 16 }}>
            {cities.map(c => (
              <div className="city" key={c.name}><b>{c.name}</b><span>{c.note}</span></div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm preselect={service.slug} />
      <Footer />
    </>
  );
}
