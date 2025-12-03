// src/store/useAppStore.ts
import { create } from 'zustand';

export interface Board {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  color: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppStore {
  workspaces: Workspace[];
  boards: Board[];
  createWorkspace: (workspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>) => Workspace;
  createBoard: (board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => Board;
}

export const useAppStore = create<AppStore>((set) => ({
  workspaces: [],
  boards: [],
  
  createWorkspace: (workspaceData) => {
    const newWorkspace: Workspace = {
      ...workspaceData,
      id: `workspace-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
    return newWorkspace;
  },
  
  createBoard: (boardData) => {
    const newBoard: Board = {
      ...boardData,
      id: `board-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ boards: [...state.boards, newBoard] }));
    return newBoard;
  },
}));


