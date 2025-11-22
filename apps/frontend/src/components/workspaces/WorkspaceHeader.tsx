'use client';

import { useState } from 'react';
import { Workspace } from '@/types';

interface WorkspaceHeaderProps {
  workspace: Workspace;
  onUpdateWorkspace: (workspaceId: string, updates: Partial<Workspace>) => void;
}

export function WorkspaceHeader({ workspace, onUpdateWorkspace }: WorkspaceHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(workspace.name);
  const [workspaceDescription, setWorkspaceDescription] = useState(workspace.description || '');

  const handleSave = () => {
    if (workspaceName.trim() && onUpdateWorkspace) {
      onUpdateWorkspace(workspace.id, {
        name: workspaceName.trim(),
        description: workspaceDescription.trim() || undefined,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setWorkspaceName(workspace.name);
    setWorkspaceDescription(workspace.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1 w-full"
                placeholder="Workspace name"
                autoFocus
              />
              <textarea
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                className="text-gray-600 border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none w-full resize-none"
                placeholder="Add workspace description..."
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
                  title="Edit workspace"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              {workspace.description && (
                <p className="text-gray-600 text-lg">{workspace.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>{workspace.members.length} members</span>
                <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Board
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}