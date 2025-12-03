// src/components/workspace/CreateWorkspaceButton.tsx
'use client';

import { useState } from 'react';
import CreateWorkspaceModal from './CreateWorkspaceModal';

export default function CreateWorkspaceButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          className="w-5 h-5"
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
        Create Workspace
      </button>

      {isModalOpen && (
        <CreateWorkspaceModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}