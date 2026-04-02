const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Tipos ---

export interface Ministry {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  leaderName: string;
  meetingDay: string;
  meetingTime: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  type: "WEEKLY" | "SPECIAL" | "MINISTRY";
  imageUrl: string;
  startDate: string;
  endDate: string;
  location: string;
  ministryId: string | null;
  ministryName: string | null;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email: string;
  expertise: string[];
  officeHours: string;
  displayOrder: number;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown> | string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// --- API pública ---

export const api = {
  // Ministérios
  getMinistries: () => request<Ministry[]>("/ministries"),
  getMinistryBySlug: (slug: string) => request<Ministry>(`/ministries/${slug}`),

  // Eventos
  getEvents: (type?: string) => {
    const params = type ? `?type=${type}` : "";
    return request<ChurchEvent[]>(`/events${params}`);
  },
  getEventsByMonth: (year: number, month: number) =>
    request<ChurchEvent[]>(`/events?year=${year}&month=${month}`),
  getEventById: (id: string) => request<ChurchEvent>(`/events/${id}`),

  // Equipe pastoral
  getTeam: () => request<TeamMember[]>("/team"),
  getTeamMember: (id: string) => request<TeamMember>(`/team/${id}`),

  // Configurações
  getSettings: () => request<SiteSetting[]>("/settings"),
  getSetting: (key: string) => request<SiteSetting>(`/settings/${key}`),

  // Contato
  sendContact: (data: ContactData) =>
    request<void>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
