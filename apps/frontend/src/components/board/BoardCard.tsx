"use client";

import Link from "next/link";
import { Board } from "../../lib/types";

type Props = { board: Board; workspaceId: string };

export default function BoardCard({ board, workspaceId }: Props) {
  return (
    <Link href={`/workspace/${workspaceId}/board/${board.id}`}>
      <div className="p-4 bg-gray-100 rounded hover:shadow cursor-pointer">
        <h3 className="font-bold">{board.name}</h3>
        <p className="text-sm text-gray-600">{board.privacy}</p>
      </div>
    </Link>
  );
}








// 'use client';

// import { MoreVertical, Users, CheckSquare, Clock, Archive } from 'lucide-react';
// import { Board } from '@/types/board';

// interface BoardCardProps {
//   board: Board;
//   viewMode: 'grid' | 'list';
//   onDelete: (e: React.MouseEvent) => void;
//   onClick: () => void;
// }

// export default function BoardCard({ board, viewMode, onDelete, onClick }: BoardCardProps) {
//   if (viewMode === 'list') {
//     return (
//       <div
//         onClick={onClick}
//         className="bg-white rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer group"
//       >
//         <div className="p-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div
//               className="w-12 h-12 rounded-lg"
//               style={{ backgroundColor: board.color }}
//             />
//             <div>
//               <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
//                 {board.name}
//               </h3>
//               {board.description && (
//                 <p className="text-gray-600 text-sm mt-1">{board.description}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-4 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Users size={16} />
//                 <span>{board.memberCount}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <CheckSquare size={16} />
//                 <span>{board.taskCount}</span>
//               </div>
//               {board.status === 'archived' && (
//                 <div className="flex items-center gap-1 text-amber-600">
//                   <Archive size={16} />
//                   <span>Archived</span>
//                 </div>
//               )}
//             </div>
            
//             <button
//               onClick={onDelete}
//               className="p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//               title="Delete board"
//             >
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Grid View
//   return (
//     <div
//       onClick={onClick}
//       className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
//     >
//       <div className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
//         {/* Board Background */}
//         <div
//           className="h-32 relative"
//           style={{ backgroundColor: board.color }}
//         >
//           {/* Overlay on hover */}
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
//           {/* Status Badge */}
//           {board.status === 'archived' && (
//             <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700 flex items-center gap-1">
//               <Archive size={12} />
//               Archived
//             </div>
//           )}
//         </div>
        
//         {/* Content */}
//         <div className="bg-white p-4">
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
//                 {board.name}
//               </h3>
//               {board.description && (
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                   {board.description}
//                 </p>
//               )}
//             </div>
            
//             <button
//               onClick={onDelete}
//               className="p-1 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//               title="Delete board"
//             >
//               <MoreVertical size={18} />
//             </button>
//           </div>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-3 border-t">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1">
//                 <Users size={14} />
//                 <span>{board.memberCount}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <CheckSquare size={14} />
//                 <span>{board.taskCount}</span>
//               </div>
//             </div>
            
//             <div className="text-xs text-gray-500">
//               {new Date(board.updatedAt).toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // 'use client';

// // import { useState } from 'react';
// // import { 
// //   MoreVertical, 
// //   Users, 
// //   CheckSquare, 
// //   Archive, 
// //   Edit, 
// //   Trash2,
// //   EyeOff
// // } from 'lucide-react';
// // import { format } from 'date-fns';
// // import { Board } from '@/types/board';
// // import { useBoardStore } from '@/store/board.store';
// // import { Button } from '@/components/ui/button';
// // import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// // import { UpdateBoardModal } from './UpdateBoardModal';
// // import { useRouter } from 'next/navigation';

// // interface BoardCardProps {
// //   board: Board;
// //   showActions?: boolean;
// // }

// // export function BoardCard({ board, showActions = true }: BoardCardProps) {
// //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
// //   const archiveBoard = useBoardStore((state) => state.archiveBoard);
// //   const deleteBoard = useBoardStore((state) => state.deleteBoard);
// //   const router = useRouter();

// //   const handleArchive = () => {
// //     if (confirm(`Archive "${board.name}"? It will be moved to archived boards.`)) {
// //       archiveBoard(board.id);
// //     }
// //   };

// //   const handleDelete = () => {
// //     if (confirm(`Permanently delete "${board.name}"? This action cannot be undone.`)) {
// //       deleteBoard(board.id);
// //     }
// //   };

// //   const handleOpenBoard = () => {
// //     router.push(`/boards/${board.id}`);
// //   };

// //   return (
// //     <>
// //       <div
// //         className="group relative bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
// //         onClick={handleOpenBoard}
// //       >
// //         {/* Color accent */}
// //         <div 
// //           className="h-2 w-full"
// //           style={{ backgroundColor: board.color }}
// //         />

