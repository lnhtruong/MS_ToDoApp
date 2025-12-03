import type { Group } from "../types";

const API = `${import.meta.env.VITE_API_BASE_URL}/groups`;

export const groupApi = {
  getAll: async (): Promise<Group[]> => {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Lấy nhóm thất bại");
    return res.json();
  },

  create: async (name: string, color: string): Promise<Group> => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });
    if (!res.ok) throw new Error("Tạo nhóm thất bại");
    return res.json();
  },

  update: async (id: string, data: Partial<Group>): Promise<Group> => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Cập nhật thất bại");
    return res.json();
  },
  
  delete: async (id: string) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  },
};