import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="sec" style={{ paddingTop: 200, textAlign: "center" }}>
        <div className="wrap">
          <p className="eyebrow">404</p>
          <h1 className="dsp" style={{ marginTop: 16 }}>That page has moved on.</h1>
          <p className="lede" style={{ margin: "22px auto 0" }}>
            The link is broken or the page no longer exists. Everything Homsify does
            is on the home page — or just call us.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <Link className="btn" href="/">Back to home</Link>
            <a className="btn btn--outline" href={company.phoneHref}>{company.phone}</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
