import React from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import { useTodoActions } from "../hooks/useTodoActions";

export const TodoDetailPage: React.FC = () => {
  const { id } = useParams({ strict: false })
  const { getTodoById } = useTodos()
  const { toggleComplete, deleteTodo } = useTodoActions()
  
  const todo = getTodoById(id as string)

  if (!todo) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Không tìm thấy todo này</p>
            <Link to="/" className="mt-4 inline-block">
              <Button variant="outline">Quay lại trang chủ</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              {todo.completed ? (
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
              )}
              <div>
                <CardTitle className={`text-2xl ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                  {todo.title}
                </CardTitle>
                <Badge variant={todo.completed ? "secondary" : "default"} className="mt-2">
                  {todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {todo.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Mô tả</h3>
              <p className="text-base">{todo.description}</p>
            </div>
          )}

          <div className="pt-4 border-t flex gap-3">
            <Button 
              variant={todo.completed ? "outline" : "default"} 
              className="flex-1"
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.completed ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}
            </Button>
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            💡 Dữ liệu hiện đang hardcoded - sẽ kết nối API sau
          </p>
        </CardContent>
      </Card>
    </div>
  );
};