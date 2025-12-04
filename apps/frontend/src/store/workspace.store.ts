import { create } from 'zustand';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '@/types/workspace';
import { workspaceAPI } from '@/lib/api/workspaces';

interface WorkspaceStore {
  // State
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  selectedWorkspaceId: string | null; // New: Track selected workspace ID
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchWorkspaces: () => Promise<void>;
  fetchWorkspaceById: (id: string) => Promise<void>;
  createWorkspace: (data: CreateWorkspaceData) => Promise<Workspace>;
  updateWorkspace: (id: string, data: UpdateWorkspaceData) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  
  // Selection actions
  selectWorkspace: (id: string) => void; // New: Select workspace by ID
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  clearError: () => void;
  
  // Getters
  getSelectedWorkspace: () => Workspace | undefined; // New: Get selected workspace
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  // Initial state
  workspaces: [],
  currentWorkspace: null,
  selectedWorkspaceId: null,
  isLoading: false,
  error: null,

  // Fetch all workspaces
  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const workspaces = await workspaceAPI.getAllWorkspaces();
      set({ workspaces, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch workspaces',
        isLoading: false 
      });
    }
  },

  // Fetch workspace by ID
  fetchWorkspaceById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const workspace = await workspaceAPI.getWorkspaceById(id);
      if (workspace) {
        set({ 
          currentWorkspace: workspace, 
          selectedWorkspaceId: id,
          isLoading: false 
        });
      } else {
        set({ error: 'Workspace not found', isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch workspace',
        isLoading: false 
      });
    }
  },

  // Create new workspace
  createWorkspace: async (data: CreateWorkspaceData) => {
    set({ isLoading: true, error: null });
    try {
      const newWorkspace = await workspaceAPI.createWorkspace(data);
      set(state => ({ 
        workspaces: [...state.workspaces, newWorkspace],
        selectedWorkspaceId: newWorkspace.id, // Auto-select newly created workspace
        isLoading: false 
      }));
      return newWorkspace;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create workspace',
        isLoading: false 
      });
      throw error;
    }
  },

  // Update existing workspace
  updateWorkspace: async (id: string, data: UpdateWorkspaceData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedWorkspace = await workspaceAPI.updateWorkspace(id, data);
      set(state => ({
        workspaces: state.workspaces.map(w => 
          w.id === id ? updatedWorkspace : w
        ),
        currentWorkspace: state.currentWorkspace?.id === id ? updatedWorkspace : state.currentWorkspace,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update workspace',
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete workspace
  deleteWorkspace: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await workspaceAPI.deleteWorkspace(id);
      set(state => ({
        workspaces: state.workspaces.filter(w => w.id !== id),
        currentWorkspace: state.currentWorkspace?.id === id ? null : state.currentWorkspace,
        selectedWorkspaceId: state.selectedWorkspaceId === id ? null : state.selectedWorkspaceId,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete workspace',
        isLoading: false 
      });
      throw error;
    }
  },

  // Select workspace by ID (NEW FUNCTION)
  selectWorkspace: (id: string) => {
    const { workspaces } = get();
    const selectedWorkspace = workspaces.find(w => w.id === id);
    
    set({ 
      selectedWorkspaceId: id,
      currentWorkspace: selectedWorkspace || null 
    });
  },

  // Set current workspace
  setCurrentWorkspace: (workspace: Workspace | null) => {
    set({ 
      currentWorkspace: workspace,
      selectedWorkspaceId: workspace?.id || null 
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Get selected workspace (helper)
  getSelectedWorkspace: () => {
    const { workspaces, selectedWorkspaceId } = get();
    return workspaces.find(w => w.id === selectedWorkspaceId);
  },
}));






