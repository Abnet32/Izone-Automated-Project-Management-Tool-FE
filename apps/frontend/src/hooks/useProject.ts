import { useState, useEffect } from 'react';
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';
import { projectService } from '@/components/services/projectService';

export const useProjects = (workspaceId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, [workspaceId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects(workspaceId);
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: CreateProjectData) => {
    try {
      const newProject = await projectService.createProject(data);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (projectId: string, data: UpdateProjectData) => {
    try {
      const updatedProject = await projectService.updateProject(projectId, data);
      setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const archiveProject = async (projectId: string) => {
    try {
      const archivedProject = await projectService.archiveProject(projectId);
      setProjects(prev => prev.map(p => p.id === projectId ? archivedProject : p));
      return archivedProject;
    } catch (err) {
      setError('Failed to archive project');
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    archiveProject,
    refetch: loadProjects
  };
};