import { useCallback } from 'react';
import { useWorkspaceStore } from '@/store/workspace.store';
import { CreateWorkspaceData, UpdateWorkspaceData } from '@/types/workspace';

export const useWorkspace = () => {
  const store = useWorkspaceStore();

  const loadWorkspaces = useCallback(async () => {
    await store.fetchWorkspaces();
  }, [store.fetchWorkspaces]);

  const loadWorkspaceById = useCallback(async (id: string) => {
    await store.fetchWorkspaceById(id);
  }, [store.fetchWorkspaceById]);

  const addWorkspace = useCallback(async (data: CreateWorkspaceData) => {
    return await store.createWorkspace(data);
  }, [store.createWorkspace]);

  const editWorkspace = useCallback(async (id: string, data: UpdateWorkspaceData) => {
    await store.updateWorkspace(id, data);
  }, [store.updateWorkspace]);

  const removeWorkspace = useCallback(async (id: string) => {
    await store.deleteWorkspace(id);
  }, [store.deleteWorkspace]);

  // ✅ Add selectWorkspace to the hook return
  const selectWorkspace = useCallback((id: string) => {
    store.selectWorkspace(id);
  }, [store.selectWorkspace]);

  return {
    // State
    workspaces: store.workspaces,
    currentWorkspace: store.currentWorkspace,
    selectedWorkspaceId: store.selectedWorkspaceId,
    selectedWorkspace: store.getSelectedWorkspace(),
    isLoading: store.isLoading,
    error: store.error,
    
    // Actions
    loadWorkspaces,
    loadWorkspaceById,
    addWorkspace,
    editWorkspace,
    removeWorkspace,
    selectWorkspace, // ✅ Now available
    setCurrentWorkspace: store.setCurrentWorkspace,
    clearError: store.clearError,
    
    // Derived state
    hasWorkspaces: store.workspaces.length > 0,
  };
};




