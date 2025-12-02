'use client';

import { useState } from 'react';
import { X, Palette } from 'lucide-react';
import { useBoardStore } from '@/store/board.store';
import { CreateBoardData } from '@/types/board';

const BOARD_COLORS = [
  '#0079BF', '#D29034', '#519839', '#B04632',
  '#89609E', '#CD5A91', '#4BBF6B', '#00AECC',
];

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (boardId: string) => void;
}

export default function CreateBoardModal({ isOpen, onClose, onSuccess }: CreateBoardModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedColor, setSelectedColor] = useState(BOARD_COLORS[0]);
  const [formData, setFormData] = useState<CreateBoardData>({
    name: '',
    description: '',
    color: BOARD_COLORS[0],
  });

  const createBoard = useBoardStore((state) => state.createBoard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a board name');
      return;
    }

    setIsCreating(true);
    
    try {
      const newBoard = createBoard({
        ...formData,
        color: selectedColor,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        color: BOARD_COLORS[0],
      });
      setSelectedColor(BOARD_COLORS[0]);
      
      // Call success callback
      onSuccess?.(newBoard.id);
      onClose();
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Create board</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
            disabled={isCreating}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Board Preview */}
          <div
            className="h-32 rounded-lg mb-4 flex items-center justify-center transition-all"
            style={{ backgroundColor: selectedColor }}
          >
            {formData.name ? (
              <span className="text-white font-semibold text-lg">
                {formData.name}
              </span>
            ) : (
              <span className="text-white/80 text-sm">Board preview</span>
            )}
          </div>

          {/* Color Picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select background color
            </label>
            <div className="flex flex-wrap gap-2">
              {BOARD_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color);
                    setFormData(prev => ({ ...prev, color }));
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                  disabled={isCreating}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  const color = prompt('Enter hex color code:', selectedColor);
                  if (color && /^#[0-9A-F]{6}$/i.test(color)) {
                    setSelectedColor(color);
                    setFormData(prev => ({ ...prev, color }));
                  }
                }}
                className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50"
                aria-label="Custom color"
                disabled={isCreating}
              >
                <Palette size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Board Name */}
          <div className="mb-4">
            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-1">
              Board name *
            </label>
            <input
              id="board-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Project Alpha"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              required
              autoFocus
              disabled={isCreating}
            />
          </div>

          {/* Board Description */}
          <div className="mb-6">
            <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="board-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What's this board about?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:opacity-50"
              disabled={isCreating}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !formData.name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? 'Creating...' : 'Create board'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





// 'use client';

// import { useState } from 'react';
// import { X } from 'lucide-react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { useBoardStore } from '@/store/board.store';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// interface CreateBoardModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCreateSuccess?: (boardId: string) => void;
// }

// const COLOR_OPTIONS = [
//   { value: '#3B82F6', label: 'Blue', bg: 'bg-blue-500' },
//   { value: '#8B5CF6', label: 'Purple', bg: 'bg-purple-500' },
//   { value: '#10B981', label: 'Green', bg: 'bg-green-500' },
//   { value: '#F59E0B', label: 'Yellow', bg: 'bg-yellow-500' },
//   { value: '#EF4444', label: 'Red', bg: 'bg-red-500' },
//   { value: '#EC4899', label: 'Pink', bg: 'bg-pink-500' },
// ];

// export function CreateBoardModal({ isOpen, onClose, onCreateSuccess }: CreateBoardModalProps) {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const createBoard = useBoardStore((state) => state.createBoard);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) return;

//     setIsSubmitting(true);
    
//     try {
//       const newBoard = createBoard({
//         name: name.trim(),
//         description: description.trim() || undefined,
//         color: selectedColor,
//       });

//       // Reset form
//       setName('');
//       setDescription('');
//       setSelectedColor(COLOR_OPTIONS[0].value);
      
//       // Callback
//       if (onCreateSuccess) {
//         onCreateSuccess(newBoard.id);
//       }

//       // Close modal after a short delay
//       setTimeout(() => {
//         onClose();
//       }, 300);
//     } catch (error) {
//       console.error('Failed to create board:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog.Root open={isOpen} onOpenChange={onClose}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl data-[state=open]:animate-contentShow">
//           <div className="flex items-center justify-between mb-6">
//             <Dialog.Title className="text-xl font-semibold text-gray-900">
//               Create New Board
//             </Dialog.Title>
//             <Dialog.Close asChild>
//               <button className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <X className="h-5 w-5" />
//               </button>
//             </Dialog.Close>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Board Name *
//               </label>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="e.g., Website Redesign"
//                 required
//                 autoFocus
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description (Optional)
//               </label>
//               <Textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="What's this board about?"
//                 rows={3}
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Board Color
//               </label>
//               <div className="grid grid-cols-6 gap-2">
//                 {COLOR_OPTIONS.map((color) => (
//                   <button
//                     key={color.value}
//                     type="button"
//                     onClick={() => setSelectedColor(color.value)}
//                     className={`
//                       h-10 rounded-lg flex items-center justify-center
//                       ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
//                       transition-all
//                     `}
//                   >
//                     <div className={`${color.bg} w-8 h-8 rounded-md`} />
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-2 flex items-center">
//                 <div
//                   className="w-4 h-4 rounded mr-2"
//                   style={{ backgroundColor: selectedColor }}
//                 />
//                 <span className="text-sm text-gray-600">
//                   Selected: {COLOR_OPTIONS.find(c => c.value === selectedColor)?.label}
//                 </span>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 pt-4 border-t">
//               <Dialog.Close asChild>
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//               </Dialog.Close>
//               <Button
//                 type="submit"
//                 disabled={!name.trim() || isSubmitting}
//                 className="bg-blue-600 hover:bg-blue-700"
//               >
//                 {isSubmitting ? 'Creating...' : 'Create Board'}
//               </Button>
//             </div>
//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }



