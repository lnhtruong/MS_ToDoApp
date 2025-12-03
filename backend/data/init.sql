-- Bảng groups
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name <> ''),
  color TEXT DEFAULT 'bg-blue-500',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng todos
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (title <> ''),
  description TEXT,
  completed BOOLEAN DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  "groupId" UUID REFERENCES groups(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index để tăng tốc reorder và lọc theo group
CREATE INDEX IF NOT EXISTS idx_todos_group_order ON todos("groupId", "order");
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Trigger cập nhật updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_groups_updated_at ON groups;
CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tạo Group mặc định với Tailwind class names
INSERT INTO groups (name, color)
VALUES ('Inbox', 'bg-emerald-500')
ON CONFLICT (name) DO NOTHING;

INSERT INTO groups (name, color)
VALUES 
  ('Công việc', 'bg-orange-500'),
  ('Cá nhân', 'bg-purple-500')
ON CONFLICT (name) DO NOTHING;

-- Dữ liệu mẫu
INSERT INTO todos (title, description, "order", completed, "groupId")
VALUES 
  ('Học TanStack Query', 'Hoàn thành khóa học React Query', 0, false, 
   (SELECT id FROM groups WHERE name = 'Inbox')),
  ('Viết báo cáo cuối kỳ', 'Deadline tuần này', 1, true, 
   (SELECT id FROM groups WHERE name = 'Inbox'))
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SCRIPT CẬP NHẬT SANG TAILWIND CLASS NAMES
-- ============================================
-- Chạy script này để convert màu hex cũ sang Tailwind classes

UPDATE groups SET color = 'bg-emerald-500' WHERE color = '#10b981';
UPDATE groups SET color = 'bg-orange-500' WHERE color = '#f59e0b';
UPDATE groups SET color = 'bg-purple-500' WHERE color = '#8b5cf6';
UPDATE groups SET color = 'bg-blue-500' WHERE color = '#3b82f6';
UPDATE groups SET color = 'bg-rose-500' WHERE color = '#f43f5e';
UPDATE groups SET color = 'bg-sky-500' WHERE color = '#0ea5e9';
UPDATE groups SET color = 'bg-pink-500' WHERE color = '#ec4899';
UPDATE groups SET color = 'bg-amber-500' WHERE color = '#f59e0b';
UPDATE groups SET color = 'bg-teal-500' WHERE color = '#14b8a6';
UPDATE groups SET color = 'bg-indigo-500' WHERE color = '#6366f1';
UPDATE groups SET color = 'bg-violet-500' WHERE color = '#8b5cf6';

-- ============================================
-- DANH SÁCH MÀU TAILWIND KHẢ DỤNG
-- ============================================
-- Frontend có thể dùng các màu này:
-- bg-red-500
-- bg-orange-500
-- bg-yellow-500
-- bg-green-500
-- bg-emerald-500
-- bg-teal-500
-- bg-cyan-500
-- bg-blue-500
-- bg-indigo-500
-- bg-purple-500
-- bg-pink-500