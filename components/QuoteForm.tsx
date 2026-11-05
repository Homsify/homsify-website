"use client";
import { useState } from "react";
import AddressInput from "./AddressInput";
import { company, quoteForm, allServices } from "@/content/site";

type State = "idle" | "sending" | "ok" | "error";

export default function QuoteForm({ preselect }: { preselect?: string }) {
  const [state, setState] = useState<State>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const services = fd.getAll("services").map(String);

    const required = ["name", "email", "phone", "address", "propertyType", "timeline", "message"];
    const missing = required.filter(k => !String(fd.get(k) ?? "").trim());
    if (missing.length || services.length === 0) {
      setState("error");
      setNote("Please fill in every required field and choose at least one service.");
      return;
    }

    setState("sending"); setNote("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), company: fd.get("company"), email: fd.get("email"),
          phone: fd.get("phone"), address: fd.get("address"), propertyType: fd.get("propertyType"),
          timeline: fd.get("timeline"), budget: fd.get("budget"), message: fd.get("message"),
          website: fd.get("website"), services,
          pagePath: typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setState("ok"); setNote(quoteForm.successMessage); form.reset();
    } catch {
      setState("error"); setNote(quoteForm.errorMessage);
    }
  }

  return (
    <section className="sec quoteform" id="quote">
      <div className="wrap">
        <div className="qf__grid">
          <aside>
            <p className="eyebrow">{quoteForm.eyebrow}</p>
            <h2 className="dsp" style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{ __html: quoteForm.title }} />
            <p className="lede" style={{ marginTop: 22 }}>{quoteForm.lede}</p>
            <div className="qf__contact">
              <div><p className="eyebrow">Call or text</p><a href={company.phoneHref}>{company.phone}</a></div>
              <div><p className="eyebrow">Email</p><a href={`mailto:${company.email}`}>{company.email}</a></div>
              <div><p className="eyebrow">Hours</p><p>{company.hours}</p></div>
              <div><p className="eyebrow">Based in</p><p>{company.basedIn}</p></div>
            </div>
          </aside>

          <form className="qf" onSubmit={onSubmit} noValidate>
            {/* Honeypot — invisible to people, irresistible to bots */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

            <div className="row2">
              <div className="field">
                <label htmlFor="f-name">Full name <span className="req">*</span></label>
                <input id="f-name" name="name" required placeholder="Jordan Meyer" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="f-company">Company or organisation</label>
                <input id="f-company" name="company" placeholder="Optional" autoComplete="organization" />
              </div>
            </div>

            <div className="row2">
              <div className="field">
                <label htmlFor="f-email">Email <span className="req">*</span></label>
                <input id="f-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone <span className="req">*</span></label>
                <input id="f-phone" name="phone" type="tel" required placeholder="226-000-0000" autoComplete="tel" />
              </div>
            </div>

            <AddressInput />

            <div className="row2">
              <div className="field">
                <label htmlFor="f-type">Property type <span className="req">*</span></label>
                <select id="f-type" name="propertyType" required defaultValue="">
                  <option value="" disabled>Select…</option>
                  {quoteForm.propertyTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-timeline">Timeline <span className="req">*</span></label>
                <select id="f-timeline" name="timeline" required defaultValue="">
                  <option value="" disabled>Select…</option>
                  {quoteForm.timelines.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label id="svcLabel">Services needed <span className="req">*</span></label>
              <div className="chips" role="group" aria-labelledby="svcLabel">
                {allServices.map(s => (
                  <label className="chip" key={s.slug}>
                    <input type="checkbox" name="services" value={s.name} defaultChecked={preselect === s.slug} />
                    <span>{s.name}</span>
                  </label>
                ))}
              </div>
              <p className="hint">Pick as many as apply. Not sure? Choose the closest and describe it below.</p>
            </div>

            <div className="field">
              <label htmlFor="f-budget">Approximate budget</label>
              <select id="f-budget" name="budget" defaultValue="">
                <option value="">Prefer not to say</option>
                {quoteForm.budgets.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-message">What needs doing? <span className="req">*</span></label>
              <textarea id="f-message" name="message" required
                placeholder="Describe the work, the property, and anything we should know before attending." />
            </div>

            <div className={`qf__note${note ? " show" : ""} ${state === "ok" ? "ok" : state === "error" ? "err" : ""}`}
              role="status" aria-live="polite">{note}</div>

            <div className="qf__submit">
              <button className="btn" type="submit" disabled={state === "sending" || state === "ok"}>
                {state === "sending" ? "Sending…" : state === "ok" ? "Sent" : "Send request"}
              </button>
              <p className="hint">
                We&rsquo;ll email a confirmation immediately and a project manager
                will contact you within one business day.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
