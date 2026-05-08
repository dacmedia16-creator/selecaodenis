import { supabase } from "@/integrations/supabase/client";

export type CtaSource =
  | "header"
  | "hero"
  | "inline_historias"
  | "inline_virada"
  | "inline_conquistas"
  | "inline_mitos"
  | "final_cta";

const SESSION_KEY = "rmx_session_id";
const LAST_CTA_KEY = "rmx_last_cta";

export const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
};

export const getLastCtaSource = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LAST_CTA_KEY);
  } catch {
    return null;
  }
};

export const trackCtaClick = (source: CtaSource): void => {
  try {
    localStorage.setItem(LAST_CTA_KEY, source);
  } catch {
    // ignore
  }

  // Fire-and-forget; never block navigation/UI
  void supabase
    .from("cta_clicks")
    .insert({
      source,
      session_id: getSessionId() || null,
      path: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    })
    .then(({ error }) => {
      if (error) console.warn("[trackCtaClick]", error.message);
    });
};
