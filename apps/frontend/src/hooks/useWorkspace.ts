import { useState, useEffect } from 'react';
import { Workspace, WorkspaceWithBoards, CreateWorkspaceData, UpdateWorkspaceData } from '@/types/workspace';
import { mockWorkspaces, mockBoards } from '@/lib/mockData';

export function useWorkspace(workspaceId?: string) {
  const [workspace, setWorkspace] = useState<WorkspaceWithBoards | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workspaceId) {
      loadWorkspace(workspaceId);
    } else {
      loadWorkspaces();
    }
  }, [workspaceId]);

  const loadWorkspace = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundWorkspace = mockWorkspaces.find(ws => ws.id === id);
      if (!foundWorkspace) {
        throw new Error('Workspace not found');
      }

      const workspaceBoards = mockBoards.filter(board => board.workspaceId === id);

      setWorkspace({
        ...foundWorkspace,
        boards: workspaceBoards
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workspace');
    } finally {
      setIsLoading(false);
    }
  };

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setWorkspaces(mockWorkspaces);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workspaces');
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (data: CreateWorkspaceData): Promise<Workspace> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newWorkspace: Workspace = {
      id: `ws-${Date.now()}`,
      ...data,
      ownerId: 'user-1', // In real app, this would be the current user
      members: ['user-1'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setWorkspaces(prev => [...prev, newWorkspace]);
    return newWorkspace;
  };

  const updateWorkspace = async (id: string, data: UpdateWorkspaceData): Promise<Workspace> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedWorkspace: Workspace = {
      ...mockWorkspaces.find(ws => ws.id === id)!,
      ...data,
      updatedAt: new Date(),
    };

    setWorkspaces(prev => prev.map(ws => ws.id === id ? updatedWorkspace : ws));
    if (workspace?.id === id) {
      setWorkspace(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    }

    return updatedWorkspace;
  };

  const deleteWorkspace = async (id: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setWorkspaces(prev => prev.filter(ws => ws.id !== id));
    if (workspace?.id === id) {
      setWorkspace(null);
    }
  };

  return {
    workspace,
    workspaces,
    isLoading,
    error,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    refetch: workspaceId ? () => loadWorkspace(workspaceId) : loadWorkspaces,
  };
}