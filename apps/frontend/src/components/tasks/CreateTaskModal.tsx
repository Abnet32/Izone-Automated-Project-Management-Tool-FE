
import React, { useState } from 'react';
import { useStore, Task } from '@/store/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ isOpen, onClose }: Props) {
  const { addTask, projects, user } = useStore();
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'p1');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; 

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      projectId,
      assigneeId: user?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addTask(newTask);
    
    // Reset state and close
    setTitle('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-blue-600">Add New Task</h2>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Task Title (e.g., Fix homepage bug)" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as Task['status'])} className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg"/>
        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Create Task</button>
        </div>
      </form>
    </div>
  );
}



// // // components/tasks/CreateTaskModal.tsx
// // import React, { useState } from 'react';
// // import { useStore } from '../../store/useStore';
// // import { Task, CreateTaskData } from '../../types/task';

// // interface CreateTaskModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// // }

// // export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
// //   const { addTask, projects, user } = useStore();
// //   const [formData, setFormData] = useState<CreateTaskData>({
// //     title: '',
// //     description: '',
// //     status: 'todo',
// //     priority: 'medium',
// //     dueDate: '',
// //     projectId: '',
// //   });

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!formData.title.trim() || !formData.projectId) {
// //       alert('Please fill in required fields');
// //       return;
// //     }

// //     const newTask: Task = {
// //       id: Date.now().toString(),
// //       title: formData.title,
// //       description: formData.description,
// //       status: formData.status,
// //       priority: formData.priority,
// //       dueDate: formData.dueDate || undefined,
// //       projectId: formData.projectId,
// //       assigneeId: user?.id,
// //       createdAt: new Date().toISOString(),
// //       updatedAt: new Date().toISOString(),
// //     };

// //     addTask(newTask);
    
// //     // Reset form
// //     setFormData({
// //       title: '',
// //       description: '',
// //       status: 'todo',
// //       priority: 'medium',
// //       dueDate: '',
// //       projectId: '',
// //     });
    
// //     onClose();
// //   };

// //   const handleChange = (field: keyof CreateTaskData, value: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="p-6">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-xl font-bold">Create New Task</h2>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //             >
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             {/* Title */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Task Title *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.title}
// //                 onChange={(e) => handleChange('title', e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter task title"
// //               />
// //             </div>

// //             {/* Description */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Description
// //               </label>
// //               <textarea
// //                 value={formData.description}
// //                 onChange={(e) => handleChange('description', e.target.value)}
// //                 rows={4}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Task description (optional)"
// //               />
// //             </div>

// //             {/* Project & Status */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Project *
// //                 </label>
// //                 <select
// //                   required
// //                   value={formData.projectId}
// //                   onChange={(e) => handleChange('projectId', e.target.value)}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="">Select a project</option>
// //                   {projects.filter(p => p.status === 'active').map(project => (
// //                     <option key={project.id} value={project.id}>
// //                       {project.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Status
// //                 </label>
// //                 <select
// //                   value={formData.status}
// //                   onChange={(e) => handleChange('status', e.target.value)}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="todo">To Do</option>
// //                   <option value="in-progress">In Progress</option>
// //                   <option value="review">Review</option>
// //                   <option value="done">Done</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Priority & Due Date */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Priority
// //                 </label>
// //                 <select
// //                   value={formData.priority}
// //                   onChange={(e) => handleChange('priority', e.target.value)}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="low">Low</option>
// //                   <option value="medium">Medium</option>
// //                   <option value="high">High</option>
// //                   <option value="urgent">Urgent</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Due Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={formData.dueDate}
// //                   onChange={(e) => handleChange('dueDate', e.target.value)}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex justify-end space-x-3 pt-6 border-t">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //               >
// //                 Create Task
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // components/tasks/CreateTaskModal.tsx
// import React, { useState } from 'react';
// import { useStore } from '../../store';
// import { Task } from '../../types';

// interface CreateTaskModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
//   const { addTask, projects, user } = useStore();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'todo' as Task['status'],
//     priority: 'medium' as Task['priority'],
//     dueDate: '',
//     projectId: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const newTask: Task = {
//       id: Date.now().toString(),
//       title: formData.title,
//       description: formData.description,
//       status: formData.status,
//       priority: formData.priority,
//       dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
//       projectId: formData.projectId,
//       assigneeId: user?.id,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     addTask(newTask);
//     setFormData({
//       title: '',
//       description: '',
//       status: 'todo',
//       priority: 'medium',
//       dueDate: '',
//       projectId: '',
//     });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">Create New Task</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Title *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter task title"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Task description (optional)"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Project *
//                 </label>
//                 <select
//                   required
//                   value={formData.projectId}
//                   onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select a project</option>
//                   {projects.filter(p => p.status === 'active').map(project => (
//                     <option key={project.id} value={project.id}>{project.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="todo">To Do</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="review">Review</option>
//                   <option value="done">Done</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Priority
//                 </label>
//                 <select
//                   value={formData.priority}
//                   onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                   <option value="urgent">Urgent</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Due Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formData.dueDate}
//                   onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Create Task
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }