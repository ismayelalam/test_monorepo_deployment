'use client';

import { axiosCall } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { Label } from '@radix-ui/react-label';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export default function TodoItem({
  todo,
  refetch,
}: {
  todo: Todo;
  refetch: () => void;
}) {
  const [done, setDone] = useState<boolean>(todo.completed);

  const removeTodo = async () => {
    await axiosCall({
      method: 'delete',
      id: todo.id,
    });
    refetch();
  };
  const markDoneTodo = async (val: boolean) => {
    setDone(val);
    await axiosCall({
      method: 'patch',
      id: todo.id,
      data: { done: val },
    });
  };

  return (
    <li className="flex py-4 items-center gap-2">
      <Label
        className={cn(
          'flex-1 truncate flex gap-2 items-center',
          done && 'line-through'
        )}
      >
        <Checkbox
          className="size-5"
          checked={done}
          onCheckedChange={markDoneTodo}
        />
        <p>{todo.content}</p>
      </Label>

      <div className="flex gap-1">
        <Button onClick={removeTodo}>
          <Trash />
        </Button>
      </div>
    </li>
  );
}
