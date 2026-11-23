import type { Metadata } from "next";
import "./globals.css";
import { seo, company } from "@/content/site";
import SmoothLinks from "@/components/SmoothLinks";

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title, description: seo.description, url: seo.url,
    siteName: company.name, locale: "en_CA", type: "website",
  },
  verification: {
    google: "wgGp2U4-NbkmTj9SzlnHN9LrEzRYq0lAR8wJAX2OSq8",
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: company.name,
  description: seo.description,
  telephone: company.phone,
  email: company.email,
  url: seo.url,
  address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
  areaServed: { "@type": "State", name: "Ontario" },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <Script
          id="google-tag-gtm"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KJ9T9448"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body>
        <SmoothLinks />
        {children}
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
