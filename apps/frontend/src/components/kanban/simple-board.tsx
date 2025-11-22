'use client';

import { SimpleColumn } from './simple-column';
import { useWorkspace } from '@/hooks/kanban/use-workspace';

export function SimpleBoard() {
  const { currentBoard, isLoading, createTask, moveTask, updateTask, deleteTask } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!currentBoard) {
    return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No board found. Please complete the onboarding.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 p-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        background: currentBoard.background.startsWith('#') 
          ? currentBoard.background 
          : `url(${currentBoard.background}) center/cover`
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
        {/* Board Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentBoard.name}</h1>
            <p className="text-gray-600">{currentBoard.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white">
                JD
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white">
                JS
              </div>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {currentBoard.columns.map((column) => (
            <SimpleColumn
              key={column.id}
              column={column}
              onTaskMove={moveTask}
              onTaskCreate={createTask}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}