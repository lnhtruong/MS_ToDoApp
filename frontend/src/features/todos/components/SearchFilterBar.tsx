import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchFilterBar({
  search,
  setSearch,
  filter,
  setFilter,
}: {
  search: string;
  setSearch: (v: string) => void;
  filter: "all" | "active" | "completed";
  setFilter: (v: "all" | "active" | "completed") => void;
}) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm việc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
        Tất cả
      </Button>
      <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
        Đang làm
      </Button>
      <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
        Hoàn thành
      </Button>
    </div>
  );
}