import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useTodosQuery } from "@/features/todos/hooks/useTodosQuery";
import { useGroupsQuery } from "@/features/todos/hooks/useGroupsQuery";

// Constant cho "không nhóm"
const NO_GROUP = "NO_GROUP";

export const TodoFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Dùng NO_GROUP thay vì empty string
  const [groupId, setGroupId] = useState<string>(NO_GROUP);
  const { createTodo, isCreating } = useTodosQuery();
  const { groups } = useGroupsQuery();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề");
      return;
    }

    try {
      await createTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        // Convert NO_GROUP về null khi gửi lên backend
        groupId: groupId === NO_GROUP ? null : groupId,
      });
      navigate({ to: "/" });
    } catch (error) {
      console.error("Lỗi khi tạo việc:", error);
      alert("Không thể tạo việc. Vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <button 
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Tạo việc mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input 
                id="title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Nhập tiêu đề công việc..."
                required 
                autoFocus 
                disabled={isCreating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Nhóm</Label>
              <Select value={groupId} onValueChange={setGroupId} disabled={isCreating}>
                <SelectTrigger id="group">
                  <SelectValue placeholder="Không thuộc nhóm nào" />
                </SelectTrigger>
                <SelectContent>
                  {/* Sử dụng NO_GROUP thay vì empty string */}
                  <SelectItem value={NO_GROUP}>Không thuộc nhóm nào</SelectItem>
                  {groups.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className={cn(
                            "w-3 h-3 rounded-full",
                            g.color
                          )}
                        />
                        {g.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Thêm chi tiết nếu cần..."
                disabled={isCreating}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isCreating}>
                {isCreating ? "Đang tạo..." : "Tạo"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel} 
                disabled={isCreating}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};