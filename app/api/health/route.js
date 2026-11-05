/* ============================================================================
   GET /api/health/  —  TEMPORARY diagnostic. Delete once the form is working.

   Reports only whether each environment variable is PRESENT and what status
   Supabase returns. It never returns a key, a value, or any lead data.
   ========================================================================== */
export const dynamic = "force-dynamic";

const E = process.env;
const present = (k) => Boolean(E[k] && String(E[k]).trim());

function supabaseAuthHeaders(key) {
  const k = String(key || "");
  return k.startsWith("eyJ") ? { apikey: k, Authorization: `Bearer ${k}` } : { apikey: k };
}

export async function GET() {
  const env = {
    SUPABASE_URL: present("SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: present("SUPABASE_SERVICE_ROLE_KEY"),
    EMAIL_PROVIDER: present("EMAIL_PROVIDER") ? E.EMAIL_PROVIDER : false,
    BREVO_API_KEY: present("BREVO_API_KEY"),
    EMAIL_FROM_ADDRESS: present("EMAIL_FROM_ADDRESS"),
    EMAIL_INTERNAL: present("EMAIL_INTERNAL"),
  };

  // Shape of the key, not the key: tells us which auth header style is used.
  const k = String(E.SUPABASE_SERVICE_ROLE_KEY || "");
  const keyShape = !k ? "absent" : k.startsWith("sb_secret_") ? "sb_secret_ (new)"
    : k.startsWith("eyJ") ? "eyJ (legacy JWT)" : "unrecognised prefix";

  // Can we actually reach the leads table? Read zero rows; writes nothing.
  let supabase = "not attempted";
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const r = await fetch(`${E.SUPABASE_URL}/rest/v1/quote_requests?select=id&limit=0`, {
        headers: supabaseAuthHeaders(E.SUPABASE_SERVICE_ROLE_KEY),
      });
      supabase = `HTTP ${r.status}` + (r.ok ? " OK" : ` — ${(await r.text()).slice(0, 300)}`);
    } catch (e) {
      supabase = `fetch threw: ${e.message}`;
    }
  }

  // Does Brevo accept the key? /account is read-only.
  let brevo = "not attempted";
  if (env.BREVO_API_KEY) {
    try {
      const r = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": E.BREVO_API_KEY, accept: "application/json" },
      });
      brevo = `HTTP ${r.status}` + (r.ok ? " OK" : ` — ${(await r.text()).slice(0, 300)}`);
    } catch (e) {
      brevo = `fetch threw: ${e.message}`;
    }
  }

  return new Response(JSON.stringify({ env, keyShape, supabase, brevo }, null, 2), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
