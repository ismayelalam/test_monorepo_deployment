'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput('');
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index]);
  };

  const saveEdit = () => {
    if (editingIndex === null || !editingValue.trim()) return;
    const updated = [...todos];
    updated[editingIndex] = editingValue;
    setTodos(updated);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-xl space-y-6">
        <CardHeader>
          <h1 className="text-center font-bold text-2xl">Todo App</h1>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a task"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="flex py-4 items-center gap-2">
                <Checkbox id={todo} className="size-5" />
                {editingIndex === index ? (
                  <Input
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                ) : (
                  <Label className="flex-1 truncate" htmlFor={todo}>
                    {todo}
                  </Label>
                )}

                <div className="flex gap-1">
                  {editingIndex === index ? (
                    <>
                      <Button onClick={saveEdit}>Save</Button>
                      <Button onClick={cancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => startEdit(index)}>
                        <Edit />
                      </Button>
                      <Button onClick={() => removeTodo(index)}>
                        <Trash />
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <p className="py-2 text-center text-muted-foreground">
              No tasks yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
