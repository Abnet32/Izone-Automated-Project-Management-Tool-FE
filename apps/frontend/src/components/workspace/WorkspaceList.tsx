'use client';

import React, { useEffect } from 'react';
import { WorkspaceCard } from './WorkspaceCard';
import { WorkspaceEmpty } from './WorkspaceEmpty';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Plus, Loader2 } from 'lucide-react';

interface WorkspaceListProps {
  onCreateClick?: () => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({ onCreateClick }) => {
  const { workspaces, isLoading, error, loadWorkspaces, removeWorkspace, hasWorkspaces } = useWorkspace();

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      await removeWorkspace(id);
    }
  };

  if (isLoading && !hasWorkspaces) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
        <p>Error: {error}</p>
        <button 
          onClick={() => loadWorkspaces()} 
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!hasWorkspaces) {
    return <WorkspaceEmpty onCreateClick={onCreateClick} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Your Workspaces</h2>
          <p className="text-gray-600 text-sm mt-1">
            {workspaces.length} workspace{workspaces.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};