// //         <div className="p-5">
// //           {/* Header */}
// //           <div className="flex items-start justify-between mb-4">
// //             <div>
// //               <h3 className="font-semibold text-gray-900 text-lg mb-1">
// //                 {board.name}
// //               </h3>
// //               {board.description && (
// //                 <p className="text-gray-600 text-sm line-clamp-2">
// //                   {board.description}
// //                 </p>
// //               )}
// //             </div>

// //             {showActions && (
// //               <DropdownMenu.Root>
// //                 <DropdownMenu.Trigger asChild>
// //                   <Button
// //                     variant="ghost"
// //                     size="sm"
// //                     className="opacity-0 group-hover:opacity-100 transition-opacity"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                     }}
// //                   >
// //                     <MoreVertical className="h-4 w-4" />
// //                   </Button>
// //                 </DropdownMenu.Trigger>

// //                 <DropdownMenu.Portal>
// //                   <DropdownMenu.Content
// //                     className="min-w-[200px] bg-white rounded-md shadow-lg border p-1 z-50"
// //                     align="end"
// //                     sideOffset={5}
// //                   >
// //                     <DropdownMenu.Item
// //                       className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         setIsUpdateModalOpen(true);
// //                       }}
// //                     >
// //                       <Edit className="h-4 w-4 mr-2" />
// //                       Edit Board
// //                     </DropdownMenu.Item>

// //                     <DropdownMenu.Item
// //                       className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         handleArchive();
// //                       }}
// //                     >
// //                       <Archive className="h-4 w-4 mr-2" />
// //                       Archive Board
// //                     </DropdownMenu.Item>

// //                     <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

// //                     <DropdownMenu.Item
// //                       className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         handleDelete();
// //                       }}
// //                     >
// //                       <Trash2 className="h-4 w-4 mr-2" />
// //                       Delete Board
// //                     </DropdownMenu.Item>
// //                   </DropdownMenu.Content>
// //                 </DropdownMenu.Portal>
// //               </DropdownMenu.Root>
// //             )}
// //           </div>

// //           {/* Stats */}
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center">
// //                 <Users className="h-4 w-4 mr-1" />
// //                 <span>{board.memberCount}</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <CheckSquare className="h-4 w-4 mr-1" />
// //                 <span>{board.taskCount}</span>
// //               </div>
// //             </div>

// //             <div className="text-xs">
// //               Updated {format(board.updatedAt, 'MMM d')}
// //             </div>
// //           </div>

// //           {/* Archived badge */}
// //           {board.status === 'archived' && (
// //             <div className="absolute top-2 right-2">
// //               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
// //                 <EyeOff className="h-3 w-3 mr-1" />
// //                 Archived
// //               </span>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Update Modal */}
// //       <UpdateBoardModal
// //         board={board}
// //         isOpen={isUpdateModalOpen}
// //         onClose={() => setIsUpdateModalOpen(false)}
// //       />
// //     </>
// //   );
// // }






// // // "use client";

// // // import { Board } from "@/types/board";
// // // import { useState } from "react";

// // // interface BoardCardProps {
// // //   board: Board;
// // //   onClick: () => void;
// // //   onDelete: (e: React.MouseEvent) => void;
// // // }

// // // export default function BoardCard({ board, onClick, onDelete }: BoardCardProps) {
// // //   const [isHovered, setIsHovered] = useState(false);

// // //   const getGradient = () => {
// // //     const gradients: Record<string, string> = {
// // //       blue: "from-blue-500 to-blue-600",
// // //       green: "from-green-500 to-green-600",
// // //       purple: "from-purple-500 to-purple-600",
// // //       red: "from-red-500 to-red-600",
// // //       orange: "from-orange-500 to-orange-600",
// // //       teal: "from-teal-500 to-teal-600",
// // //     };
// // //     return gradients[board.background || "blue"] || "from-blue-500 to-blue-600";
// // //   };

// // //   const countCards = () => {
// // //     return board.lists.reduce((total, list) => total + list.cards.length, 0);
// // //   };

// // //   return (
// // //     <div
// // //       onClick={onClick}
// // //       onMouseEnter={() => setIsHovered(true)}
// // //       onMouseLeave={() => setIsHovered(false)}
// // //       className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
// // //     >
// // //       <div className={`bg-gradient-to-br ${getGradient()} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-48 relative`}>
// // //         {/* Delete button */}
// // //         <button
// // //           onClick={onDelete}
// // //           className={`absolute top-3 right-3 z-20 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 ${
// // //             isHovered ? "opacity-100" : "opacity-0"
// // //           }`}
// // //         >
// // //           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //           </svg>
// // //         </button>

// // //         {/* Content */}
// // //         <div className="h-full p-5 flex flex-col justify-end relative z-10">
// // //           <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
// // //             {board.name}
// // //           </h3>
          
