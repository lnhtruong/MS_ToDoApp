import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useTodosQuery } from "../hooks/useTodosQuery";
import { useGroupsQuery } from "../hooks/useGroupsQuery";
import type { Todo } from "../types";


interface TodoDetailDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Constant cho "không nhóm"
const NO_GROUP = "NO_GROUP";

export function TodoDetailDialog({ todo, open, onOpenChange }: TodoDetailDialogProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  // Convert null thành NO_GROUP để tránh empty string
  const [groupId, setGroupId] = useState(todo.groupId || NO_GROUP);
  const { updateTodo, isUpdating } = useTodosQuery();
  const { groups } = useGroupsQuery();

  // Update state khi todo thay đổi
  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setGroupId(todo.groupId || NO_GROUP);
  }, [todo]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Tiêu đề không được để trống");
      return;
    }

    try {
      await updateTodo({
        id: todo.id,
        title: title.trim(),
        description: description.trim() || null,
        // Convert NO_GROUP về null khi gửi lên backend
        groupId: groupId === NO_GROUP ? null : groupId,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Không thể cập nhật việc. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi tiết công việc</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiêu đề</label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUpdating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nhóm</label>
            <Select value={groupId} onValueChange={setGroupId} disabled={isUpdating}>
              <SelectTrigger>
                <SelectValue placeholder="Không nhóm" />
              </SelectTrigger>
              <SelectContent>
                {/* Sử dụng NO_GROUP thay vì empty string */}
                <SelectItem value={NO_GROUP}>Không nhóm</SelectItem>
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
            <label className="text-sm font-medium">Mô tả</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={5}
              placeholder="Thêm mô tả chi tiết..."
              disabled={isUpdating}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Hủy
            </Button>
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}