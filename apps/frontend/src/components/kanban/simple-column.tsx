'use client';

import { Column as ColumnType, Task } from '@/lib/types/kanban';
import { SimpleTaskCard } from './simple-task-card';
import { TaskCreator } from './task-creator';

interface SimpleColumnProps {
  column: ColumnType;
  onTaskMove: (taskId: string, newColumnId: string) => void;
  onTaskCreate: (taskData: { title: string; description?: string }, columnId: string) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
}

export function SimpleColumn({ 
  column, 
  onTaskMove, 
  onTaskCreate, 
  onTaskUpdate, 
  onTaskDelete 
}: SimpleColumnProps) {

  const handleTaskCreate = (taskData: { title: string; description?: string }) => {
    onTaskCreate(taskData, column.id);
  };

  const getColumnColor = (type: ColumnType['type']) => {
    switch (type) {
      case 'todo': return 'bg-blue-50 border-blue-200';
      case 'inProgress': return 'bg-yellow-50 border-yellow-200';
      case 'done': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`flex items-center justify-between p-4 rounded-t-lg border ${getColumnColor(column.type)}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{column.name}</h3>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="bg-gray-100 rounded-b-lg min-h-96 flex flex-col">
        {/* Task Cards */}
        <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-250px)]">
          {column.tasks.map((task) => (
            <SimpleTaskCard
              key={task.id}
              task={task}
              onUpdate={(updates) => onTaskUpdate(task.id, updates)}
              onDelete={() => onTaskDelete(task.id)}
            />
          ))}
        </div>

        {/* Task Creator */}
        <div className="p-3 pt-0">
          <TaskCreator
            columnId={column.id}
            onSubmit={handleTaskCreate}
          />
        </div>
      </div>
    </div>
  );
}
