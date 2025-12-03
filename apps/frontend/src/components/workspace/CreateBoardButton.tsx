// src/components/workspace/CreateBoardButton.tsx
'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';

interface CreateBoardButtonProps {
  workspaceId: string;
}

export default function CreateBoardButton({ workspaceId }: CreateBoardButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const createBoard = useAppStore((state) => state.createBoard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardName.trim()) return;

    createBoard({
      name: boardName.trim(),
      workspaceId,
    });

    setBoardName('');
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Board name"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Board
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsCreating(true)}
      className="w-full h-full min-h-[140px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600 hover:border-blue-400 transition-colors"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span className="font-medium">Create New Board</span>
    </button>
  );
}