// // //           {/* Stats */}
// // //           <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/20">
// // //             <div className="flex items-center gap-4 text-white/80 text-sm">
// // //               <div className="flex items-center gap-1">
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // //                 </svg>
// // //                 <span>{board.lists.length} lists</span>
// // //               </div>
// // //               <div className="flex items-center gap-1">
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                 </svg>
// // //                 <span>{countCards()} cards</span>
// // //               </div>
// // //             </div>
// // //             <div className="text-white/60 text-sm">
// // //               {new Date(board.createdAt).toLocaleDateString('en-US', { 
// // //                 month: 'short', 
// // //                 day: 'numeric' 
// // //               })}
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         {/* Hover effect */}
// // //         <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // // components/Board/BoardCard.jsx
// // // import { LABEL_COLORS } from "@/lib/utils/constants";
// // // import { LABEL_NAMES } from "@/lib/utils/constants";


// // // const BoardCard = ({ card, onCardClick, onLabelToggle }) => {
// // //   const formatDueDate = (dateString) => {
// // //     if (!dateString) return '';
// // //     const date = new Date(dateString);
// // //     return date.toLocaleDateString();
// // //   };

// // //   return (
// // //     <div 
// // //       className="bg-white rounded-lg shadow-sm border p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow"
// // //       onClick={() => onCardClick(card)}
// // //     >
// // //       {/* Labels */}
// // //       {card.labels.length > 0 && (
// // //         <div className="flex flex-wrap gap-1 mb-2">
// // //           {card.labels.map(label => (
// // //             <span
// // //               key={label}
// // //               className="px-2 py-1 text-xs font-medium rounded text-white"
// // //               style={{ backgroundColor: LABEL_COLORS[label] }}
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 onLabelToggle(card.id, label);
// // //               }}
// // //             >
// // //               {LABEL_NAMES[label]}
// // //             </span>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Card Title */}
// // //       <h4 className="font-medium text-gray-900 mb-2">{card.title}</h4>

// // //       {/* Due Date */}
// // //       {card.dueDate && (
// // //         <div className="text-xs text-gray-500 mb-2">
// // //           Due: {formatDueDate(card.dueDate)}
// // //         </div>
// // //       )}

// // //       {/* Attachments */}
// // //       {card.attachments.length > 0 && (
// // //         <div className="text-xs text-gray-500">
// // //           📎 {card.attachments.length} attachment{card.attachments.length !== 1 ? 's' : ''}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BoardCard;




// // // 'use client';

// // // import Link from 'next/link';
// // // import { Board } from '@/types/board';

// // // interface BoardCardProps {
// // //   board: Board;
// // //   workspaceId: string;
// // //   onDeleteBoard?: (boardId: string) => void;
// // //   onUpdateBoard?: (boardId: string, updates: Partial<Board>) => void;
// // // }

// // // export function BoardCard({ board, workspaceId }: BoardCardProps) {
// // //   return (
// // //     <Link href={`/board/${board.id}`} className="block group">
// // //       <div 
// // //         className="bg-cover bg-center rounded-lg aspect-video p-4 hover:shadow-lg transition-all duration-200 group-hover:scale-105"
// // //         style={{ 
// // //           background: board.background?.includes('gradient') 
// // //             ? `linear-gradient(135deg, ${getGradientColors(board.background)})`
// // //             : getBackgroundColor(board.background)
// // //         }}
// // //       >
// // //         <h3 className="text-white font-semibold text-lg">{board.title}</h3>
// // //         {board.description && (
// // //           <p className="text-white text-opacity-80 text-sm mt-2">{board.description}</p>
// // //         )}
// // //       </div>
// // //     </Link>
// // //   );
// // // }

// // // // Add these helper functions
// // // function getGradientColors(background: string = 'blue') {
// // //   const gradients = {
// // //     'gradient-blue': '#3b82f6, #1d4ed8',
// // //     'gradient-green': '#10b981, #047857',
// // //     'gradient-red': '#ef4444, #dc2626',
// // //     'gradient-purple': '#8b5cf6, #7c3aed',
// // //     'gradient-orange': '#f59e0b, #d97706',
// // //     'gradient-pink': '#ec4899, #db2777',
// // //   };
// // //   return gradients[background as keyof typeof gradients] || '#3b82f6, #1d4ed8';
// // // }

// // // function getBackgroundColor(background: string = 'blue') {
// // //   const colors = {
// // //     'blue': '#3b82f6',
// // //     'green': '#10b981',
// // //     'red': '#ef4444',
// // //     'purple': '#8b5cf6',
// // //     'orange': '#f59e0b',
// // //     'pink': '#ec4899',
// // //   };
// // //   return colors[background as keyof typeof colors] || '#3b82f6';
// // // }