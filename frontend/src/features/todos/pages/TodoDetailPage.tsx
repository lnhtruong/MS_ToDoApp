import { Link, useParams } from "@tanstack/react-router";

import { ArrowLeft, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTodosQuery, useTodoQuery } from "@/features/todos/hooks/useTodosQuery";

export const TodoDetailPage = () => {
  const { id } = useParams({ from: "/todos/$id" });
  const { data: todo, isLoading } = useTodoQuery(id);
  const { toggleComplete, deleteTodo } = useTodosQuery();

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (!todo) return <div>Không tìm thấy</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {todo.completed ? (
              <CheckCircle2 className="h-8 w-8 text-primary mt-1" />
            ) : (
              <Circle className="h-8 w-8 text-muted-foreground mt-1" />
            )}
            <div>
              <CardTitle className={`text-3xl ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                {todo.title}
              </CardTitle>
              <Badge variant={todo.completed ? "secondary" : "default"} className="mt-3">
                {todo.completed ? "Đã hoàn thành" : "Đang làm"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {todo.description && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-foreground/80">{todo.description}</p>
            </div>
          )}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => toggleComplete({ id: todo.id, completed: !todo.completed })}
              variant={todo.completed ? "outline" : "default"}
              className="flex-1"
            >
              {todo.completed ? "Bỏ hoàn thành" : "Hoàn thành"}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteTodo(todo.id).then(() => window.history.back())}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};