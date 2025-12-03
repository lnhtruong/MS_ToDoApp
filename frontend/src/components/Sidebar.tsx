import { cn } from "@/lib/utils";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGroupsQuery } from "@/features/todos/hooks/useGroupsQuery";
import { CreateGroupDialog } from "@/features/todos/components/CreateGroupDialog";

interface SidebarProps {
  selectedGroupId: string | null;
  onSelectGroup: (id: string | null) => void;
}

export function Sidebar({ selectedGroupId, onSelectGroup }: SidebarProps) {
  const { groups, deleteGroup } = useGroupsQuery();

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    if (confirm(`Xóa nhóm "${groupName}"? Các việc sẽ chuyển về "Không nhóm".`)) {
      try {
        await deleteGroup(groupId);
        if (selectedGroupId === groupId) {
          onSelectGroup(null);
        }
      } catch (error) {
        console.error("Lỗi khi xóa nhóm:", error);
        alert("Không thể xóa nhóm. Vui lòng thử lại.");
      }
    }
  };

  return (
    <aside className="w-72 border-r bg-muted/20 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Nhóm</h2>
        <CreateGroupDialog />
      </div>

      <div className="space-y-1">
        {/* Tất cả việc */}
        <button
          onClick={() => onSelectGroup(null)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left font-medium",
            !selectedGroupId && "bg-primary/10 text-primary"
          )}
        >
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span>Tất cả việc</span>
        </button>

        {/* Danh sách nhóm */}
        {groups.map((g) => (
          <div
            key={g.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg transition-all group cursor-pointer",
              selectedGroupId === g.id && "bg-primary/10 text-primary font-medium"
            )}
            onClick={() => onSelectGroup(g.id)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Icon 3 gạch với màu từ database (hex code) */}
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  g.color
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M2 4h12M2 8h12M2 12h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-medium truncate">{g.name}</span>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteGroup(g.id, g.name);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </aside>
  );
}