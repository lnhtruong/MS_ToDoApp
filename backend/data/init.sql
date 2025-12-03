-- Bảng groups
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name <> ''),
  color TEXT DEFAULT '#3b82f6',
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

-- Tạo Group mặc định
INSERT INTO groups (name, color)
VALUES ('Inbox', '#10b981')
ON CONFLICT (name) DO NOTHING;

INSERT INTO groups (name, color)
VALUES 
  ('Công việc', '#f59e0b'),
  ('Cá nhân', '#8b5cf6')
ON CONFLICT (name) DO NOTHING;

-- Dữ liệu mẫu
INSERT INTO todos (title, description, "order", completed, "groupId")
VALUES 
  ('Học TanStack Query', 'Hoàn thành khóa học React Query', 0, false, 
   (SELECT id FROM groups WHERE name = 'Inbox')),
  ('Viết báo cáo cuối kỳ', 'Deadline tuần này', 1, true, 
   (SELECT id FROM groups WHERE name = 'Inbox'))
ON CONFLICT (id) DO NOTHING;