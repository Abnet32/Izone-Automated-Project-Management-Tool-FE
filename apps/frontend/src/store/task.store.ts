// import { create } from "zustand";
// import { Task } from "@/types/task";
// import { v4 as uuid } from "uuid";

// interface TaskState {
//   tasks: Task[];
//   createTask: (data: Partial<Task>) => void;
//   updateTask: (id: string, data: Partial<Task>) => void;
//   deleteTask: (id: string) => void;

//   addComment: (taskId: string, message: string, userId: string) => void;
//   toggleChecklist: (taskId: string, itemId: string) => void;
//   addChecklistItem: (taskId: string, title: string) => void;
// }

// export const useTaskStore = create<TaskState>((set) => ({
//   tasks: [],

//   createTask: (data) =>
//     set((state) => ({
//       tasks: [
//         ...state.tasks,
//         {
//           id: uuid(),
//           title: data.title || "",
//           boardId: data.boardId!,
//           listId: data.listId!,
//           description: "",
//           priority: "medium",
//           status: "todo",
//           assignedTo: [],
//           checklist: [],
//           comments: [],
//           ...data,
//         },
//       ],
//     })),

//   updateTask: (id, data) =>
//     set((state) => ({
//       tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
//     })),

//   deleteTask: (id) =>
//     set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

//   addComment: (taskId, message, userId) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               comments: [
//                 ...(task.comments || []),
//                 {
//                   id: uuid(),
//                   message,
//                   userId,
//                   createdAt: new Date().toISOString(),
//                 },
//               ],
//             }
//           : task
//       ),
//     })),

//   addChecklistItem: (taskId, title) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               checklist: [
//                 ...(task.checklist || []),
//                 { id: uuid(), title, completed: false },
//               ],
//             }
//           : task
//       ),
//     })),

//   toggleChecklist: (taskId, itemId) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               checklist: task.checklist?.map((c) =>
//                 c.id === itemId
//                   ? { ...c, completed: !c.completed }
//                   : c
//               ),
//             }
//           : task
//       ),
//     })),
// }));
