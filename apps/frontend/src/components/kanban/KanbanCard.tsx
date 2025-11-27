'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
}

interface KanbanCardProps {
  task: Task;
}

export function KanbanCard({ task }: KanbanCardProps) {
  // ✅ CRITICAL: This makes the card draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800', 
    high: 'bg-red-100 text-red-800'
  };

  return (
    // ✅ CRITICAL: All these props must be on the div
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg border border-gray-200 p-4 
        cursor-grab active:cursor-grabbing
        shadow-sm hover:shadow-md
        transition-all duration-200
        ${isDragging ? 'opacity-50 rotate-3 shadow-lg' : ''}
      `}
    >
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
      
      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-xs ${priorityColors[task.priority] || 'bg-gray-100'}`}>
          {task.priority}
        </span>
        <span className="text-xs text-gray-500 capitalize">
          {task.status}
        </span>
      </div>
    </div>
  );
}