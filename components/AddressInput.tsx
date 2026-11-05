"use client";
import { useEffect, useRef, useState } from "react";

type Hit = { line1: string; line2: string; full: string };

/** Address autocomplete backed by Photon (OpenStreetMap).
 *  Free, no API key, nothing secret to leak, and no third-party script on the
 *  page. Results are biased to Ontario. Typing a full address by hand still
 *  works — the dropdown is a shortcut, never a requirement. */
export default function AddressInput() {
  const [value, setValue] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (value.trim().length < 4) { setHits([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      setBusy(true);
      try {
        const url = "https://photon.komoot.io/api/?q=" + encodeURIComponent(value)
          + "&limit=6&lang=en&lat=43.0&lon=-81.2";
        const res = await fetch(url, { signal: ctrl.signal });
        const data = await res.json();
        const out: Hit[] = (data.features || [])
          .filter((f: any) => f.properties?.countrycode === "CA")
          .map((f: any) => {
            const p = f.properties;
            const line1 = [p.housenumber, p.street || p.name].filter(Boolean).join(" ");
            const line2 = [p.city || p.district, p.state, p.postcode].filter(Boolean).join(", ");
            return { line1: line1 || p.name || "", line2, full: [line1 || p.name, line2].filter(Boolean).join(", ") };
          })
          .filter((h: Hit) => h.full);
        setHits(out); setOpen(out.length > 0); setCursor(-1);
      } catch { /* aborted or offline — typing still works */ }
      finally { setBusy(false); }
    }, 280);
    return () => clearTimeout(t);
  }, [value]);

  const choose = (h: Hit) => { setValue(h.full); setOpen(false); setHits([]); };

  return (
    <div className="field">
      <label htmlFor="f-address">Property address <span className="req">*</span></label>
      <div className="ac" ref={box}>
        <input
          id="f-address" name="address" required autoComplete="off" role="combobox"
          aria-expanded={open} aria-controls="acList" aria-autocomplete="list"
          placeholder="Start typing, then pick from the list"
          value={value} onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (!open || !hits.length) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => (c + 1) % hits.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => (c - 1 + hits.length) % hits.length); }
            else if (e.key === "Enter" && cursor >= 0) { e.preventDefault(); choose(hits[cursor]); }
            else if (e.key === "Escape") setOpen(false);
          }}
        />
        {busy && <div className="ac__busy" aria-hidden="true" />}
        {open && (
          <ul className="ac__list" id="acList" role="listbox">
            {hits.map((h, i) => (
              <li key={h.full} role="option" aria-selected={i === cursor}>
                <button type="button" className={i === cursor ? "cursor" : ""}
                  onMouseEnter={() => setCursor(i)} onClick={() => choose(h)}>
                  {h.line1}<small>{h.line2}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="hint">Suggestions come from OpenStreetMap. You can also type the address yourself.</p>
    </div>
  );
}
