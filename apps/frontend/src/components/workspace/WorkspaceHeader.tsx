// src/components/workspace/WorkspaceHeader.tsx
'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';
import WorkspaceForm from './WorkspaceForm';

interface WorkspaceHeaderProps {
  workspaceId: string;
}

export default function WorkspaceHeader({ workspaceId }: WorkspaceHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const workspace = useAppStore((state) => state.getWorkspace(workspaceId));
  const updateWorkspace = useAppStore((state) => state.updateWorkspace);

  if (!workspace) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
    );
  }

  const handleUpdate = (data: any) => {
    updateWorkspace(workspaceId, data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <WorkspaceForm
          initialData={workspace}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitText="Save Changes"
        />
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: workspace.color }}
        >
          <span className="text-white font-bold text-lg">
            {workspace.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
          {workspace.description && (
            <p className="text-gray-600 mt-1">{workspace.description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Edit Workspace
      </button>
    </div>
  );
}