"use client";

import mixpanel from "mixpanel-browser";
import posthog from "posthog-js";

export type EventProperties = Record<string, unknown>;

let mixpanelInitialized = false;

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined" || posthog.__loaded) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    capture_pageview: true
  });
}

export function initMixpanel() {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token || typeof window === "undefined" || mixpanelInitialized) return;
  if (window.localStorage.getItem("mixpanel_consent") === "denied") return;

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage"
  });
  mixpanelInitialized = true;
}

export function trackEvent(eventName: string, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanelInitialized) {
    mixpanel.track(eventName, properties);
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }

  const ga = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (process.env.NEXT_PUBLIC_GA_ID && ga) {
    ga("event", eventName, properties || {});
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      path: window.location.pathname,
      properties
    })
  }).catch(() => undefined);
}

export function storeUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref", "channel", "persona"];
  const stored: Record<string, string> = {};

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) stored[key] = value;
  });

  if (Object.keys(stored).length > 0) {
    localStorage.setItem("condition_lab_attribution", JSON.stringify(stored));
  }
}

export function getStoredAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("condition_lab_attribution") || "{}") as Record<string, unknown>;
  } catch {
    return {};
  }
}
