'use client';

import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { WorkspaceItem } from './WorkspaceItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { WorkspaceForm } from '@/components/workspace/WorkspaceForm'; 
import { useWorkspace } from '@/hooks/useWorkspace'; 

export const WorkspaceGroup = () => {
  const { workspaces, addWorkspace } = useWorkspace(); 
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateWorkspace = async (workspaceData: any) => {
    try {
      await addWorkspace(workspaceData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  const formattedWorkspaces = workspaces.map(workspace => ({
    id: workspace.id,
    name: workspace.name,
    icon: workspace.name.charAt(0).toUpperCase(),
    color: workspace.color || '#0079bf'
  }));

  return (
    <>
      <SidebarGroup>
        <div className="flex items-center justify-between px-2">
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <SidebarGroupContent>
          {formattedWorkspaces.map((workspace) => (
            <WorkspaceItem key={workspace.id} workspace={workspace} />
          ))}
        </SidebarGroupContent>
      </SidebarGroup>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <WorkspaceForm
              onSubmit={handleCreateWorkspace}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};




