'use client';

import { Task } from '@/lib/types/kanban';
import { MessageSquare, Paperclip, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStatusChange: (newStatus: Task['status']) => void;
}

export function TaskCard({ task }: TaskCardProps) {
  const getLabelColor = (type: Task['labels'][0]['type']) => {
    switch (type) {
      case 'design': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'research': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'writing': return 'bg-green-100 text-green-800 border-green-200';
      case 'documentation': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'content': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'planning': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex gap-1 mb-3">
          {task.labels.map((label) => (
            <span
              key={label.id}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getLabelColor(label.type)}`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Task Title */}
      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Task Meta - Exact match from your image */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          {/* Due Date */}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          {/* Comments */}
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>

        {/* Assignees */}
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee) => (
            <div 
              key={assignee.id} 
              className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
            >
              {assignee.name.split(' ').map(n => n[0]).join('')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}