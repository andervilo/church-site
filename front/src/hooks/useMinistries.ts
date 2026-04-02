import { useState, useEffect } from "react";
import { api, Ministry } from "../lib/api";

export function useMinistries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getMinistries()
      .then(setMinistries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { ministries, loading, error };
}

export function useMinistry(slug: string | undefined) {
  const [ministry, setMinistry] = useState<Ministry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .getMinistryBySlug(slug)
      .then(setMinistry)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { ministry, loading, error };
}
