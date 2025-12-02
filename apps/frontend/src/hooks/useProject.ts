
import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
  };

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      isArchived: false
    };
    saveProjects([...projects, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    const updated = projects.map(proj =>
      proj.id === id ? { ...proj, ...updates } : proj
    );
    saveProjects(updated);
  };

  const archiveProject = (id) => {
    updateProject(id, { isArchived: true });
  };

  const restoreProject = (id) => {
    updateProject(id, { isArchived: false });
  };

  return {
    projects,
    createProject,
    updateProject,
    archiveProject,
    restoreProject
  };
};







// // hooks/useProjects.ts
// 'use client';

// import { useState, useCallback } from 'react';
// import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';
// import { useBoard } from './useBoard';

// export function useProjects() {
//   const { boards, createBoard, updateBoard, deleteBoard, isLoading, error } = useBoard();
  
//   // Convert boards to projects
//   const projects: Project[] = boards.map(board => ({
//     ...board,
//     status: 'active' as const,
//     members: [], // You might want to add member management
//     startDate: board.createdAt,
//     endDate: undefined
//   }));

//   const createProject = async (data: CreateProjectData): Promise<Project> => {
//     const board = await createBoard(data);
//     return {
//       ...board,
//       status: 'active',
//       members: [],
//       startDate: board.createdAt,
//       endDate: undefined
//     };
//   };

//   const updateProject = async (id: string, data: UpdateProjectData): Promise<Project> => {
//     const board = await updateBoard(id, data);
//     return {
//       ...board,
//       status: data.status || 'active',
//       members: [], // You'll need to handle members separately
//       startDate: board.createdAt,
//       endDate: data.endDate
//     };
//   };

//   const archiveProject = async (id: string): Promise<Project> => {
//     return await updateProject(id, { status: 'archived' });
//   };

//   const completeProject = async (id: string): Promise<Project> => {
//     return await updateProject(id, { status: 'completed' });
//   };

//   const deleteProject = async (id: string): Promise<void> => {
//     await deleteBoard(id);
//   };

//   return {
//     projects,
//     isLoading,
//     error,
//     createProject,
//     updateProject,
//     archiveProject,
//     completeProject,
//     deleteProject,
//   };
// }



// import { useState, useEffect } from 'react';
// import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';
// import { projectService } from '@/components/services/projectService';

// export const useProjects = (workspaceId: string) => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadProjects();
//   }, [workspaceId]);

//   const loadProjects = async () => {
//     try {
//       setLoading(true);
//       const data = await projectService.getProjects(workspaceId);
//       setProjects(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load projects');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createProject = async (data: CreateProjectData) => {
//     try {
//       const newProject = await projectService.createProject(data);
//       setProjects(prev => [...prev, newProject]);
//       return newProject;
//     } catch (err) {
//       setError('Failed to create project');
//       throw err;
//     }
//   };

//   const updateProject = async (projectId: string, data: UpdateProjectData) => {
//     try {
//       const updatedProject = await projectService.updateProject(projectId, data);
//       setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
//       return updatedProject;
//     } catch (err) {
//       setError('Failed to update project');
//       throw err;
//     }
//   };

//   const archiveProject = async (projectId: string) => {
//     try {
//       const archivedProject = await projectService.archiveProject(projectId);
//       setProjects(prev => prev.map(p => p.id === projectId ? archivedProject : p));
//       return archivedProject;
//     } catch (err) {
//       setError('Failed to archive project');
//       throw err;
//     }
//   };

//   return {
//     projects,
//     loading,
//     error,
//     createProject,
//     updateProject,
//     archiveProject,
//     refetch: loadProjects
//   };
// };