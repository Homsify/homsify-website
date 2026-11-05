"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { allServices } from "@/content/site";

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

/** Shows the services that are actually in season this month in Ontario.
 *  Client-rendered so it stays correct without ever rebuilding the site. */
export default function SeasonBand() {
  const [month, setMonth] = useState(0);
  useEffect(() => { setMonth(new Date().getMonth() + 1); }, []);
  if (!month) return null;

  const seasonal = allServices.filter(s => Array.isArray(s.season) && s.season.includes(month));
  const list = (seasonal.length ? seasonal : allServices).slice(0, 6);

  return (
    <section className="season" aria-labelledby="seasonHead">
      <div className="season__in">
        <div>
          <p className="eyebrow">Right now</p>
          <h2 className="dsp dsp--sm" id="seasonHead">{MONTHS[month - 1]} — booking now</h2>
          <p className="lede" style={{ marginTop: 12 }}>
            Property work in Ontario runs on a calendar. These are the services
            we&rsquo;re scheduling this month.
          </p>
        </div>
        <div className="season__list">
          {list.map(s => (
            <Link key={s.slug} className="season__item" href={`/services/${s.slug}`}>
              <b>{s.name}</b><small>{s.short}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
