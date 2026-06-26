import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
  getDefaultDescription,
} from "@/lib/seo";
import {
  buildOrganization,
  buildLocalBusiness,
  buildEducationalOrganization,
  buildWebSite,
  buildSchemaGraph,
} from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Hornbill Aviation",
    default: "Part 61 flight school in Reno, NV",
  },
  description: getDefaultDescription(),
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/"),
    title: buildTitle(),
    description: getDefaultDescription(),
  }),
  twitter: buildTwitter({
    title: buildTitle(),
    description: getDefaultDescription(),
  }),
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseSchema = buildSchemaGraph(
    buildOrganization(),
    buildLocalBusiness(),
    buildEducationalOrganization(),
    buildWebSite()
  );

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SchemaInjector schema={baseSchema} id="base-schema" />

        {siteConfig.analytics.gaMeasurementId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaMeasurementId}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.gaMeasurementId}', {
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {siteConfig.analytics.clarityProjectId && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", '${siteConfig.analytics.clarityProjectId}');
              `,
            }}
          />
        )}

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
