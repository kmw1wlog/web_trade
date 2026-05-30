"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initMixpanel, initPostHog, storeUtmParams } from "@/lib/analytics";

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    storeUtmParams();
    initPostHog();
    initMixpanel();
  }, []);

  return gaId ? (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  ) : null;
}
