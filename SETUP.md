# Homsify — Setup & Update Guide

Written for someone who has never opened a terminal. Setup takes about 45 minutes.
Cost to start: **$0/month**, plus roughly $12/year for a domain.

---

## Why not Vercel

You were right to flag it. In April 2026 Vercel disclosed a breach: an attacker
compromised a third-party AI tool a Vercel employee used, pivoted through that
employee's Google Workspace via OAuth, and reached internal Vercel systems. The
damaging detail for a site like yours is that **environment variables not
explicitly marked "sensitive" were stored decryptable and were readable inside
compromised team scopes** — and environment variables are exactly where your
Supabase key and email API key live.

Vercel has since fixed the underlying issue and it remains a competent host. But
you asked for the safer choice, and there is one.

**We're using Cloudflare Pages instead.** It's free, it's the largest security
company on the internet, and it gives you things Vercel doesn't include:

| | Cloudflare Pages |
|---|---|
| DDoS protection | Included, unmetered, on every plan |
| Web Application Firewall | Included |
| Bot protection (Turnstile) | Free, unlimited |
| Secrets | Encrypted at rest by default — no "sensitive" checkbox to forget |
| Bandwidth | Unlimited on the free plan |
| DNS + domain registrar | Same account, at cost |

---

## The system in one picture

```
   You (in a browser)
        │  edit content/site.ts   ·   drop photos into public/images
        ▼
   GITHUB ────────────► CLOUDFLARE PAGES ────────────► homsify.ca
   (stores the site)    (builds, hosts, shields)       (what customers see)
                               │
                   someone submits the quote form
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
               SUPABASE                BREVO
          (saves the lead)      (2 emails: customer
                                 confirmation + your alert)
```

Four accounts. All free at your volume.

---

## Part 1 — Get it online (30 min)

### 1. GitHub — where the site lives
1. Sign up at **github.com**. **Turn on two-factor authentication immediately** (Settings → Password and authentication). This is the account that can change your website; treat it like online banking.
2. **+** → **New repository**. Name it `homsify`. Set it **Private**. Create.
3. Click **uploading an existing file**, drag in the contents of the unzipped `homsify` folder, and **Commit changes**.

### 2. Supabase — where leads are stored
1. Sign up at **supabase.com** → **New project**. Name: `homsify`. Region: **East US (North Virginia)** (closest to Ontario). Save the database password in a password manager. Turn on 2FA.
2. Sidebar → **SQL Editor** → **New query**. Open `supabase/schema.sql`, copy all of it, paste, **Run**. You should see "Success."
3. Sidebar → **Table Editor** → `quote_requests` now exists. **That's your lead inbox.**
4. Sidebar → **Project Settings** → **API**. Copy two values into a notepad:
   - **Project URL**
   - **service_role** key (click reveal — this one is a master key, treat it like a password)

> Note: unlike a typical setup, your website never talks to Supabase from the browser. Only the Cloudflare function does, using the service-role key. There is no public path to your lead list at all.

### 3. Brevo — free email, no domain needed
This answers your question directly. You do **not** need to buy a domain to start sending.

Resend and most providers require you to own and verify a domain. **Brevo doesn't** — it lets you verify a single sender address, including a Gmail address. Free forever: 300 emails/day.

1. Sign up at **brevo.com**.
2. **Senders, Domains & Dedicated IPs** → **Senders** → **Add a sender** → enter `hellohomsify@gmail.com`. Brevo emails you a confirmation link. Click it. Done.
3. **SMTP & API** → **API Keys** → **Generate a new API key**. Copy it.

That's it — real emails, from your real address, today, for free.

**When you buy the domain** (do it soon — `hellohomsify@gmail.com` in a quote email reads as less established than `quotes@homsify.ca`):
- Buy `homsify.ca` at **Cloudflare Registrar** (~$12/yr, sold at cost, free WHOIS privacy).
- In Brevo: **Domains** → add `homsify.ca` → it gives you three DNS records (SPF, DKIM, DMARC). Add them in Cloudflare DNS. Verify.
- Change `EMAIL_FROM_ADDRESS` to `quotes@homsify.ca`. Nothing else changes.
- Those three records are also what keeps your mail out of spam folders and stops anyone spoofing your address.

### 4. Cloudflare Pages — hosting
1. Sign up at **cloudflare.com**. Turn on 2FA.
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick your `homsify` repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Expand **Environment variables** and add these. **Click the lock icon on each one to mark it Encrypted:**

| Name | Value |
|---|---|
| `SUPABASE_URL` | your Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key |
| `EMAIL_PROVIDER` | `brevo` |
| `BREVO_API_KEY` | your Brevo API key |
| `EMAIL_FROM_NAME` | `Homsify` |
| `EMAIL_FROM_ADDRESS` | `hellohomsify@gmail.com` |
| `EMAIL_INTERNAL` | `hellohomsify@gmail.com` |

5. **Save and Deploy.** Two minutes later you have a live `.pages.dev` URL.
6. **Custom domains** → add `homsify.ca`. If you bought it at Cloudflare it connects in one click.

**Test it:** submit the quote form on the live site with your own email. Within seconds you should get a confirmation, your inbox should get the lead alert, and a new row should appear in Supabase → Table Editor.

---

## Part 2 — Locking it down (15 min, do this on day one)

