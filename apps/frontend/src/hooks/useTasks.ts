// import { useState, useEffect } from 'react';
// import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
// import { taskService } from '@/components/services/taskService';

// export const useTasks = (projectId: string) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (projectId) {
//       loadTasks();
//     }
//   }, [projectId]);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       const data = await taskService.getProjectTasks(projectId);
//       setTasks(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load tasks');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (data: CreateTaskData) => {
//     try {
//       const newTask = await taskService.createTask(data);
//       setTasks(prev => [...prev, newTask]);
//       return newTask;
//     } catch (err) {
//       setError('Failed to create task');
//       throw err;
//     }
//   };

//   const updateTask = async (taskId: string, data: UpdateTaskData) => {
//     try {
//       const updatedTask = await taskService.updateTask(taskId, data);
//       setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
//       return updatedTask;
//     } catch (err) {
//       setError('Failed to update task');
//       throw err;
//     }
//   };

//   const deleteTask = async (taskId: string) => {
//     try {
//       await taskService.deleteTask(taskId);
//       setTasks(prev => prev.filter(t => t.id !== taskId));
//     } catch (err) {
//       setError('Failed to delete task');
//       throw err;
//     }
//   };

//   return {
//     tasks,
//     loading,
//     error,
//     createTask,
//     updateTask,
//     deleteTask,
//     refetch: loadTasks
//   };
// };