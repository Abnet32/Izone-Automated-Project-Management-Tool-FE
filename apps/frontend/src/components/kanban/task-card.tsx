'use client';

import { Task } from '@/lib/types/kanban';
import { MessageSquare, Paperclip, Calendar, Edit2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { CardSidebar } from './card-sidebar';

interface TaskCardProps {
  task: Task;
  onStatusChange: (newStatus: Task['status']) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

export function TaskCard({ task, onStatusChange, onTaskUpdate, onTaskDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showSidebar, setShowSidebar] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const getLabelColor = (type: Task['labels'][0]['type']) => {
    switch (type) {
      case 'design': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'research': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'writing': return 'bg-green-100 text-green-800 border-green-200';
      case 'documentation': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'content': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'planning': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onTaskUpdate({
        ...task,
        title: editedTitle.trim()
      });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(task.title);
    }
  };

  // Handle card click - opens sidebar (like Trello)
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open sidebar if we're editing the title
    if (isEditing) return;
    
    // Don't open sidebar if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('textarea')) {
      return;
    }
    
    setShowSidebar(true);
  };

  // Handle edit button click - enables inline editing (like Trello)
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedTitle(task.title);
  };

  return (
    <>
      {/* Main Task Card - CLICK OPENS SIDEBAR like Trello */}
      <div 
        className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
        onClick={handleCardClick}
      >
        {/* Edit Button - Appears on Hover like Trello */}
        <button
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-all"
          onClick={handleEditClick}
          title="Edit card title"
        >
          <Edit2 className="w-3 h-3" />
        </button>

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex gap-1 mb-2">
            {task.labels.map((label) => (
              <span
                key={label.id}
                className={`px-2 py-1 rounded text-xs font-medium border ${getLabelColor(label.type)}`}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        {/* Task Title - Editable like Trello */}
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="w-full p-1 border border-blue-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium"
            rows={Math.max(2, editedTitle.split('\n').length)}
            onClick={(e) => e.stopPropagation()} // Prevent card click when editing
          />
        ) : (
          <div className="font-medium text-gray-900 mb-2 text-sm leading-relaxed hover:bg-gray-50 rounded -mx-1 px-1 py-0.5">
            {task.title}
          </div>
        )}

        {/* Task Meta - Exactly like Trello */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-3">
            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}

            {/* Comments */}
            {task.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{task.comments}</span>
              </div>
            )}

            {/* Attachments */}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>

          {/* Assignees - Show on hover like Trello */}
          {task.assignees.length > 0 && (
            <div className="flex -space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
              {task.assignees.slice(0, 3).map((assignee) => (
                <div 
                  key={assignee.id} 
                  className="w-5 h-5 bg-blue-500 rounded-full border border-white flex items-center justify-center text-xs font-medium text-white"
                  title={assignee.name}
                >
                  {assignee.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              {task.assignees.length > 3 && (
                <div className="w-5 h-5 bg-gray-300 rounded-full border border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  +{task.assignees.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Sidebar - Exactly like Trello */}
      <CardSidebar
        task={task}
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete || (() => {})}
      />
    </>
  );
}

export default TaskCard;

// 'use client';

// import { Task } from '@/lib/types/kanban';
// import { MessageSquare, Paperclip, Calendar, Edit2 } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';

// interface TaskCardProps {
//   task: Task;
//   onStatusChange: (newStatus: Task['status']) => void;
//   onTaskUpdate: (updatedTask: Task) => void;
// }

// export function TaskCard({ task, onStatusChange, onTaskUpdate }: TaskCardProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(task.title);
//   const [showFullCard, setShowFullCard] = useState(false);
//   const [fullCardTitle, setFullCardTitle] = useState(task.title);
//   const [fullCardDescription, setFullCardDescription] = useState(task.description || '');
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (isEditing && textareaRef.current) {
//       textareaRef.current.focus();
//       textareaRef.current.select();
//     }
//   }, [isEditing]);

//   const getLabelColor = (type: Task['labels'][0]['type']) => {
//     switch (type) {
//       case 'design': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'research': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'writing': return 'bg-green-100 text-green-800 border-green-200';
//       case 'documentation': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'content': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'planning': return 'bg-pink-100 text-pink-800 border-pink-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const handleSave = () => {
//     if (editedTitle.trim() && editedTitle !== task.title) {
//       onTaskUpdate({
//         ...task,
//         title: editedTitle.trim()
//       });
//     }
//     setIsEditing(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSave();
//     } else if (e.key === 'Escape') {
//       setIsEditing(false);
//       setEditedTitle(task.title);
//     }
//   };

//   // Handle card click - opens full card modal (like Trello)
//   const handleCardClick = (e: React.MouseEvent) => {
//     // Don't open modal if we're editing the title
//     if (isEditing) return;
    
//     // Don't open modal if clicking on interactive elements
//     if ((e.target as HTMLElement).closest('button') || 
//         (e.target as HTMLElement).closest('textarea')) {
//       return;
//     }
    
//     setShowFullCard(true);
//     setFullCardTitle(task.title);
//     setFullCardDescription(task.description || '');
//   };

//   // Handle edit button click - enables inline editing (like Trello)
//   const handleEditClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsEditing(true);
//     setEditedTitle(task.title);
//   };

//   const handleFullCardSave = () => {
//     onTaskUpdate({
//       ...task,
//       title: fullCardTitle,
//       description: fullCardDescription
//     });
//     setShowFullCard(false);
//   };

//   return (
//     <>
//       {/* Main Task Card - FULLY CLICKABLE like Trello */}
//       <div 
//         className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
//         onClick={handleCardClick}
//       >
//         {/* Edit Button - Appears on Hover like Trello */}
//         <button
//           className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-all"
//           onClick={handleEditClick}
//           title="Edit card title"
//         >
//           <Edit2 className="w-3 h-3" />
//         </button>

//         {/* Labels */}
//         {task.labels.length > 0 && (
//           <div className="flex gap-1 mb-2">
//             {task.labels.map((label) => (
//               <span
//                 key={label.id}
//                 className={`px-2 py-1 rounded text-xs font-medium border ${getLabelColor(label.type)}`}
//               >
//                 {label.name}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Task Title - Editable like Trello */}
//         {isEditing ? (
//           <textarea
//             ref={textareaRef}
//             value={editedTitle}
//             onChange={(e) => setEditedTitle(e.target.value)}
//             onKeyDown={handleKeyPress}
//             onBlur={handleSave}
//             className="w-full p-1 border border-blue-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium"
//             rows={Math.max(2, editedTitle.split('\n').length)}
//             onClick={(e) => e.stopPropagation()} // Prevent card click when editing
//           />
//         ) : (
//           <div className="font-medium text-gray-900 mb-2 text-sm leading-relaxed hover:bg-gray-50 rounded -mx-1 px-1 py-0.5">
//             {task.title}
//           </div>
//         )}

//         {/* Task Meta - Exactly like Trello */}
//         <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
//           <div className="flex items-center gap-3">
//             {/* Due Date */}
//             {task.dueDate && (
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 <span>{formatDate(task.dueDate)}</span>
//               </div>
//             )}

//             {/* Comments */}
//             {task.comments > 0 && (
//               <div className="flex items-center gap-1">
//                 <MessageSquare className="w-3 h-3" />
//                 <span>{task.comments}</span>
//               </div>
//             )}

//             {/* Attachments */}
//             {task.attachments > 0 && (
//               <div className="flex items-center gap-1">
//                 <Paperclip className="w-3 h-3" />
//                 <span>{task.attachments}</span>
//               </div>
//             )}
//           </div>

//           {/* Assignees - Show on hover like Trello */}
//           {task.assignees.length > 0 && (
//             <div className="flex -space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
//               {task.assignees.slice(0, 3).map((assignee) => (
//                 <div 
//                   key={assignee.id} 
//                   className="w-5 h-5 bg-blue-500 rounded-full border border-white flex items-center justify-center text-xs font-medium text-white"
//                   title={assignee.name}
//                 >
//                   {assignee.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//               ))}
//               {task.assignees.length > 3 && (
//                 <div className="w-5 h-5 bg-gray-300 rounded-full border border-white flex items-center justify-center text-xs font-medium text-gray-600">
//                   +{task.assignees.length - 3}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Full Card Modal - For detailed editing (like Trello) */}
//       {showFullCard && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           onClick={() => setShowFullCard(false)} // Close when clicking backdrop
//         >
//           <div 
//             className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//           >
//             <div className="flex justify-between items-start mb-4">
//               <h2 className="text-xl font-bold">Edit Card</h2>
//               <button
//                 onClick={() => setShowFullCard(false)}
//                 className="p-1 hover:bg-gray-100 rounded transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <textarea
//                   value={fullCardTitle}
//                   onChange={(e) => setFullCardTitle(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   rows={3}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={fullCardDescription}
//                   onChange={(e) => setFullCardDescription(e.target.value)}
//                   placeholder="Add a more detailed description..."
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   rows={4}
//                 />
//               </div>
              
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleFullCardSave}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setShowFullCard(false)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default TaskCard;

