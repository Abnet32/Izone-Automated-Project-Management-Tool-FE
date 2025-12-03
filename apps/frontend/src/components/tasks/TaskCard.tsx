"use client";

import { Task } from "@/types/task";

export default function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <div
      className="p-3 bg-white rounded shadow cursor-pointer border"
      onClick={onClick}
    >
      <p className="font-medium">{task.title}</p>

      <div className="flex justify-between mt-2">
        <span className="text-xs">{task.priority}</span>
        {task.dueDate && (
          <span className="text-xs text-gray-600">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}





// // components/tasks/TaskCard.tsx
// 'use client';

// import React, { useState } from 'react';
// import { Task, useStore } from '@/store/store';
// import TaskModal from './TaskModal';

// interface Props { task: Task; }

// // Helper function to get color for project tag
// const getProjectColor = (color: string) => {
//     return {
//         backgroundColor: `${color}1A`, // 10% opacity
//         color: color,
//     };
// };

// // Helper function to get class names for priority badge
// const getPriorityClasses = (priority: Task['priority']) => {
//     switch (priority) {
//         case 'urgent': return 'bg-red-100 text-red-800';
//         case 'high': return 'bg-orange-100 text-orange-800';
//         case 'medium': return 'bg-yellow-100 text-yellow-800';
//         case 'low': return 'bg-green-100 text-green-800';
//         default: return 'bg-gray-100 text-gray-800';
//     }
// };

// export default function TaskCard({ task }: Props) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { projects } = useStore();
//   const project = projects.find(p => p.id === task.projectId);

//   return (
//     <>
//       <div 
//         className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex justify-between items-center cursor-pointer border border-gray-100" 
//         onClick={() => setIsModalOpen(true)}
//       >
//         <div>
//           <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
//           <div className="flex space-x-3 text-xs mt-1">
//             {project && (
//               <span 
//                 className="px-2 py-0.5 rounded-full font-medium" 
//                 style={getProjectColor(project.color)}
//               >
//                 {project.name}
//               </span>
//             )}
//             <span className={`px-2 py-0.5 rounded-full font-medium ${getPriorityClasses(task.priority)} capitalize`}>
//                 {task.priority}
//             </span>
//           </div>
//         </div>
//         <span 
//           className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
//             task.status === 'done' ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-800'
//           }`}
//         >
//           {task.status}
//         </span>
//       </div>

//       <TaskModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </>
//   );
// }






// // import React, { useState } from 'react';
// // import { useStore } from '../../store';
// // import { Task } from '../../types';
// // import TaskModal from './TaskModal';

// // interface TaskCardProps {
// //   task: Task;
// // }

// // export default function TaskCard({ task }: TaskCardProps) {
// //   const { projects, updateTask } = useStore();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
  
// //   const project = projects.find(p => p.id === task.projectId);
// //   const dueDate = task.dueDate ? new Date(task.dueDate) : null;
// //   const isOverdue = dueDate && dueDate < new Date() && task.status !== 'done';

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case 'todo': return 'bg-gray-100 text-gray-800';
// //       case 'in-progress': return 'bg-blue-100 text-blue-800';
// //       case 'review': return 'bg-yellow-100 text-yellow-800';
// //       case 'done': return 'bg-green-100 text-green-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority) {
// //       case 'low': return 'text-green-600';
// //       case 'medium': return 'text-yellow-600';
// //       case 'high': return 'text-orange-600';
// //       case 'urgent': return 'text-red-600';
// //       default: return 'text-gray-600';
// //     }
// //   };

// //   const handleStatusChange = (newStatus: Task['status']) => {
// //     updateTask(task.id, { status: newStatus });
// //   };

// //   return (
// //     <>
// //       <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
// //         <div className="flex justify-between items-start mb-2">
// //           <div className="flex-1">
// //             <h3 
// //               className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
// //               onClick={() => setIsModalOpen(true)}
// //             >
// //               {task.title}
// //             </h3>
            
// //             {task.description && (
// //               <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
// //             )}
// //           </div>
          
// //           <div className="flex items-center space-x-2 ml-4">
// //             <select
// //               value={task.status}
// //               onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
// //               className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //             >
// //               <option value="todo">To Do</option>
// //               <option value="in-progress">In Progress</option>
// //               <option value="review">Review</option>
// //               <option value="done">Done</option>
// //             </select>
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-between text-sm">
// //           <div className="flex items-center space-x-4">
// //             {project && (
// //               <span 
// //                 className="px-2 py-1 text-xs rounded-md text-white font-medium"
// //                 style={{ backgroundColor: project.color }}
// //               >
// //                 {project.name}
// //               </span>
// //             )}
            
// //             <span className={`flex items-center ${getPriorityColor(task.priority)}`}>
// //               <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
// //               </svg>
// //               {task.priority}
// //             </span>
// //           </div>

// //           <div className="flex items-center space-x-4">
// //             {dueDate && (
// //               <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
// //                 Due: {dueDate.toLocaleDateString()}
// //               </span>
// //             )}
            
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// //             >
// //               Edit
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <TaskModal
// //         task={task}
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //       />
// //     </>
// //   );
// // }