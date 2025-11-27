import { Project } from '@/types/project';
import { mockProjects } from './mockData';
import { CreateProjectData } from '@/types/project';
import { UpdateProjectData } from '@/types/project';
export const projectService = {
  // Get all projects for workspace
  getProjects: async (workspaceId: string): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProjects.filter(project => project.workspaceId === workspaceId);
  },

  // Get single project
  getProject: async (projectId: string): Promise<Project | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects.find(project => project.id === projectId) || null;
  },

  // Create project
  createProject: async (data: CreateProjectData): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...data,
      status: 'active',
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProjects.push(newProject);
    return newProject;
  },

  // Update project
  updateProject: async (projectId: string, data: UpdateProjectData): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockProjects.findIndex(p => p.id === projectId);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = {
      ...mockProjects[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockProjects[index];
  },

  // Archive project
  archiveProject: async (projectId: string): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockProjects.findIndex(p => p.id === projectId);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = {
      ...mockProjects[index],
      status: 'archived',
      updatedAt: new Date().toISOString()
    };
    
    return mockProjects[index];
  }
};