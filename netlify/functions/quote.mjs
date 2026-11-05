/* ============================================================================
   POST /api/quote   —   Cloudflare Pages Function
   ----------------------------------------------------------------------------
   Runs on Cloudflare's edge. Zero npm dependencies by design: nothing to
   audit, nothing in the supply chain to be compromised, nothing to patch.

   Secrets live in Cloudflare → Pages → Settings → Variables, marked
   "Encrypted". They are never in this repo and never reach the browser.
   ========================================================================== */

const REQUIRED = ["name", "email", "phone", "address", "propertyType", "timeline", "message"];
const MAX = { name: 120, company: 160, email: 160, phone: 40, address: 240, propertyType: 60, timeline: 60, budget: 60, message: 4000 };

/* ── Simple in-memory rate limit (per edge isolate) ───────────────────────── */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5; // max 5 submissions per IP per 10 min
}

/* ── Escape everything before it touches an HTML email ────────────────────── */
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const clean = (v, max) => String(v ?? "").trim().replace(/[\u0000-\u001F\u007F]/g, "").slice(0, max);

/* ── Email bodies ─────────────────────────────────────────────────────────── */
const NIGHT = "#0E1418", CREAM = "#F6F2EA", GOLD = "#A98C55", RULE = "#E0D8CB";

function row(label, value, raw = false) {
  return `<tr>
    <td style="padding:12px 0;width:118px;vertical-align:top;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#8A8578;border-bottom:1px solid ${RULE}">${label}</td>
    <td style="padding:12px 0;font-size:15px;line-height:1.6;color:#171A1C;border-bottom:1px solid ${RULE}">${raw ? value : esc(value)}</td>
  </tr>`;
}

function customerHtml(d) {
  const first = esc(d.name.split(" ")[0]);
  return `<!doctype html><html><body style="margin:0;background:${CREAM};font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid ${RULE}">
  <tr><td style="background:${NIGHT};padding:32px">
    <div style="font-size:25px;font-weight:600;color:${CREAM};letter-spacing:-.5px">homsify</div>
    <div style="font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${GOLD};margin-top:8px">Request received</div>
  </td></tr>
  <tr><td style="padding:36px 32px 10px">
    <h1 style="margin:0 0 18px;font-size:27px;line-height:1.25;font-weight:400;color:#171A1C">Thanks, ${first} — we've got it.</h1>
    <p style="margin:0 0 16px;font-size:15.5px;line-height:1.7;color:#4A4F53">Your request for <strong>${esc(d.address)}</strong> has been logged and sent to a project manager. Someone will contact you within <strong>one business day</strong> — usually the same day — to confirm the details and book a free on-site estimate.</p>
    <p style="margin:0 0 28px;font-size:15.5px;line-height:1.7;color:#4A4F53">Need us sooner? Call or text <a href="tel:+12263864012" style="color:${GOLD};font-weight:600;text-decoration:none">226-386-4012</a>. We're open 24/7.</p>
  </td></tr>
  <tr><td style="padding:0 32px">
    <div style="font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:#8A8578;padding-bottom:6px">What you sent us</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Property", d.address)}${row("Type", d.propertyType)}${row("Services", d.services.join(", "))}
      ${row("Timeline", d.timeline)}${d.budget ? row("Budget", d.budget) : ""}${row("Details", d.message)}
    </table>
  </td></tr>
  <tr><td style="padding:30px 32px 36px">
    <div style="background:${CREAM};border-left:3px solid ${GOLD};padding:18px 20px;font-size:14.5px;line-height:1.7;color:#4A4F53">
      <strong style="color:#171A1C">What happens next:</strong> a project manager reviews the request, calls to confirm scope, attends the site, and sends a written fixed-price quote. Free, and no obligation.
    </div>
  </td></tr>
  <tr><td style="background:${NIGHT};padding:26px 32px;color:rgba(246,242,234,.6);font-size:12.5px;line-height:1.8">
    <div style="color:${CREAM};font-size:15px;font-weight:600;margin-bottom:8px">Homsify</div>
    Ontario, Canada · 226-386-4012 · Open 24/7<br>
    <a href="mailto:hellohomsify@gmail.com" style="color:${GOLD};text-decoration:none">hellohomsify@gmail.com</a><br>
    <span style="opacity:.75">Fully insured · WSIB covered · Free estimates</span>
  </td></tr>
</table></td></tr></table></body></html>`;
}

function internalHtml(d) {
  const urgent = /urgent/i.test(d.timeline);
  return `<!doctype html><html><body style="margin:0;background:#fff;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid ${RULE}">
  <tr><td style="background:${urgent ? "#8A2F16" : NIGHT};padding:20px 26px;color:#fff">
    <div style="font-size:11px;letter-spacing:2.2px;text-transform:uppercase">${urgent ? "&#9888; URGENT LEAD" : "New quote request"} &middot; ${esc(d.propertyType)}</div>
    <div style="font-size:21px;font-weight:600;margin-top:7px">${esc(d.name)}${d.company ? " — " + esc(d.company) : ""}</div>
  </td></tr>
  <tr><td style="padding:22px 26px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Phone", `<a href="tel:${d.phone.replace(/\D/g, "")}" style="color:${GOLD};font-weight:600;text-decoration:none">${esc(d.phone)}</a>`, true)}
      ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${GOLD};text-decoration:none">${esc(d.email)}</a>`, true)}
      ${row("Address", d.address)}${row("Services", d.services.join(", "))}
      ${row("Timeline", d.timeline)}${row("Budget", d.budget || "—")}${row("Message", d.message)}
    </table>
  </td></tr>
  <tr><td style="padding:6px 26px 26px">
    <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${NIGHT};color:${CREAM};padding:14px 24px;font-size:12.5px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;text-decoration:none">Reply to ${esc(d.name.split(" ")[0])}</a>
  </td></tr>
