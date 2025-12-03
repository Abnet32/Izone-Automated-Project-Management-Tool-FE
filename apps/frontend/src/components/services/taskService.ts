import { Task } from '@/types/task';
import { CreateTaskData } from '@/types/task';
import { UpdateTaskData } from '@/types/task';
import { mockTasks } from './mockData';

export const taskService = {
  // Get tasks for project
  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockTasks.filter(task => task.projectId === projectId)
                    .sort((a, b) => a.position - b.position);
  },

  // Get single task
  getTask: async (taskId: string): Promise<Task | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTasks.find(task => task.id === taskId) || null;
  },

  // Create task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasksInStatus = mockTasks.filter(t => t.status === data.status);
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...data,
      position: tasksInStatus.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return newTask;
  },

  // Update task
  updateTask: async (taskId: string, data: UpdateTaskData): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockTasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = {
      ...mockTasks[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockTasks[index];
  },

  // Delete task
  deleteTask: async (taskId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockTasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    mockTasks.splice(index, 1);
  }
};