// // "use client";

// // import { useState } from "react";

// // interface CreateBoardModalProps {
// //   workspaceId: string;
// //   onSubmit: (data: { 
// //     title: string; 
// //     description?: string; 
// //     visibility: string;
// //     background: string;
// //   }) => void;
// //   onClose: () => void;
// // }

// // const backgroundOptions = [
// //   { value: "blue", label: "Blue", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
// //   { value: "green", label: "Green", color: "bg-gradient-to-br from-green-500 to-green-600" },
// //   { value: "purple", label: "Purple", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
// //   { value: "red", label: "Red", color: "bg-gradient-to-br from-red-500 to-red-600" },
// //   { value: "orange", label: "Orange", color: "bg-gradient-to-br from-orange-500 to-orange-600" },
// //   { value: "teal", label: "Teal", color: "bg-gradient-to-br from-teal-500 to-teal-600" },
// //   { value: "pink", label: "Pink", color: "bg-gradient-to-br from-pink-500 to-pink-600" },
// //   { value: "indigo", label: "Indigo", color: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
// // ];

// // export default function CreateBoardModal({ workspaceId, onSubmit, onClose }: CreateBoardModalProps) {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [visibility, setVisibility] = useState<"workspace" | "private" | "public">("workspace");
// //   const [background, setBackground] = useState("blue");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!title.trim()) {
// //       alert("Please enter a board title");
// //       return;
// //     }

// //     setIsSubmitting(true);
    
// //     try {
// //       await onSubmit({
// //         title: title.trim(),
// //         description: description.trim() || undefined,
// //         visibility,
// //         background,
// //       });
// //     } catch (error) {
// //       console.error("Failed to create board:", error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-xl w-full max-w-md">
// //         <div className="p-6">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-xl font-semibold text-gray-900">Create Board</h2>
// //             <button
// //               onClick={onClose}
// //               className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
// //               disabled={isSubmitting}
// //             >
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit}>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Board Title *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={title}
// //                   onChange={(e) => setTitle(e.target.value)}
// //                   placeholder="e.g., Project Roadmap"
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   required
// //                   autoFocus
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Description (optional)
// //                 </label>
// //                 <textarea
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   placeholder="What's this board about?"
// //                   rows={3}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   Background
// //                 </label>
// //                 <div className="grid grid-cols-4 gap-2">
// //                   {backgroundOptions.map((option) => (
// //                     <button
// //                       key={option.value}
// //                       type="button"
// //                       onClick={() => setBackground(option.value)}
// //                       className={`aspect-square rounded-lg transition-all duration-200 transform hover:scale-105 ${
// //                         background === option.value
// //                           ? "ring-2 ring-blue-500 ring-offset-2"
// //                           : "hover:ring-1 hover:ring-gray-300"
// //                       } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""} ${option.color}`}
// //                       disabled={isSubmitting}
// //                     />
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   Visibility
// //                 </label>
// //                 <div className="grid grid-cols-3 gap-3">
// //                   {[
// //                     { value: "workspace", label: "Workspace", icon: "🏢", desc: "Workspace members" },
// //                     { value: "private", label: "Private", icon: "🔒", desc: "Only invited" },
// //                     { value: "public", label: "Public", icon: "🌐", desc: "Everyone" },
// //                   ].map((option) => (
// //                     <button
// //                       key={option.value}
// //                       type="button"
// //                       onClick={() => setVisibility(option.value as any)}
// //                       className={`p-3 border rounded-lg text-center transition-all duration-200 ${
// //                         visibility === option.value
// //                           ? "border-blue-500 bg-blue-50"
// //                           : "border-gray-300 hover:border-gray-400"
// //                       } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
// //                       disabled={isSubmitting}
// //                     >
// //                       <div className="text-xl mb-1">{option.icon}</div>
// //                       <div className="font-medium text-gray-900 text-sm">{option.label}</div>
// //                       <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
// //                 disabled={isSubmitting}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? (
// //                   <span className="flex items-center gap-2">
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                     Creating...
// //                   </span>
// //                 ) : (
// //                   "Create Board"
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }