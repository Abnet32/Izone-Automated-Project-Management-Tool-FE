// components/tasks/TaskCard.tsx
import React, { useState } from 'react';
import { useStore } from '../../store';
import { Task } from '../../types';
import TaskModal from './TaskModal';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { projects, updateTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const project = projects.find(p => p.id === task.projectId);
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date() && task.status !== 'done';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 
              className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
              className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {project && (
              <span 
                className="px-2 py-1 text-xs rounded-md text-white font-medium"
                style={{ backgroundColor: project.color }}
              >
                {project.name}
              </span>
            )}
            
            <span className={`flex items-center ${getPriorityColor(task.priority)}`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {task.priority}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {dueDate && (
              <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                Due: {dueDate.toLocaleDateString()}
              </span>
            )}
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <TaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}