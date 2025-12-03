// pages/tasks/index.tsx
import React from 'react';
import TaskList from '@/components/tasks/TaskList';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TaskList />
    </div>
  );
}