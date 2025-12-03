import { useState } from "react";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useGroupsQuery } from "../hooks/useGroupsQuery";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(colors[4]); // emerald-500
  const { createGroup, isCreating } = useGroupsQuery();

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await createGroup({ name: name.trim(), color });
    setName("");
    setColor(colors[4]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nhóm mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo nhóm mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên nhóm</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Học tập, Công việc, Cá nhân..."
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label>Chọn màu</Label>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "w-12 h-12 rounded-full transition-all ring-offset-2",
                    c,
                    color === c && "ring-4 ring-primary"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={isCreating || !name.trim()}>
              {isCreating ? "Đang tạo..." : "Tạo nhóm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}