-- Bảng groups
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (name <> ''),
  color TEXT DEFAULT '#3b82f6', -- màu mặc định (blue-500)
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng todos (cập nhật)
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (title <> ''),
  description TEXT,
  completed BOOLEAN DEFAULT false,
  "groupId" UUID REFERENCES groups(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Tạo Group mặc định "Inbox"
INSERT INTO groups (name, color)
SELECT 'Inbox', '#10b981'
WHERE NOT EXISTS (SELECT 1 FROM groups WHERE name = 'Inbox');

-- Dữ liệu mẫu
INSERT INTO todos (title, description, completed, "groupId")
SELECT 'Học TanStack Query', 'Hoàn thành khóa học React Query', false, 
       (SELECT id FROM groups WHERE name = 'Inbox')
WHERE NOT EXISTS (SELECT 1 FROM todos WHERE title = 'Học TanStack Query');

INSERT INTO todos (title, description, completed, "groupId")
SELECT 'Viết báo cáo cuối kỳ', 'Deadline tuần này', true, 
       (SELECT id FROM groups WHERE name = 'Inbox')
WHERE NOT EXISTS (SELECT 1 FROM todos WHERE title = 'Viết báo cáo cuối kỳ');

-- Tạo thêm vài group mẫu
INSERT INTO groups (name, color)
SELECT 'Công việc', '#f59e0b'
WHERE NOT EXISTS (SELECT 1 FROM groups WHERE name = 'Công việc');

INSERT INTO groups (name, color)
SELECT 'Cá nhân', '#8b5cf6'
WHERE NOT EXISTS (SELECT 1 FROM groups WHERE name = 'Cá nhân');