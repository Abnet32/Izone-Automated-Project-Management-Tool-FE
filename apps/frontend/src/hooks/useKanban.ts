import { useTasks } from './useTasks';

export const useKanban = (projectId: string) => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks(projectId);

  const moveTask = async (taskId: string, newStatus: string, newPosition: number) => {
    try {
      await updateTask(taskId, { 
        status: newStatus as any,
        position: newPosition
      });
    } catch (error) {
      console.error('Failed to move task:', error);
      throw error;
    }
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  };
};