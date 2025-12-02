"use client";

import { useState, useRef } from "react";
import { Card as CardType } from "@/types/board";
import { useBoardStore } from "@/store/board.store";

interface CardModalProps {
  card: CardType;
  listId: string;
  boardId: string;
  onClose: () => void;
}

export default function CardModal({ card, listId, boardId, onClose }: CardModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");
  const [newComment, setNewComment] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    updateCard,
    deleteCard,
  } = useBoardStore();

  const handleSave = () => {
    updateCard(boardId, listId, card.id, {
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
    });
  };

  const handleDeleteCard = () => {
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(boardId, listId, card.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSave}
                className="w-full text-xl font-semibold text-gray-900 bg-transparent border-none resize-none focus:outline-none focus:ring-0"
                rows={1}
              />
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>in list</span>
                <span className="font-medium">List</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === "details"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === "comments"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Comments
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleSave}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Add a more detailed description..."
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      onBlur={handleSave}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {dueDate && (
                      <button
                        onClick={() => {
                          setDueDate("");
                          handleSave();
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div className="space-y-6">
                {/* Add Comment */}
                <div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        // Add comment logic here
                        setNewComment("");
                      }}
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-64 border-l border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Move
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Copy
              </button>
              <button 
                onClick={handleDeleteCard}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




// "use client";

// import { useState, useRef } from "react";
// import { Card as CardType, Label, Checklist, Comment, Attachment } from "@/types";
// import { useAppStore } from "@/store/app.store";

// interface CardModalProps {
//   card: CardType;
//   listId: string;
//   boardId: string;
//   onClose: () => void;
// }

// export default function CardModal({ card, listId, boardId, onClose }: CardModalProps) {
//   const [activeTab, setActiveTab] = useState<"details" | "checklists" | "comments">("details");
//   const [title, setTitle] = useState(card.title);
//   const [description, setDescription] = useState(card.description || "");
//   const [dueDate, setDueDate] = useState(card.dueDate || "");
//   const [newLabel, setNewLabel] = useState("");
//   const [newLabelColor, setNewLabelColor] = useState("#3b82f6");
//   const [newChecklistTitle, setNewChecklistTitle] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [newChecklistItem, setNewChecklistItem] = useState<Record<string, string>>({});
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     updateCard,
//     addCardLabel,
//     removeCardLabel,
//     addCardMember,
//     removeCardMember,
//     addChecklist,
//     updateChecklistItem,
//     addComment,
//     deleteComment,
//     addAttachment,
//     removeAttachment,
//   } = useAppStore();

//   const board = useAppStore((state) => state.boards.find(b => b.id === boardId));
//   const boardLabels = board?.labels || [];
//   const cardLabels = card.labels || [];
//   const availableLabels = boardLabels.filter(label => 
//     !cardLabels.some(cl => cl.id === label.id)
//   );

//   const handleSave = () => {
//     updateCard(boardId, listId, card.id, {
//       title,
//       description: description || undefined,
//       dueDate: dueDate || undefined,
//     });
//   };

//   const handleAddLabel = () => {
//     if (newLabel.trim() && board) {
//       const label: Label = {
//         id: Date.now().toString(),
//         text: newLabel.trim(),
//         color: newLabelColor,
//       };
      
//       // First add to board labels if not exists
//       if (!boardLabels.some(l => l.text === label.text)) {
//         // This would need to be implemented in store
//         // For now, we'll just add to card directly
//       }
      
//       addCardLabel(boardId, listId, card.id, label.id);
//       setNewLabel("");
//     }
//   };

//   const handleAddChecklist = () => {
//     if (newChecklistTitle.trim()) {
//       addChecklist(boardId, listId, card.id, newChecklistTitle.trim());
//       setNewChecklistTitle("");
//     }
//   };

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       addComment(
//         boardId,
//         listId,
//         card.id,
//         newComment.trim(),
//         "current-user-id", // Replace with actual user ID
//         "Current User" // Replace with actual user name
//       );
//       setNewComment("");
//     }
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files?.length) return;

//     // Simulate file upload
//     Array.from(files).forEach((file) => {
//       const attachment: Attachment = {
//         id: Date.now().toString(),
//         name: file.name,
//         url: URL.createObjectURL(file),
//         type: file.type.startsWith('image/') ? 'image' : 
//                file.type.includes('pdf') ? 'pdf' : 
//                file.type.includes('word') || file.type.includes('document') ? 'doc' : 'other',
//         uploadedAt: new Date().toISOString(),
//       };
      
//       addAttachment(boardId, listId, card.id, attachment);
//     });

//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <textarea
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 onBlur={handleSave}
//                 className="w-full text-xl font-semibold text-gray-900 bg-transparent border-none resize-none focus:outline-none focus:ring-0"
//                 rows={1}
//               />
//               <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
//                 <span>in list</span>
//                 <span className="font-medium">{card.listId}</span>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden flex">
//           {/* Left Side - Main Content */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 mb-6">
//               <button
//                 onClick={() => setActiveTab("details")}
//                 className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                   activeTab === "details"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Details
//               </button>
//               <button
//                 onClick={() => setActiveTab("checklists")}
//                 className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                   activeTab === "checklists"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Checklists
//               </button>
//               <button
//                 onClick={() => setActiveTab("comments")}
//                 className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                   activeTab === "comments"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Comments ({card.comments.length})
//               </button>
//             </div>

//             {/* Tab Content */}
//             {activeTab === "details" && (
//               <div className="space-y-6">
//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     onBlur={handleSave}
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//                     placeholder="Add a more detailed description..."
//                   />
//                 </div>

//                 {/* Labels */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Labels
//                   </label>
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {cardLabels.map((label) => (
//                       <div
//                         key={label.id}
//                         className="px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2"
//                         style={{ 
//                           backgroundColor: `${label.color}20`,
//                           color: label.color,
//                         }}
//                       >
//                         {label.text}
//                         <button
//                           onClick={() => removeCardLabel(boardId, listId, card.id, label.id)}
//                           className="text-current opacity-60 hover:opacity-100"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Add Label */}
//                   <div className="flex gap-2">
//                     <select
//                       value={newLabel}
//                       onChange={(e) => {
//                         const label = availableLabels.find(l => l.text === e.target.value);
//                         if (label) {
//                           addCardLabel(boardId, listId, card.id, label.id);
//                           setNewLabel("");
//                         }
//                       }}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Add existing label</option>
//                       {availableLabels.map((label) => (
//                         <option key={label.id} value={label.text}>
//                           {label.text}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Due Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Due Date
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="date"
//                       value={dueDate}
//                       onChange={(e) => setDueDate(e.target.value)}
//                       onBlur={handleSave}
//                       className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     {dueDate && (
//                       <button
//                         onClick={() => {
//                           setDueDate("");
//                           handleSave();
//                         }}
//                         className="text-sm text-gray-500 hover:text-gray-700"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Attachments */}
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Attachments ({card.attachments.length})
//                     </label>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       multiple
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="text-sm text-blue-600 hover:text-blue-800"
//                     >
//                       + Add
//                     </button>
//                   </div>
                  
//                   <div className="space-y-2">
//                     {card.attachments.map((attachment) => (
//                       <div
//                         key={attachment.id}
//                         className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
//                             {attachment.type === 'image' ? (
//                               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                               </svg>
//                             ) : (
//                               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00的五.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                               </svg>
//                             )}
//                           </div>
//                           <div>
//                             <div className="font-medium text-sm">{attachment.name}</div>
//                             <div className="text-xs text-gray-500">
//                               Added {new Date(attachment.uploadedAt).toLocaleDateString()}
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => removeAttachment(boardId, listId, card.id, attachment.id)}
//                           className="text-gray-400 hover:text-gray-600"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "checklists" && (
//               <div className="space-y-6">
//                 {/* Add New Checklist */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Add Checklist
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={newChecklistTitle}
//                       onChange={(e) => setNewChecklistTitle(e.target.value)}
//                       placeholder="Checklist title"
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <button
//                       onClick={handleAddChecklist}
//                       className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>

//                 {/* Existing Checklists */}
//                 <div className="space-y-4">
//                   {card.checklists.map((checklist) => (
//                     <div key={checklist.id} className="border border-gray-200 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 mb-3">{checklist.title}</h4>
                      
//                       {/* Add Item */}
//                       <div className="flex gap-2 mb-3">
//                         <input
//                           type="text"
//                           value={newChecklistItem[checklist.id] || ''}
//                           onChange={(e) => setNewChecklistItem({
//                             ...newChecklistItem,
//                             [checklist.id]: e.target.value
//                           })}
//                           placeholder="Add an item"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter' && newChecklistItem[checklist.id]?.trim()) {
//                               const newItem = {
//                                 id: Date.now().toString(),
//                                 text: newChecklistItem[checklist.id].trim(),
//                                 completed: false,
//                               };
//                               // This would need store update
//                               setNewChecklistItem({
//                                 ...newChecklistItem,
//                                 [checklist.id]: ''
//                               });
//                             }
//                           }}
//                         />
//                       </div>
                      
//                       {/* Checklist Items */}
//                       <div className="space-y-2">
//                         {checklist.items.map((item) => (
//                           <div key={item.id} className="flex items-center gap-3">
//                             <input
//                               type="checkbox"
//                               checked={item.completed}
//                               onChange={(e) => updateChecklistItem(
//                                 boardId,
//                                 listId,
//                                 card.id,
//                                 checklist.id,
//                                 item.id,
//                                 { completed: e.target.checked }
//                               )}
//                               className="w-4 h-4 text-blue-600 rounded"
//                             />
//                             <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
//                               {item.text}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
                      
//                       {/* Progress */}
//                       {checklist.items.length > 0 && (
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           <div className="text-sm text-gray-500">
//                             {checklist.items.filter(item => item.completed).length} of {checklist.items.length} completed
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "comments" && (
//               <div className="space-y-6">
//                 {/* Add Comment */}
//                 <div>
//                   <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Write a comment..."
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   />
//                   <div className="flex justify-end mt-2">
//                     <button
//                       onClick={handleAddComment}
//                       disabled={!newComment.trim()}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>

//                 {/* Comments List */}
//                 <div className="space-y-4">
//                   {card.comments.map((comment) => (
//                     <div key={comment.id} className="border-b border-gray-100 pb-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                           <span className="text-blue-800 font-medium text-sm">
//                             {comment.userName.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <span className="font-medium text-gray-900">{comment.userName}</span>
//                             <span className="text-xs text-gray-500">
//                               {new Date(comment.createdAt).toLocaleString()}
//                             </span>
//                           </div>
//                           <p className="text-gray-700 mt-1">{comment.text}</p>
//                         </div>
//                         <button
//                           onClick={() => deleteComment(boardId, listId, card.id, comment.id)}
//                           className="text-gray-400 hover:text-gray-600"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Side - Sidebar */}
//           <div className="w-64 border-l border-gray-200 p-6 overflow-y-auto">
//             <h3 className="text-sm font-semibold text-gray-900 mb-4">Add to card</h3>
            
//             <div className="space-y-3">
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Checklist
//               </button>
              
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                 </svg>
//                 Add Comment
//               </button>
              
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                 </svg>
//                 Add Attachment
//               </button>
              
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a4.5 4.5 0 01-6.364 0" />
//                 </svg>
//                 Add Members
//               </button>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-sm font-semibold text-gray-900 mb-3">Actions</h3>
              
//               <div className="space-y-2">
//                 <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
//                   Move
//                 </button>
//                 <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
//                   Copy
//                 </button>
//                 <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-6">
//           <div className="flex justify-end gap-3">
//             <button
//               onClick={onClose}
//               className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { LABEL_COLORS, LABEL_NAMES } from '@/lib/utils/constants';

// // interface CardModalProps {
// //   card: {
// //     id: string;
// //     title: string;
// //     description?: string;
// //     labels: string[];
// //     dueDate?: string;
// //     attachments?: any[];
// //     listId: string;
// //   };
// //   onClose: () => void;
// //   onSave: (updates: any) => void;
// //   onLabelToggle: (label: string) => void;
// // }

// // export default function CardModal({ card, onClose, onSave, onLabelToggle }: CardModalProps) {
// //   const [title, setTitle] = useState(card.title);
// //   const [description, setDescription] = useState(card.description || '');
// //   const [dueDate, setDueDate] = useState(card.dueDate || '');

// //   useEffect(() => {
// //     setTitle(card.title);
// //     setDescription(card.description || '');
// //     setDueDate(card.dueDate || '');
// //   }, [card]);

// //   const handleSave = () => {
// //     onSave({
// //       title,
// //       description,
// //       dueDate: dueDate || null
// //     });
// //   };

// //   const handleKeyDown = (e: React.KeyboardEvent) => {
// //     if (e.key === 'Enter' && e.metaKey) {
// //       handleSave();
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div 
// //         className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// //         onKeyDown={handleKeyDown}
// //       >
// //         <div className="p-6">
// //           {/* Header */}
// //           <div className="flex justify-between items-start mb-4">
// //             <h2 className="text-xl font-semibold">Edit Card</h2>
// //             <button
// //               onClick={onClose}
// //               className="text-gray-500 hover:text-gray-700 text-xl"
// //             >
// //               ✕
// //             </button>
// //           </div>

// //           {/* Content */}
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Main Content */}
// //             <div className="lg:col-span-2 space-y-4">
// //               {/* Title */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={title}
// //                   onChange={(e) => setTitle(e.target.value)}
// //                   className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Enter card title..."
// //                 />
// //               </div>

// //               {/* Description */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   rows={4}
// //                   className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Add a more detailed description..."
// //                 />
// //               </div>

// //               {/* Attachments */}
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-700 mb-2">
// //                   Attachments
// //                 </h3>
// //                 {(!card.attachments || card.attachments.length === 0) ? (
// //                   <p className="text-sm text-gray-500">No attachments yet</p>
// //                 ) : (
// //                   <div className="space-y-2">
// //                     {card.attachments.map((attachment, index) => (
// //                       <div key={index} className="flex items-center text-sm">
// //                         📎 {attachment.name}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Sidebar */}
// //             <div className="space-y-4">
// //               {/* Due Date */}
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-700 mb-2">
// //                   Due Date
// //                 </h3>
// //                 <input
// //                   type="date"
// //                   value={dueDate}
// //                   onChange={(e) => setDueDate(e.target.value)}
// //                   className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>

// //               {/* Labels */}
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-700 mb-2">
// //                   Labels
// //                 </h3>
// //                 <div className="space-y-1">
// //                   {Object.entries(LABEL_NAMES).map(([key, name]) => (
// //                     <label key={key} className="flex items-center space-x-2 cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={card.labels.includes(key)}
// //                         onChange={() => onLabelToggle(key)}
// //                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                       />
// //                       <span
// //                         className="w-4 h-4 rounded border border-gray-300"
// //                         style={{ backgroundColor: LABEL_COLORS[key as keyof typeof LABEL_COLORS] }}
// //                       ></span>
// //                       <span className="text-sm text-gray-700">{name}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Actions */}
// //           <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
// //             <button
// //               onClick={onClose}
// //               className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={handleSave}
// //               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //             >
// //               Save Card
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




