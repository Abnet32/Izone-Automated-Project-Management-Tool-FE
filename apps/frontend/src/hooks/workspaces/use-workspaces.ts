'use client';

import { useState, useEffect } from 'react';

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Development Team',
    description: 'Software development projects',
    members: ['user-1', 'user-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
 
];

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkspaces = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setWorkspaces(mockWorkspaces);
      setIsLoading(false);
    };
    
    loadWorkspaces();
  }, []);

  const createWorkspace = async (workspaceData: { name: string; description?: string }): Promise<Workspace> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newWorkspace: Workspace = {
          id: `ws-${Date.now()}`,
          name: workspaceData.name,
          description: workspaceData.description,
          members: ['user-1'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setWorkspaces(prev => [...prev, newWorkspace]);
        resolve(newWorkspace);
      }, 500);
    });
  };

  return {
    workspaces,
    isLoading,
    createWorkspace,
  };
}






