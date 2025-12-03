// src/components/workspace/WorkspaceBoards.tsx
'use client';

import { useAppStore } from '@/stores/app.store';
import BoardCard from './BoardCard';
import CreateBoardButton from './CreateBoardButton';

interface WorkspaceBoardsProps {
  workspaceId: string;
}

export default function WorkspaceBoards({ workspaceId }: WorkspaceBoardsProps) {
  const boards = useAppStore((state) => state.getBoardsByWorkspace(workspaceId));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Boards</h2>
        <div className="text-sm text-gray-500">
          {boards.length} {boards.length === 1 ? 'board' : 'boards'}
        </div>
      </div>

      {boards.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No boards yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first board to start organizing tasks
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
          <CreateBoardButton workspaceId={workspaceId} />
        </div>
      )}
    </div>
  );
}