'use client';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
  };
  tasks: any[];
  onTaskCreate: (title: string) => void;
}

export function KanbanColumn({ column, tasks, onTaskCreate }: KanbanColumnProps) {
  // ✅ CRITICAL: Makes column a drop target
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onTaskCreate(newTaskTitle);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="w-80 bg-gray-50 rounded-lg flex-shrink-0">
      {/* Column Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            {column.title} <span className="text-gray-500">({tasks.length})</span>
          </h3>
        </div>
      </div>

      {/* ✅ CRITICAL: Tasks container with droppable ref */}
      <div 
        ref={setNodeRef}
        className="p-4 space-y-3 min-h-96"
      >
        {/* ✅ CRITICAL: SortableContext makes children draggable */}
        <SortableContext 
          items={tasks.map(t => t.id)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {/* Add Task Button */}
        {isAddingTask ? (
          <div className="bg-white p-3 rounded-lg shadow border">
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full p-2 border rounded mb-2 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTask();
                if (e.key === 'Escape') setIsAddingTask(false);
              }}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddTask} size="sm">
                Add Task
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingTask(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full p-3 text-left text-gray-500 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add a card
          </button>
        )}
      </div>
    </div>
  );
}