</table></td></tr></table></body></html>`;
}

/* ── Email providers ──────────────────────────────────────────────────────── */
async function sendBrevo(E, { to, subject, html, replyTo }) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": E.BREVO_API_KEY, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: E.EMAIL_FROM_NAME || "Homsify", email: E.EMAIL_FROM_ADDRESS },
      to: [{ email: to }],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

async function sendResend(E, { to, subject, html, replyTo }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${E.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${E.EMAIL_FROM_NAME || "Homsify"} <${E.EMAIL_FROM_ADDRESS}>`,
      to: [to], reply_to: replyTo, subject, html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const send = (E, msg) => (E.EMAIL_PROVIDER === "resend" ? sendResend(E, msg) : sendBrevo(E, msg));

/* ── Turnstile (optional) ─────────────────────────────────────────────────── */
async function turnstileOk(E, token, ip) {
  if (!E.TURNSTILE_SECRET_KEY) return true; // not configured yet
  const body = new FormData();
  body.append("secret", E.TURNSTILE_SECRET_KEY);
  body.append("response", token || "");
  if (ip) body.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  return (await r.json()).success === true;
}

/* ── Handler ──────────────────────────────────────────────────────────────
   Netlify Function (v2). Web-standard Request/Response, same as the original
   Cloudflare edge function. Secrets come from Netlify → Project configuration
   → Environment variables. They never reach the browser and are not in git.
   ────────────────────────────────────────────────────────────────────────── */
const E = process.env;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });

export default async function handler(request, context) {
  if (request.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } });

  try {
    const ip = context?.ip || request.headers.get("x-nf-client-connection-ip") || "unknown";
    if (rateLimited(ip)) return json({ ok: false, error: "Too many requests. Please call us at 226-386-4012." }, 429);

    if ((request.headers.get("content-type") || "").indexOf("application/json") === -1)
      return json({ ok: false, error: "Bad request." }, 400);

    const body = await request.json();

    // Honeypot: bots fill hidden fields, people don't. Look successful, save nothing.
    if (body.website) return json({ ok: true });

    if (!(await turnstileOk(E, body.turnstileToken, ip)))
      return json({ ok: false, error: "Verification failed. Please reload and try again." }, 403);

    const missing = REQUIRED.filter((k) => !String(body?.[k] ?? "").trim());
    if (missing.length) return json({ ok: false, error: "Please fill in every required field." }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(body.email)) return json({ ok: false, error: "That email address doesn't look right." }, 400);
    if (!Array.isArray(body.services) || body.services.length === 0) return json({ ok: false, error: "Choose at least one service." }, 400);

    const d = {
      name: clean(body.name, MAX.name),
      company: clean(body.company, MAX.company),
      email: clean(body.email, MAX.email).toLowerCase(),
      phone: clean(body.phone, MAX.phone),
      address: clean(body.address, MAX.address),
      propertyType: clean(body.propertyType, MAX.propertyType),
      services: body.services.slice(0, 30).map((s) => clean(s, 80)),
      budget: clean(body.budget, MAX.budget),
      timeline: clean(body.timeline, MAX.timeline),
      message: clean(body.message, MAX.message),
    };

    /* ── 1. Store the lead in Supabase ─────────────────────────────────── */
    let stored = false;
    try {
      const res = await fetch(`${E.SUPABASE_URL}/rest/v1/quote_requests`, {
        method: "POST",
        headers: {
          apikey: E.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${E.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: d.name, company: d.company || null, email: d.email, phone: d.phone,
          address: d.address, property_type: d.propertyType, services: d.services,
          budget: d.budget || null, timeline: d.timeline, message: d.message,
          page_path: typeof body.pagePath === "string" ? body.pagePath.slice(0, 200) : null,
          user_agent: (request.headers.get("user-agent") || "").slice(0, 300),
        }),
      });
      stored = res.ok;
      if (!res.ok) console.error("supabase", res.status, await res.text());
    } catch (e) {
      console.error("supabase insert failed", e);
    }

    /* ── 2. Email the customer and the office ──────────────────────────── */
    const office = E.EMAIL_INTERNAL || E.EMAIL_FROM_ADDRESS;
    const urgent = /urgent/i.test(d.timeline);
    const results = await Promise.allSettled([
      send(E, { to: d.email, replyTo: office, subject: "We've received your request — Homsify", html: customerHtml(d) }),
      send(E, {
        to: office, replyTo: d.email,
        subject: `${urgent ? "[URGENT] " : ""}New lead — ${d.name}, ${d.propertyType} — ${d.services.slice(0, 2).join(", ")}`,
        html: internalHtml(d),
      }),
    ]);
    results.forEach((r) => r.status === "rejected" && console.error("email failed", r.reason));

    // A lead is never lost: as long as one channel worked, report success.
    if (!stored && results.every((r) => r.status === "rejected"))
      return json({ ok: false, error: "We couldn't submit that. Please call 226-386-4012." }, 502);

    return json({ ok: true });
  } catch (err) {
    console.error("fatal", err);
    return json({ ok: false, error: "Something went wrong on our end." }, 500);
  }
}

/* Route this function at /api/quote so the form's existing call is unchanged. */
export const config = { path: "/api/quote" };
