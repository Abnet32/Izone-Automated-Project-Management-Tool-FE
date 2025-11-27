'use client';
import { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCenter 
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { useKanban } from '@/hooks/useKanban';

interface KanbanBoardProps {
  projectId: string;
}

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' }
];

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { tasks, moveTask, createTask } = useKanban(projectId);
  const [activeTask, setActiveTask] = useState<any>(null);

  // ✅ CRITICAL: Sensors enable drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Mouse must move 5px to start drag
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    try {
      const tasksInNewStatus = tasks.filter(t => t.status === newStatus);
      await moveTask(taskId, newStatus, tasksInNewStatus.length);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>

      {/* ✅ CRITICAL: DndContext wrapper */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks.filter(task => task.status === column.id)}
              onTaskCreate={(title) => createTask({
                title,
                projectId,
                status: column.id as any,
                priority: 'medium',
                position: tasks.filter(t => t.status === column.id).length
              })}
            />
          ))}
        </div>

        {/* ✅ CRITICAL: Shows dragging preview */}
        <DragOverlay>
          {activeTask ? (
            <KanbanCard task={activeTask} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}