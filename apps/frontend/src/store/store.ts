// store/store.ts
import { create } from 'zustand';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'archived';
}

export interface User {
  id: string;
  name: string;
}

interface Store {
  tasks: Task[];
  projects: Project[];
  user: User | null;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  // Initialize with some seed data for testing
  tasks: [
    {
      id: 't1', title: 'Implement Zustand Store', status: 'done', priority: 'high',
      projectId: 'p1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
      id: 't2', title: 'Design Mobile Nav Bar', status: 'in-progress', priority: 'urgent',
      projectId: 'p2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
      id: 't3', title: 'Write Task Filtering Logic', status: 'todo', priority: 'medium',
      projectId: 'p1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
  ],
  projects: [
    { id: 'p1', name: 'Website Redesign', color: '#3b82f6', status: 'active' },
    { id: 'p2', name: 'Mobile App', color: '#f59e0b', status: 'active' },
  ],
  user: { id: 'u1', name: 'John Doe' },
  addTask: (task) => set({ tasks: [...get().tasks, task] }),
  updateTask: (taskId, updatedTask) =>
    set({
      tasks: get().tasks.map(t =>
        t.id === taskId ? { ...t, ...updatedTask, updatedAt: new Date().toISOString() } : t
      ),
    }),
  deleteTask: (taskId) =>
    set({ tasks: get().tasks.filter(t => t.id !== taskId) }),
}));