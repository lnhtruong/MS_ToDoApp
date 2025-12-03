import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates,verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCenter, DragOverlay } from "@dnd-kit/core";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTodosQuery } from "../hooks/useTodosQuery";
import { useGroupsQuery } from "../hooks/useGroupsQuery";
import { TodoItem } from "../components/TodoItem";
import { SearchFilterBar } from "../components/SearchFilterBar";
import { Sidebar } from "@/components/Sidebar";

export const TodoListPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { todos, isLoading, toggleComplete, deleteTodo, reorderTodos } = useTodosQuery();
  const { groups } = useGroupsQuery();

  // Filter todos
  const filteredTodos = todos
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => selectedGroupId === null || t.groupId === selectedGroupId)
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Configure sensors for drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Kéo ít nhất 8px mới kích hoạt drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = filteredTodos.findIndex((t) => t.id === active.id);
    const newIndex = filteredTodos.findIndex((t) => t.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Optimistic update - reorder immediately in UI
    const reorderedTodos = arrayMove(filteredTodos, oldIndex, newIndex);

    try {
      // Prepare payload với order mới
      const updates = reorderedTodos.map((todo, index) => ({
        id: todo.id,
        order: index,
      }));

      // Gửi lên backend
      await reorderTodos(updates);
    } catch (error) {
      console.error("Lỗi khi reorder todos:", error);
      // Query sẽ tự động refetch và restore về đúng thứ tự từ server
    }
  };

  // Handle drag cancel
  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleAddTodo = () => {
    navigate({ to: "/todos/new" });
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleComplete({ id, completed });
    } catch (error) {
      console.error("Lỗi khi toggle:", error);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Không thể xóa việc. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  const currentGroupName = selectedGroupId
    ? groups.find((g) => g.id === selectedGroupId)?.name
    : null;

  const activeTodo = activeId ? filteredTodos.find((t) => t.id === activeId) : null;

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedGroupId={selectedGroupId} onSelectGroup={setSelectedGroupId} />

      <div className="flex-1 container mx-auto py-8 px-6 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {currentGroupName ? `${currentGroupName}` : "Tất cả việc"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {filteredTodos.length} việc
              {filter !== "all" && ` · ${filter === "active" ? "Đang làm" : "Hoàn thành"}`}
            </p>
          </div>
          <Button size="lg" className="gap-2" onClick={handleAddTodo}>
            <Plus className="h-5 w-5" />
            Thêm việc
          </Button>
        </div>

        <SearchFilterBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        {filteredTodos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {search ? (
                `Không tìm thấy việc nào với từ khóa "${search}"`
              ) : currentGroupName ? (
                `Nhóm này chưa có việc được thêm`
              ) : (
                "Chưa có việc nào. Hãy tạo mới!"
              )}
            </p>
          </div>
        ) : (
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext 
              items={filteredTodos.map((t) => t.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>

            {/* DragOverlay để hiển thị item đang được kéo */}
            <DragOverlay>
              {activeTodo ? (
                <div className="opacity-90 shadow-2xl">
                  <TodoItem
                    todo={activeTodo}
                    onToggle={() => {}}
                    onDelete={() => {}}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
};