import React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { useTodos } from "../hooks/useTodos";

export const TodoListPage: React.FC = () => {
  const { todos } = useTodos()

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Danh sách Todo</h1>
        <Link to="/todos/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tạo mới
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {todos.map(todo => (
          <Card key={todo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <Link 
                to="/todos/$id"
                params={{ id: todo.id }}
                className="flex items-center gap-3 group"
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={`text-base flex-1 group-hover:text-primary transition-colors ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}>
                  {todo.title}
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <Card className="mt-8">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Chưa có todo nào. Hãy tạo mới!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};