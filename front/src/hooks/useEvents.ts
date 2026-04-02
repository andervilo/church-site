import { useState, useEffect } from "react";
import { api, ChurchEvent } from "../lib/api";

export function useEvents(type?: string) {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getEvents(type)
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [type]);

  return { events, loading, error };
}