1. **Turnstile** (free bot protection). Cloudflare dashboard → **Turnstile** → **Add site** → domain `homsify.ca`. Copy the **Secret Key**, add it to Pages as an encrypted variable named `TURNSTILE_SECRET_KEY`. The form code already checks for it and skips the check until you add it.
2. **WAF.** Your domain → **Security** → **WAF** → turn on the **Cloudflare Managed Ruleset**. Free, blocks the common attack traffic.
3. **Always Use HTTPS.** Your domain → **SSL/TLS** → **Edge Certificates** → toggle on **Always Use HTTPS** and **Automatic HTTPS Rewrites**. Set SSL mode to **Full (strict)**.
4. **2FA everywhere** — GitHub, Cloudflare, Supabase, Brevo, and the Gmail account. Use an authenticator app, not SMS.
5. **Password manager.** Never reuse the Gmail password anywhere. The Vercel breach started with malware stealing browser-saved credentials off one laptop.
6. **Check your work** at `securityheaders.com` — paste your URL. The `public/_headers` file in this project should score you an A or A+.

### What's already built in
- **No npm dependencies in the backend.** The quote handler is plain JavaScript calling Supabase and Brevo over HTTPS. Nothing in the supply chain to compromise, nothing to patch.
- **Static site.** There's no server running your code in production — just files on a CDN. Most classes of web attack have nothing to aim at.
- **Rate limiting** — 5 submissions per IP per 10 minutes.
- **Honeypot field** — catches most bots before Turnstile is even needed.
- **Input sanitising and length caps** on every field before anything is stored or emailed.
- **HTML escaping** on every value that reaches an email, so nobody can inject content into messages you receive.
- **Content Security Policy** and a full set of security headers in `public/_headers`.
- **RLS deny-by-default** on the leads table, with no public policy at all.

---

## Part 3 — Updating the site

### The one file that matters
**`content/site.ts`** holds every piece of text: phone number, email, hours, all 23 services, cities, testimonials, project names, hero copy, form options.

**To change any text:**
1. GitHub repo → `content` → `site.ts` → click the **pencil icon**.
2. Change only what's between the `"quotation marks"`.
3. Scroll down → **Commit changes**. Live in about 60 seconds.

**To replace a photo:**
1. GitHub → `public` → **Add file** → **Upload files** → drag your photo in → Commit.
2. In `site.ts`, change that image line to `"/images/your-photo.jpg"`.

Photos should be JPG or WebP, 1600–2400px wide, under 500KB. Name them descriptively (`bathtub-reglaze-london.jpg`, not `IMG_4471.jpg`).

**For anything bigger** — a new section, a new page, a design change — paste this to Claude:

> Here's my current `[filename]` from the Homsify site: `[paste the file]`
> I want to `[what you want]`. Give me the complete updated file to paste back into GitHub.

---

## Part 4 — Running the lead pipeline

**Where leads live:** Supabase → **Table Editor** → `quote_requests`. Edit the `status` column inline: `new` → `contacted` → `quoted` → `won` / `lost`.

**Cleaner view:** SQL Editor → `select * from quote_requests_inbox;`

**Export:** Table Editor → `⋮` → **Download as CSV**.

**Urgent leads** (anyone picking "Urgent — as soon as possible") arrive with a red header and `[URGENT]` in the subject line.

**A lead is never lost.** If Supabase is down, the emails still send. If email fails, the row is still saved. Only if both fail does the form show an error and tell the customer to call.

---

## Part 5 — Costs

| Service | Free tier covers | Then |
|---|---|---|
| Cloudflare Pages | Unlimited bandwidth, 100k function calls/day | $5/mo |
| Supabase | 500MB (~250,000 leads) | $25/mo |
| Brevo | 300 emails/day | $9/mo |
| Domain | — | ~$12/year at Cloudflare |

Realistically: **$12/year total** for the first few years.

---

## Part 6 — After launch, in priority order

1. **Google Business Profile.** Claim `Homsify`, London ON. This drives more calls than the website will. List all 23 services, post photos weekly.
2. **Buy the domain.** `hellohomsify@gmail.com` on a quote costs you credibility with commercial and municipal clients.
3. **Your own photos.** The site currently uses free Pexels stock (licensed for commercial use, no attribution needed). Twenty of your own before/after pairs will outperform all of it.
4. **Real reviews.** Replace the three placeholder testimonials with real client quotes, with permission and real names.
5. **Real numbers.** The stats are placeholders. Put your true figures in — specific and modest beats round and inflated.
6. **Service page copy.** Each of the 23 service pages currently uses its one-line description. Ask Claude for 300–500 words per page; that's what wins searches like "bathtub reglazing London Ontario."
7. **Analytics.** Cloudflare Web Analytics — one toggle, free, no cookie banner required.

---

## Troubleshooting

**Emails aren't arriving** — Brevo → **Statistics** → **Email** shows every send and why it failed. Usually the sender address isn't confirmed yet.

**Form says "Something went wrong"** — Cloudflare → your Pages project → **Functions** → **Real-time logs**. The handler prints the exact reason.

**A link doesn't scroll** — this was a real bug in the earlier build and is fixed. If it ever comes back, the cause is `overflow-x: hidden` on `body` or `html`, which turns that element into a scroll container and silently kills anchor scrolling. Use `overflow-x: clip` instead.

**Site won't build after an edit** — you deleted a comma or a `}` in `site.ts`. Cloudflare keeps the last working version live, so the public site is safe. GitHub → the file → **History** → revert, or paste it to Claude to find the break.

**A change isn't showing** — builds take 60–90 seconds. Hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac).
