import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { Column } from "@/types/kanban"; 

// Mock data
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    workspaceId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#3B82F6',
    members: ['user1', 'user2']
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'New mobile application development',
    workspaceId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#10B981',
    members: ['user1', 'user3']
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage',
    description: 'Create new homepage design',
    projectId: '1',
    status: 'todo',
    priority: 'high',
    position: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Develop Header Component',
    description: 'Implement responsive header',
    projectId: '1',
    status: 'in-progress',
    priority: 'medium',
    position: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockColumns: Column[] = [
  { id: 'todo', title: 'To Do', projectId: '1', position: 0, taskIds: ['1'] },
  { id: 'in-progress', title: 'In Progress', projectId: '1', position: 1, taskIds: ['2'] },
  { id: 'review', title: 'Review', projectId: '1', position: 2, taskIds: [] },
  { id: 'done', title: 'Done', projectId: '1', position: 3, taskIds: [] }
];