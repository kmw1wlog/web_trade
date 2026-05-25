import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { defaultMetadata, site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  openGraph: {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    siteName: site.siteName,
    locale: "ko_KR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AnalyticsProvider />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
