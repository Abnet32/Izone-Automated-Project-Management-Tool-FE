import { create } from 'zustand';
import { User, Project, Task } from '../types';

interface AppState {
  user: User | null;
  projects: Project[];
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
}

// Sample data for testing
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'active',
    color: '#3B82F6',
    members: ['1'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'New mobile application development',
    status: 'active',
    color: '#10B981',
    members: ['1'],
    createdAt: new Date().toISOString(),
  },
];

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Create homepage wireframes',
    description: 'Design initial wireframes for the new homepage layout',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set up development environment',
    description: 'Configure development environment for the project',
    status: 'todo',
    priority: 'medium',
    projectId: '2',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Review competitor analysis',
    description: 'Analyze competitor websites and features',
    status: 'done',
    priority: 'low',
    projectId: '1',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useStore = create<AppState>((set, get) => ({
  user: {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'admin',
  },
  projects: sampleProjects,
  tasks: sampleTasks,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  })),
}));