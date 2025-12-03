export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  groupId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  color: string; // Hex code từ database: "#3b82f6", "#ef4444", etc.
  createdAt: string;
  updatedAt: string;
}