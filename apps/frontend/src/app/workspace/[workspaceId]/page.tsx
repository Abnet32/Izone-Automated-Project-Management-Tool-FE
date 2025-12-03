// src/app/workspace/[workspaceId]/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  
  // SOLUTION: Get store data once and compute locally
  const storeWorkspaces = useAppStore((state) => state.workspaces);
  const storeBoards = useAppStore((state) => state.boards);
  const createBoard = useAppStore((state) => state.createBoard);
  
  // Compute derived values locally (NO store selectors)
  const workspace = useMemo(() => 
    storeWorkspaces.find((w) => w.id === workspaceId),
    [storeWorkspaces, workspaceId]
  );
  
  const workspaceBoards = useMemo(() => 
    storeBoards.filter((b) => b.workspaceId === workspaceId),
    [storeBoards, workspaceId]
  );
  
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [boardName, setBoardName] = useState('');

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardName.trim() || !workspace) return;
    
    createBoard({
      name: boardName.trim(),
      workspaceId: workspace.id,
    });
    
    setBoardName('');
    setShowCreateBoard(false);
  };

  if (!workspace) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Workspace not found</h1>
          <p>The workspace you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Workspace Header */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: workspace.color }}
            />
            <div>
              <h1 className="text-2xl font-bold">{workspace.name}</h1>
              {workspace.description && (
                <p className="text-gray-600">{workspace.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Boards Section */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Boards</h2>
            <button
              onClick={() => setShowCreateBoard(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              + Create Board
            </button>
          </div>

          {/* Create Board Form */}
          {showCreateBoard && (
            <form onSubmit={handleCreateBoard} className="mb-6 p-4 bg-gray-100 rounded">
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Board name"
                className="w-full p-2 border rounded mb-3"
                autoFocus
              />
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateBoard(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Boards List */}
          {workspaceBoards.length === 0 ? (
            <p className="text-gray-600">No boards yet. Create your first board.</p>
          ) : (
            <div className="space-y-3">
              {workspaceBoards.map((board) => (
                <div
                  key={board.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/board/${board.id}`)}
                >
                  <h3 className="font-semibold">{board.name}</h3>
                  <p className="text-sm text-gray-500">
                    Created {new Date(board.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}








