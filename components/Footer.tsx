import Link from "next/link";
import Logo from "./Logo";
import { company, allServices, cities } from "@/content/site";

export default function Footer() {
  const popular = allServices.filter(s =>
    ["HM-01", "HM-07", "HM-08", "HM-18", "HM-15", "HM-21"].includes(s.code));
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <div className="ftr__logo"><Logo height={38} /></div>
            <p className="ftr__blurb">
              Property maintenance, renovation and services for residential, commercial
              and public-sector clients across Ontario. Open 24/7.
            </p>
          </div>
          <div className="ftr__col">
            <h4>Popular services</h4>
            <ul>{popular.map(s => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul>
          </div>
          <div className="ftr__col">
            <h4>Where we work</h4>
            <ul>{cities.map(c => <li key={c.name}><Link href="/#areas">{c.name}</Link></li>)}</ul>
          </div>
          <div className="ftr__col">
            <h4>Contact</h4>
            <ul>
              <li><a href={company.phoneHref}>{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><Link href="/#quote">Request a quote</Link></li>
              <li><span style={{ opacity: .7 }}>{company.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="ftr__base">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Fully insured · WSIB covered · Free estimates</p>
        </div>
      </div>
    </footer>
  );
}
