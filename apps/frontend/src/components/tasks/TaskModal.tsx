
'use client';

import React, { useState, useEffect } from 'react';
import { Task, useStore } from '@/store/store';

interface Props {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ task, isOpen, onClose }: Props) {
  const { updateTask, deleteTask, projects } = useStore();
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [projectId, setProjectId] = useState(task.projectId);
  // Format the date string to YYYY-MM-DD for the input type="date"
  const [dueDate, setDueDate] = useState(task.dueDate?.split('T')[0] || '');

  // Sync internal state when the external task object changes (important when editing tasks)
  useEffect(() => {
    if (isOpen) {
        setTitle(task.title);
        setStatus(task.status);
        setPriority(task.priority);
        setProjectId(task.projectId);
        setDueDate(task.dueDate?.split('T')[0] || '');
    }
  }, [task, isOpen]);

  const handleSave = () => {
    updateTask(task.id, { 
        title, 
        status, 
        priority, 
        projectId, 
        // Only update dueDate if it has a value
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, 
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
        deleteTask(task.id);
        onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800">Edit Task: {task.id}</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg"/>
        
        <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full p-3 border rounded-lg">
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        
        <select value={status} onChange={e => setStatus(e.target.value as Task['status'])} className="w-full p-3 border rounded-lg">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        
        <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} className="w-full p-3 border rounded-lg">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-3 border rounded-lg"/>
        
        <div className="flex justify-between pt-4">
          <button onClick={handleDelete} className="px-5 py-2 border rounded-lg text-red-600 hover:bg-red-50 transition">🗑️ Delete</button>
          <div className="space-x-3">
            <button onClick={onClose} className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">💾 Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}



// // // components/tasks/TaskModal.tsx
// // import React, { useState, useEffect } from 'react';
// // import { useStore } from '../../store';
// // import { Task } from '../../types';

// // interface TaskModalProps {
// //   task: Task;
// //   isOpen: boolean;
// //   onClose: () => void;
// // }

// // export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
// //   const { updateTask, deleteTask, projects } = useStore();
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     status: 'todo' as Task['status'],
// //     priority: 'medium' as Task['priority'],
// //     dueDate: '',
// //     projectId: '',
// //   });

// //   useEffect(() => {
// //     if (task) {
// //       setFormData({
// //         title: task.title,
// //         description: task.description || '',
// //         status: task.status,
// //         priority: task.priority,
// //         dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
// //         projectId: task.projectId,
// //       });
// //     }
// //   }, [task]);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     const updatedTask = {
// //       ...formData,
// //       dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
// //     };

// //     updateTask(task.id, updatedTask);
// //     onClose();
// //   };

// //   const handleDelete = () => {
// //     if (window.confirm('Are you sure you want to delete this task?')) {
// //       deleteTask(task.id);
// //       onClose();
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="p-6">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-xl font-bold">Edit Task</h2>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-gray-100 rounded-lg"
// //             >
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Task Title *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.title}
// //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter task title"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Description
// //               </label>
// //               <textarea
// //                 value={formData.description}
// //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                 rows={4}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Task description"
// //               />
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Project
// //                 </label>
// //                 <select
// //                   required
// //                   value={formData.projectId}
// //                   onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="">Select a project</option>
// //                   {projects.map(project => (
// //                     <option key={project.id} value={project.id}>{project.name}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Status
// //                 </label>
// //                 <select
// //                   value={formData.status}
// //                   onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="todo">To Do</option>
// //                   <option value="in-progress">In Progress</option>
// //                   <option value="review">Review</option>
// //                   <option value="done">Done</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Priority
// //                 </label>
// //                 <select
// //                   value={formData.priority}
// //                   onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
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
// //                   onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex justify-between pt-6 border-t">
// //               <button
// //                 type="button"
// //                 onClick={handleDelete}
// //                 className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
// //               >
// //                 Delete Task
// //               </button>
              
// //               <div className="flex space-x-3">
// //                 <button
// //                   type="button"
// //                   onClick={onClose}
// //                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //                 >
// //                   Update Task
// //                 </button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }