'use client';

import { Column } from './column';
import { useKanban } from '@/hooks/kanban/use-kanban';

export function KanbanBoard() {
  const { columns, moveTask, addTask } = useKanban();

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Board Header - Exact match from your image */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            {/* <span className="text-lg"></span> */}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🔥Task</h1>
            {/* <p className="text-gray-600"></p> */}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Team Avatars - Exact match from your image */}
          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              JD
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              JS
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              MJ
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +6
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Columns - Exact match from your image */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onTaskMove={(taskId, newStatus) => moveTask(taskId, newStatus)}
            onTaskAdd={addTask}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

