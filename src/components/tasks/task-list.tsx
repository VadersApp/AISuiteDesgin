"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

type TaskListProps = {
  title: string;
  tasks: string[];
};

export function TaskList({ title, tasks }: TaskListProps) {
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

  const handleCheckedChange = (task: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedTasks((prev) => [...prev, task]);
    } else {
      setCheckedTasks((prev) => prev.filter((t) => t !== task));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox
                id={`task-${title}-${index}`}
                onCheckedChange={(isChecked) => handleCheckedChange(task, !!isChecked)}
                checked={checkedTasks.includes(task)}
              />
              <label
                htmlFor={`task-${title}-${index}`}
                className={`flex-1 text-sm ${
                  checkedTasks.includes(task)
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {task}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
