"use client";

import { useAppStore } from "@/store/app.store";

export const useWorkspace = () => {
  const workspaces = useAppStore((state) => state.workspaces);
  const currentWorkspace = useAppStore((state) => state.currentWorkspace);
  const createWorkspace = useAppStore((state) => state.createWorkspace);
  const updateWorkspace = useAppStore((state) => state.updateWorkspace);
  const deleteWorkspace = useAppStore((state) => state.deleteWorkspace);
  const getWorkspace = useAppStore((state) => state.getWorkspace);
  const setCurrentWorkspace = useAppStore((state) => state.setCurrentWorkspace);
  const addWorkspaceMember = useAppStore((state) => state.addWorkspaceMember);
  const removeWorkspaceMember = useAppStore((state) => state.removeWorkspaceMember);

  return {
    workspaces,
    currentWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getWorkspace,
    setCurrentWorkspace,
    addWorkspaceMember,
    removeWorkspaceMember,
  };
};


