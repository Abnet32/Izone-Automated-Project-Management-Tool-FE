// components/tasks/TaskList.tsx
'use client'; // Required for using hooks (useState, useStore)

import React, { useState } from 'react';
import { useStore } from '@/store/store';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';

export default function TaskList() {
  const { tasks, projects } = useStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({ project: 'all', status: 'all', priority: 'all' });

  const filteredTasks = tasks.filter(task => {
    if (filters.project !== 'all' && task.projectId !== filters.project) return false;
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Task Manager</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          ➕ New Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg border grid grid-cols-1 md:grid-cols-3 gap-4">
        <select 
          className="p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={filters.project} 
          onChange={e => setFilters({...filters, project: e.target.value})}
        >
          <option value="all">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select 
          className="p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={filters.status} 
          onChange={e => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select 
          className="p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={filters.priority} 
          onChange={e => setFilters({...filters, priority: e.target.value})}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
        {filteredTasks.length === 0 && <p className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-md">🎉 No tasks match the current filters.</p>}
      </div>

      <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}




// // components/tasks/TaskList.tsx
// import React, { useState } from 'react';
// import { useStore } from '../../store';
// import TaskCard from './TaskCard';
// import CreateTaskModal from './CreateTaskModal';

// export default function TaskList() {
//   const { tasks, projects } = useStore();
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     project: 'all',
//     status: 'all',
//     priority: 'all',
//   });

//   const filteredTasks = tasks.filter(task => {
//     if (filters.project !== 'all' && task.projectId !== filters.project) return false;
//     if (filters.status !== 'all' && task.status !== filters.status) return false;
//     if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
//     return true;
//   });

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
//           <p className="text-gray-600">Manage and track your tasks</p>
//         </div>
        
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           New Task
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
//             <select
//               value={filters.project}
//               onChange={(e) => setFilters({ ...filters, project: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Projects</option>
//               {projects.map(project => (
//                 <option key={project.id} value={project.id}>{project.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="review">Review</option>
//               <option value="done">Done</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//             <select
//               value={filters.priority}
//               onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Priority</option>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//               <option value="urgent">Urgent</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Tasks List */}
//       <div className="space-y-3">
//         {filteredTasks.map((task) => (
//           <TaskCard key={task.id} task={task} />
//         ))}
//       </div>

//       {filteredTasks.length === 0 && (
//         <div className="text-center py-12">
//           <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
//           <p className="mt-2 text-gray-500">
//             Get started by creating a new task.
//           </p>
//         </div>
//       )}

//       <CreateTaskModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       />
//     </div>
//   );
// }