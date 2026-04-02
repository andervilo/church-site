import { useState, useEffect } from "react";
import { api, SiteSetting } from "../lib/api";

export interface SiteSettings {
  church_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  service_times?: Array<{ day: string; times: string[] }>;
  social_links?: { facebook?: string; instagram?: string; youtube?: string };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getSettings()
      .then((data: SiteSetting[]) => {
        const mapped: Record<string, unknown> = {};
        data.forEach((s) => {
          mapped[s.key] = s.value;
        });
        setSettings(mapped as unknown as SiteSettings);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading, error };
}
