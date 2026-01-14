'use client';

import { NewTodo } from '@/components/templates/NewTodo';
import TodoItem from '@/components/templates/TodoItem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { axiosCall } from '@/lib/api';
import { Todo } from '@/types/todo';
import { useEffect, useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const getTodo = await axiosCall({
        method: 'get',
      });
      setTodos(getTodo);
    }
    fetchData();
  }, [refetch]);

  return (
    <div className="flex items-center justify-center h-screen bg-accent-foreground">
      <Card className="w-xl space-y-6">
        <CardHeader>
          <h1 className="text-center font-bold text-2xl">Todo App</h1>
        </CardHeader>
        <CardContent>
          <NewTodo refetch={() => setRefetch((v) => !v)} />

          <ul>
            {todos?.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                refetch={() => setRefetch((v) => !v)}
              />
            ))}
          </ul>

          {(!todos || todos.length === 0) && (
            <p className="py-2 text-center text-muted-foreground">
              No tasks yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
