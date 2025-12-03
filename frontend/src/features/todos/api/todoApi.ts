import type { Todo } from "../types";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/todos`;

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Không thể tải danh sách todo");
    return res.json();
  },

  getById: async (id: string): Promise<Todo> => {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy todo");
    return res.json();
  },

  create: async (data: { 
    title: string; 
    description?: string; 
    groupId?: string | null 
  }): Promise<Todo> => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Tạo todo thất bại");
    return res.json();
  },

  updateStatus: async (id: string, completed: boolean): Promise<Todo> => {
    const res = await fetch(`${API_BASE}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Cập nhật trạng thái thất bại");
    return res.json();
  },

  update: async (data: { 
    id: string; 
    title?: string; 
    description?: string | null; 
    groupId?: string | null 
  }): Promise<Todo> => {
    const { id, ...payload } = data;
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Cập nhật thất bại");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Xóa todo thất bại");
  },

  reorder: async (updates: Array<{ id: string; order: number }>): Promise<void> => {
    const res = await fetch(`${API_BASE}/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    if (!res.ok) throw new Error("Cập nhật thứ tự thất bại");
  },
};