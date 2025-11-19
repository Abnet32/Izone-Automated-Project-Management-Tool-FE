'use client';

import { Column as ColumnType } from '@/lib/types/kanban';
import { TaskCard } from './task-card';
import { Plus } from 'lucide-react';

interface ColumnProps {
  column: ColumnType;
  onTaskMove: (taskId: string, newStatus: ColumnType['type']) => void;
}

export function Column({ column, onTaskMove }: ColumnProps) {
  const getColumnColor = (type: ColumnType['type']) => {
    switch (type) {
      case 'backlog': return 'bg-gray-100 border-gray-300';
      case 'todo': return 'bg-blue-50 border-blue-200';
      case 'inProgress': return 'bg-yellow-50 border-yellow-200';
      case 'review': return 'bg-purple-50 border-purple-200';
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
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Column Tasks */}
      <div className="bg-gray-100 p-3 rounded-b-lg space-y-3 min-h-96">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(newStatus) => onTaskMove(task.id, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}