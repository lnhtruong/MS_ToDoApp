import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CheckCircle2, Circle, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { TodoDetailDialog } from "./TodoDetailDialog";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [open, setOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: todo.id,
    // Disable dragging nếu todo đã completed (tùy chọn)
    // disabled: todo.completed,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onToggle(todo.id, !todo.completed);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Bạn có chắc muốn xóa việc "${todo.title}"?`)) {
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error("Lỗi khi xóa việc:", error);
        alert("Không thể xóa việc. Vui lòng thử lại.");
      }
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "group flex items-center gap-3 p-4 rounded-lg bg-card border transition-all cursor-pointer",
          isDragging && "shadow-lg z-50 ring-2 ring-primary",
          !isDragging && "hover:shadow-md"
        )}
        onClick={() => setOpen(true)}
      >
        {/* Drag handle - chỉ hiện khi hover */}
        <button
          {...attributes}
          {...listeners}
          className={cn(
            "cursor-grab active:cursor-grabbing touch-none",
            "opacity-0 group-hover:opacity-100 transition-opacity"
          )}
          onClick={(e) => e.stopPropagation()}
          aria-label="Kéo để sắp xếp"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Checkbox */}
        <button onClick={handleToggle} className="flex-shrink-0">
          {todo.completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-lg font-medium",
            todo.completed && "line-through text-muted-foreground"
          )}>
            {todo.title}
          </p>
          {todo.description && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1 line-clamp-2",
              todo.completed && "opacity-50"
            )}>
              {todo.description}
            </p>
          )}
        </div>

        {/* Delete button */}
        <Button
          size="icon"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Detail Dialog */}
      <TodoDetailDialog todo={todo} open={open} onOpenChange={setOpen} />
    </>
  );
}