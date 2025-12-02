// src/app/workspace/[workspaceId]/page.tsx
'use client';

import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import { BoardCard } from "@/components/boards/BoardCard";
import { CreateBoard } from "@/components/boards/CreateBoard";
import { Plus, Search } from "lucide-react";

export default function WorkspacePage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const boards = useBoardStore((state) => state.boards);
  
  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workspace Boards</h1>
            <p className="text-gray-600 mt-2">Manage all your boards in one place</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Create Board
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search boards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Boards Grid */}
        {filteredBoards.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchTerm ? "No boards found" : "No boards yet"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? "Try adjusting your search to find what you're looking for."
                : "Create your first board to start organizing tasks and projects."
              }
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        )}

        {/* Create Board Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <CreateBoard onClose={() => setShowCreateModal(false)} />
          </div>
        )}
      </div>
    </div>
  );
}





// "use client";

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useBoardStore } from '@/store/board.store';
// import { Plus, Grid, List, Search, Star } from 'lucide-react';
// import CreateBoardModal from '@/components/boards/CreateBoardModal';
// import BoardCard from '@/components/board/BoardCard';

// export default function WorkspacePage() {
//   const params = useParams();
//   const router = useRouter();
//   const workspaceId = params.workspaceId as string;

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [filterStarred, setFilterStarred] = useState(false);

//   const boards = useBoardStore((state) => state.boards);
//   const createBoard = useBoardStore((state) => state.createBoard);
//   const updateBoard = useBoardStore((state) => state.updateBoard);
//   const deleteBoard = useBoardStore((state) => state.deleteBoard);

//   // Filter boards by workspace
//   const workspaceBoards = boards.filter(board => board.workspaceId === workspaceId || !workspaceId);

//   // Search + Starred filter
//   const filteredBoards = workspaceBoards.filter(board => {
//     const matchesSearch =
//       searchTerm === '' ||
//       board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       board.description?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStarred = !filterStarred || board.isStarred === true;

//     return matchesSearch && matchesStarred;
//   });

//   useEffect(() => {
//     setTimeout(() => setIsLoading(false), 500); // Simulate loading
//   }, []);

//   const handleCreateBoard = async (data: { name: string; description?: string; color?: string }) => {
//     try {
//       const newBoard = await createBoard({
//         name: data.name,
//         description: data.description,
//         color: data.color,
//         workspaceId,
//       });
//       setIsModalOpen(false);

//       const slug = data.name
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/(^-|-$)/g, '')
//         .slice(0, 50);

//       router.push(`/b/${newBoard.id}/${slug}`);
//     } catch (error) {
//       console.error('Failed to create board:', error);
//       alert('Failed to create board. Please try again.');
//     }
//   };

//   const handleDeleteBoard = (boardId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (confirm('Are you sure you want to delete this board?')) {
//       deleteBoard(boardId);
//     }
//   };

//   const handleStarBoard = (boardId: string, isStarred: boolean) => {
//     updateBoard(boardId, { isStarred });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <h2 className="text-2xl font-semibold mb-2">Loading workspace...</h2>
//           <p className="text-gray-500">Please wait while we load your workspace.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <h1 className="text-xl font-bold">Workspace</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <Plus size={16} /> Create
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Controls Bar */}
//         <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Your Boards</h2>
//               <p className="text-gray-600 mt-1">
//                 {workspaceId ? `Workspace: ${workspaceId}` : 'All your boards'}
//               </p>
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search boards..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
//                 />
//               </div>

//               {/* Starred Filter */}
//               <button
//                 onClick={() => setFilterStarred(!filterStarred)}
//                 className={`px-3 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
//                   filterStarred
//                     ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
//                     : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <Star size={16} className={filterStarred ? 'fill-yellow-500 text-yellow-500' : ''} />
//                 Starred
//               </button>

//               {/* View Toggle */}
//               <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
//                 >
//                   <Grid size={18} />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
//                 >
//                   <List size={18} />
//                 </button>
//               </div>

//               {/* Create Button */}
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
//               >
//                 <Plus size={18} />
//                 Create Board
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Boards Display */}
//         {filteredBoards.length === 0 ? (
//           <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border">
//             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//               {searchTerm || filterStarred ? 'No boards found' : 'No boards yet'}
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               {searchTerm
//                 ? 'Try adjusting your search or filter to find what you\'re looking for.'
//                 : 'Create your first board to start organizing tasks and projects.'}
//             </p>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               Create Your First Board
//             </button>
//           </div>
//         ) : (
//           <div className={viewMode === 'grid'
//             ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
//             : 'space-y-3'
//           }>
//             {filteredBoards.map((board) => (
//               <BoardCard
//                 key={board.id}
//                 board={board}
//                 viewMode={viewMode}
//                 onDelete={(e) => handleDeleteBoard(board.id, e)}
//                 onStar={handleStarBoard}
//                 onClick={() => {
//                   const slug = board.name
//                     .toLowerCase()
//                     .replace(/[^a-z0-9]+/g, '-')
//                     .replace(/(^-|-$)/g, '')
//                     .slice(0, 50);
//                   router.push(`/b/${board.id}/${slug}`);
//                 }}
//               />
//             ))}

//             {/* Add New Board Card */}
//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
//             >
//               <div className={`bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 ${viewMode === 'grid' ? 'h-full min-h-[200px]' : 'h-32'}`}>
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
//                   <Plus className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" size={24} />
//                 </div>
//                 <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">
//                   Create New Board
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Create Board Modal */}
//         <CreateBoardModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onCreate={handleCreateBoard}
//         />
//       </main>
//     </div>
//   );
// }



























// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { useBoardStore } from '@/store/board.store';
// // import { Plus, Grid, List, Search, Filter, Users, TrendingUp, Star } from 'lucide-react';
// // import CreateBoardModal from '@/components/boards/CreateBoardModal';
// // import BoardCard from '@/components/board/BoardCard';

// // export default function WorkspacePage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const workspaceId = params.workspaceId as string;
  
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// //   const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all');
// //   const [filterStarred, setFilterStarred] = useState(false);
  
// //   const boards = useBoardStore((state) => state.boards);
// //   const updateBoard = useBoardStore((state) => state.updateBoard);
// //   const deleteBoard = useBoardStore((state) => state.deleteBoard);
// //   const createBoard = useBoardStore((state) => state.createBoard);
  
// //   // Filter boards by workspace
// //   const workspaceBoards = boards.filter(board => 
// //     board.workspaceId === workspaceId || !workspaceId
// //   );

// //   // Filter and search boards
// //   const filteredBoards = workspaceBoards.filter(board => {
// //     // Search filter
// //     const matchesSearch = searchTerm === '' || 
// //       board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       board.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
// //     // Status filter
// //     const matchesStatus = filterStatus === 'all' || board.status === filterStatus;
    
// //     // Starred filter
// //     const matchesStarred = !filterStarred || board.isStarred === true;
    
// //     return matchesSearch && matchesStatus && matchesStarred;
// //   });

// //   // Stats
// //   const stats = {
// //     total: workspaceBoards.length,
// //     active: workspaceBoards.filter(b => b.status === 'active').length,
// //     archived: workspaceBoards.filter(b => b.status === 'archived').length,
// //     starred: workspaceBoards.filter(b => b.isStarred).length,
// //     totalMembers: workspaceBoards.reduce((sum, board) => sum + board.memberCount, 0),
// //     totalTasks: workspaceBoards.reduce((sum, board) => sum + board.taskCount, 0),
// //   };

// //   useEffect(() => {
// //     // Simulate loading
// //     setTimeout(() => setIsLoading(false), 500);
// //   }, []);

// //   const handleCreateBoard = async (data: { name: string; description?: string; color?: string }) => {
// //     try {
// //       const newBoard = await createBoard({
// //         name: data.name,
// //         description: data.description,
// //         color: data.color,
// //         workspaceId,
// //       });
      
// //       setIsModalOpen(false);
      
// //       // Navigate to the new board
// //       const slug = data.name
// //         .toLowerCase()
// //         .replace(/[^a-z0-9]+/g, '-')
// //         .replace(/(^-|-$)/g, '')
// //         .slice(0, 50);
      
// //       router.push(`/b/${newBoard.id}/${slug}`);
// //     } catch (error) {
// //       console.error('Failed to create board:', error);
// //       alert('Failed to create board. Please try again.');
// //     }
// //   };

// //   const handleDeleteBoard = (boardId: string, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     if (confirm('Are you sure you want to delete this board?')) {
// //       deleteBoard(boardId);
// //     }
// //   };

// //   const handleStarBoard = (boardId: string, isStarred: boolean) => {
// //     updateBoard(boardId, { isStarred });
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <h2 className="text-2xl font-semibold mb-2">Loading workspace...</h2>
// //           <p className="text-gray-500">Please wait while we load your workspace.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Header */}
// //       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
// //         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <h1 className="text-xl font-bold">Workspace</h1>
// //             <span className="text-sm text-gray-500">|</span>
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
// //             >
// //               <Plus size={16} />
// //               Create
// //             </button>
// //           </div>
          
// //           <div className="flex items-center gap-4">
// //             <span className="text-sm">John Doe</span>
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
// //               aria-label="Create board"
// //             >
// //               <Plus size={20} />
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 py-8">
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //           {/* ... keep your existing stats cards ... */}
// //         </div>

// //         {/* Controls Bar */}
// //         <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900">Your Boards</h2>
// //               <p className="text-gray-600 mt-1">
// //                 {workspaceId ? `Workspace: ${workspaceId}` : 'All your boards'}
// //               </p>
// //             </div>
            
// //             <div className="flex flex-wrap items-center gap-3">
// //               {/* Search */}
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
// //                 <input
// //                   type="text"
// //                   placeholder="Search boards..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
// //                 />
// //               </div>
              
// //               {/* Starred Filter */}
// //               <button
// //                 onClick={() => setFilterStarred(!filterStarred)}
// //                 className={`px-3 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
// //                   filterStarred
// //                     ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
// //                     : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
// //                 }`}
// //               >
// //                 <Star size={16} className={filterStarred ? 'fill-yellow-500 text-yellow-500' : ''} />
// //                 Starred
// //               </button>
              
// //               {/* Filter */}
// //               <select
// //                 value={filterStatus}
// //                 onChange={(e) => setFilterStatus(e.target.value as any)}
// //                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //               >
// //                 <option value="all">All Boards</option>
// //                 <option value="active">Active</option>
// //                 <option value="archived">Archived</option>
// //               </select>
              
// //               {/* View Toggle */}
// //               <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// //                 <button
// //                   onClick={() => setViewMode('grid')}
// //                   className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
// //                 >
// //                   <Grid size={18} />
// //                 </button>
// //                 <button
// //                   onClick={() => setViewMode('list')}
// //                   className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
// //                 >
// //                   <List size={18} />
// //                 </button>
// //               </div>
              
// //               {/* Create Button */}
// //               <button
// //                 onClick={() => setIsModalOpen(true)}
// //                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
// //               >
// //                 <Plus size={18} />
// //                 Create Board
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Boards Display */}
// //         {filteredBoards.length === 0 ? (
// //           <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border">
// //             <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
// //               <Grid size={32} className="text-gray-400" />
// //             </div>
// //             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
// //               {searchTerm || filterStarred ? 'No boards found' : 'No boards yet'}
// //             </h3>
// //             <p className="text-gray-600 mb-8 max-w-md mx-auto">
// //               {searchTerm 
// //                 ? 'Try adjusting your search or filter to find what you\'re looking for.'
// //                 : 'Create your first board to start organizing tasks and projects.'
// //               }
// //             </p>
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
// //             >
// //               Create Your First Board
// //             </button>
// //           </div>
// //         ) : (
// //           <div className={viewMode === 'grid' 
// //             ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
// //             : 'space-y-3'
// //           }>
// //             {filteredBoards.map((board) => (
// //               <BoardCard
// //                 key={board.id}
// //                 board={board}
// //                 viewMode={viewMode}
// //                 onDelete={(e) => handleDeleteBoard(board.id, e)}
// //                 onStar={handleStarBoard}
// //                 onClick={() => {
// //                   const slug = board.name
// //                     .toLowerCase()
// //                     .replace(/[^a-z0-9]+/g, '-')
// //                     .replace(/(^-|-$)/g, '')
// //                     .slice(0, 50);
// //                   router.push(`/b/${board.id}/${slug}`);
// //                 }}
// //               />
// //             ))}
            
// //             {/* Add New Board Card */}
// //             <div
// //               onClick={() => setIsModalOpen(true)}
// //               className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
// //             >
// //               <div className={`bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 ${
// //                 viewMode === 'grid' ? 'h-full min-h-[200px]' : 'h-32'
// //               }`}>
// //                 <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
// //                   <Plus
// //                     className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
// //                     size={24}
// //                   />
// //                 </div>
// //                 <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">
// //                   Create New Board
// //                 </span>
// //                 {viewMode === 'list' && (
// //                   <p className="text-sm text-gray-500 mt-2">Add a new board to your workspace</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Create Board Modal */}
// //         <CreateBoardModal
// //           isOpen={isModalOpen}
// //           onClose={() => setIsModalOpen(false)}
// //           onCreate={handleCreateBoard}
// //         />
// //       </main>
// //     </div>
// //   );
// // }









// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams, useRouter } from "next/navigation";
// // // import { useWorkspace } from "@/hooks/useWorkspace";
// // // // import     from "@/store/board.store";
// // // import BoardCard from "@/components/board/BoardCard";
// // // import CreateBoardModal from "@/components/board/CreateBoardModal";

// // // export default function WorkspacePage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const workspaceId = params.workspaceId as string;
  
// // //   const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);
  
// // //   const { getWorkspace, setCurrentWorkspace } = useWorkspace();
// // //   const boards = useAppStore((state) => state.boards);
// // //   const createBoard = useAppStore((state) => state.createBoard);
  
// // //   const workspace = getWorkspace(workspaceId);
// // //   const workspaceBoards = boards.filter((board) => board.workspaceId === workspaceId);

// // //   useEffect(() => {
// // //     if (workspaceId) {
// // //       setCurrentWorkspace(workspaceId);
// // //       setIsLoading(false);
// // //     }
// // //   }, [workspaceId, setCurrentWorkspace]);

// // //   const handleCreateBoard = (data: { 
// // //     title: string; 
// // //     description?: string; 
// // //     visibility: string;
// // //     background: string;
// // //   }) => {
// // //     const board = createBoard({
// // //       title: data.title,
// // //       description: data.description,
// // //       workspaceId,
// // //       visibility: data.visibility as any,
// // //       background: data.background,
// // //     });
    
// // //     setShowCreateBoardModal(false);
    
// // //     // Create URL-friendly slug
// // //     const slug = data.title
// // //       .toLowerCase()
// // //       .replace(/[^a-z0-9]+/g, "-")
// // //       .replace(/(^-|-$)/g, "")
// // //       .slice(0, 50);
    
// // //     router.push(`/b/${board.id}/${slug}`);
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="text-center">
// // //           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// // //           <h2 className="text-2xl font-semibold mb-2">Loading workspace...</h2>
// // //           <p className="text-gray-500">Please wait while we load your workspace.</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!workspace) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="text-center">
// // //           <h2 className="text-2xl font-semibold mb-2">Workspace not found</h2>
// // //           <p className="text-gray-500 mb-6">The workspace you're looking for doesn't exist.</p>
// // //           <button
// // //             onClick={() => router.push("/workspaces")}
// // //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // //           >
// // //             Go to Workspaces
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Workspace Header */}
// // //         <div className="mb-8 md:mb-12">
// // //           <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
// // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
// // //               <div className="flex-1">
// // //                 <div className="flex items-center gap-4 mb-4">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
// // //                     <span className="text-white font-bold text-xl">
// // //                       {workspace.name.charAt(0).toUpperCase()}
// // //                     </span>
// // //                   </div>
// // //                   <div>
// // //                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{workspace.name}</h1>
// // //                     {workspace.description && (
// // //                       <p className="text-gray-600 mt-2">{workspace.description}</p>
// // //                     )}
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-500">
// // //                   <div className="flex items-center gap-2">
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a4.5 4.5 0 01-6.364 0" />
// // //                     </svg>
// // //                     <span>{workspace.members.length} members</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // //                     </svg>
// // //                     <span>{workspaceBoards.length} boards</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// // //                     </svg>
// // //                     <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
// // //                     </svg>
// // //                     <span className="capitalize">{workspace.visibility}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
              
// // //               <div className="flex gap-3">
// // //                 <button
// // //                   onClick={() => setShowCreateBoardModal(true)}
// // //                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // //                   </svg>
// // //                   Create Board
// // //                 </button>
// // //                 <button
// // //                   onClick={() => router.push("/workspaces")}
// // //                   className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center gap-2"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// // //                   </svg>
// // //                   Back
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Boards Section */}
// // //         <div>
// // //           <div className="mb-6">
// // //             <h2 className="text-2xl font-semibold text-gray-900">
// // //               Boards ({workspaceBoards.length})
// // //             </h2>
// // //             <p className="text-gray-600 mt-1">
// // //               Create boards to organize your projects and tasks
// // //             </p>
// // //           </div>

// // //           {workspaceBoards.length === 0 ? (
// // //             <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
// // //               <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6">
// // //                 <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// // //                 </svg>
// // //               </div>
// // //               <h3 className="text-2xl font-semibold text-gray-900 mb-3">
// // //                 No boards in this workspace
// // //               </h3>
// // //               <p className="text-gray-600 mb-8 max-w-md mx-auto">
// // //                 Create your first board to start organizing tasks and collaborating with your team.
// // //               </p>
// // //               <button
// // //                 onClick={() => setShowCreateBoardModal(true)}
// // //                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
// // //               >
// // //                 Create Your First Board
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
// // //               {workspaceBoards.map((board) => (
// // //                 <BoardCard
// // //                   key={board.id}
// // //                   board={board}
// // //                   onClick={() => {
// // //                     const slug = board.title
// // //                       .toLowerCase()
// // //                       .replace(/[^a-z0-9]+/g, "-")
// // //                       .replace(/(^-|-$)/g, "")
// // //                       .slice(0, 50);
// // //                     router.push(`/b/${board.id}/${slug}`);
// // //                   }}
// // //                 />
// // //               ))}
              
// // //               {/* Add New Board Card */}
// // //               <div
// // //                 onClick={() => setShowCreateBoardModal(true)}
// // //                 className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
// // //               >
// // //                 <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-48 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
// // //                     <svg
// // //                       className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
// // //                       fill="none"
// // //                       stroke="currentColor"
// // //                       viewBox="0 0 24 24"
// // //                     >
// // //                       <path
// // //                         strokeLinecap="round"
// // //                         strokeLinejoin="round"
// // //                         strokeWidth={2}
// // //                         d="M12 4v16m8-8H4"
// // //                       />
// // //                     </svg>
// // //                   </div>
// // //                   <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">
// // //                     Create New Board
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Create Board Modal */}
// // //         {showCreateBoardModal && (
// // //           <CreateBoardModal
// // //             workspaceId={workspaceId}
// // //             onSubmit={handleCreateBoard}
// // //             onClose={() => setShowCreateBoardModal(false)}
// // //           />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { use } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import Link from 'next/link';
// // // // import { WorkspaceHeader } from '@/components/workspaces/WorkspaceHeader';
// // // // import { BoardCard } from '@/components/workspaces/BoardCard';
// // // // import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';
// // // // import { useWorkspace } from '@/hooks/useWorkspace';
// // // // import { useBoard } from '@/hooks/useBoard';
// // // // import { Workspace, Board } from '@/types';

// // // // export default function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
// // // //   const resolvedParams = use(params);
// // // //   const workspaceId = resolvedParams.workspaceId;
// // // //   const router = useRouter();
  
// // // //   const { 
// // // //     workspace, 
// // // //     isLoading: workspaceLoading, 
// // // //     updateWorkspace,
// // // //     error: workspaceError 
// // // //   } = useWorkspace(workspaceId);
  
// // // //   const { 
// // // //     boards, 
// // // //     createBoard, 
// // // //     updateBoard, 
// // // //     deleteBoard,
// // // //     isLoading: boardsLoading 
// // // //   } = useBoard();
  
// // // //   const [showCreateBoard, setShowCreateBoard] = useState(false);
// // // //   const [workspaceBoards, setWorkspaceBoards] = useState<Board[]>([]);
// // // //   const [recentBoards, setRecentBoards] = useState<Board[]>([]);

// // // //   useEffect(() => {
// // // //     if (workspace && boards.length > 0) {
// // // //       const filteredBoards = boards.filter(board => board.workspaceId === workspaceId);
      
// // // //       // Remove duplicates using Map
// // // //       const uniqueBoards = Array.from(
// // // //         new Map(filteredBoards.map(board => [board.id, board])).values()
// // // //       );

// // // //       setWorkspaceBoards(uniqueBoards);
      
// // // //       // Get recent boards (last 4 visited or created)
// // // //       const recent = uniqueBoards
// // // //         .sort((a, b) => {
// // // //           // Sort by last activity or creation date
// // // //           const dateA = a.lastActivityAt || a.createdAt;
// // // //           const dateB = b.lastActivityAt || b.createdAt;
// // // //           return new Date(dateB).getTime() - new Date(dateA).getTime();
// // // //         })
// // // //         .slice(0, 4);
      
// // // //       setRecentBoards(recent);
// // // //     }
// // // //   }, [workspace, boards, workspaceId]);

// // // //   const handleCreateBoard = async (boardData: { title: string; description?: string; background?: string; workspaceId: string }) => {
// // // //     try {
// // // //       const newBoard = await createBoard({
// // // //         ...boardData,
// // // //         workspaceId: workspaceId,
// // // //       });
      
// // // //       setShowCreateBoard(false);
// // // //     } catch (error) {
// // // //       console.error('Failed to create board:', error);
// // // //     }
// // // //   };

// // // //   const handleUpdateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
// // // //     try {
// // // //       await updateWorkspace(workspaceId, updates);
// // // //     } catch (error) {
// // // //       console.error('Failed to update workspace:', error);
// // // //     }
// // // //   };

// // // //   const handleDeleteBoard = async (boardId: string) => {
// // // //     try {
// // // //       await deleteBoard(boardId);
// // // //     } catch (error) {
// // // //       console.error('Failed to delete board:', error);
// // // //     }
// // // //   };

// // // //   const handleUpdateBoard = async (boardId: string, updates: Partial<Board>) => {
// // // //     try {
// // // //       await updateBoard(boardId, updates);
// // // //     } catch (error) {
// // // //       console.error('Failed to update board:', error);
// // // //     }
// // // //   };

// // // //   if (workspaceLoading || boardsLoading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (workspaceError || !workspace) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Not Found</h1>
// // // //           <p className="text-gray-600 mb-4">The workspace you're looking for doesn't exist.</p>
// // // //           <Link 
// // // //             href="/boards" 
// // // //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// // // //           >
// // // //             Back to All Boards
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 w-full">
// // // //       {/* Navigation */}
// // // //       <div className="bg-white border-b border-gray-200">
// // // //         <div className="w-full px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex items-center justify-between h-16">
// // // //             <div className="flex items-center gap-4">
// // // //               <button
// // // //                 onClick={() => router.push('/boards')}
// // // //                 className="text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm font-medium"
// // // //               >
// // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // // //                 </svg>
// // // //                 All Boards
// // // //               </button>
// // // //               <div className="w-px h-6 bg-gray-300"></div>
// // // //               <span className="text-gray-900 font-medium">{workspace.name}</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
// // // //         <WorkspaceHeader 
// // // //           workspace={workspace} 
// // // //           onUpdateWorkspace={handleUpdateWorkspace}
// // // //         />
        
// // // //         {/* Recent Boards Section */}
// // // //         {recentBoards.length > 0 && (
// // // //           <div className="mb-8">
// // // //             <div className="flex items-center justify-between mb-6">
// // // //               <div>
// // // //                 <h2 className="text-2xl font-bold text-gray-900">Recent boards</h2>
// // // //                 <p className="text-gray-600 mt-1">
// // // //                   Boards you've visited recently
// // // //                 </p>
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
// // // //               {recentBoards.map(board => (
// // // //                 <BoardCard
// // // //                   key={board.id}
// // // //                   board={board}
// // // //                   workspaceId={workspaceId}
// // // //                   onDeleteBoard={handleDeleteBoard}
// // // //                   onUpdateBoard={handleUpdateBoard}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* All Boards Section */}
// // // //         <div className="mb-8">
// // // //           <div className="flex items-center justify-between mb-6">
// // // //             <div>
// // // //               <h2 className="text-2xl font-bold text-gray-900">All boards</h2>
// // // //               <p className="text-gray-600 mt-1">
// // // //                 {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} in this workspace
// // // //               </p>
// // // //             </div>
            
// // // //             <button 
// // // //               onClick={() => setShowCreateBoard(true)}
// // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
// // // //             >
// // // //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // //               </svg>
// // // //               Create Board
// // // //             </button>
// // // //           </div>

// // // //           {workspaceBoards.length === 0 ? (
// // // //             <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
// // // //               <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// // // //               </svg>
// // // //               <h3 className="text-xl font-medium text-gray-900 mb-2">No boards yet</h3>
// // // //               <p className="text-gray-500 mb-6 max-w-md mx-auto">
// // // //                 Create your first board to start organizing your tasks and projects in {workspace.name}.
// // // //               </p>
// // // //               <button 
// // // //                 onClick={() => setShowCreateBoard(true)}
// // // //                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
// // // //               >
// // // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // //                 </svg>
// // // //                 Create Your First Board
// // // //               </button>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
// // // //               {workspaceBoards.map(board => (
// // // //                 <BoardCard
// // // //                   key={board.id}
// // // //                   board={board}
// // // //                   workspaceId={workspaceId}
// // // //                   onDeleteBoard={handleDeleteBoard}
// // // //                   onUpdateBoard={handleUpdateBoard}
// // // //                 />
// // // //               ))}
              
// // // //               <button
// // // //                 onClick={() => setShowCreateBoard(true)}
// // // //                 className="bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors flex flex-col items-center justify-center min-h-[140px] w-full"
// // // //               >
// // // //                 <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // //                 </svg>
// // // //                 <span className="text-gray-600 font-medium">Create new board</span>
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Workspace Members Section */}
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h3>
// // // //           <div className="flex items-center gap-3">
// // // //             {workspace.members.map((memberId, index) => (
// // // //               <div key={memberId} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
// // // //                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
// // // //                   {String.fromCharCode(65 + index)}
// // // //                 </div>
// // // //                 <span className="text-sm text-gray-700">User {index + 1}</span>
// // // //               </div>
// // // //             ))}
// // // //             <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
// // // //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // //               </svg>
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <CreateBoardForm
// // // //         isOpen={showCreateBoard}
// // // //         onClose={() => setShowCreateBoard(false)}
// // // //         onSubmit={handleCreateBoard}
// // // //         workspaceId={workspaceId}
// // // //         workspaceName={workspace.name}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }




// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { use } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import Link from 'next/link';
// // // // // import { WorkspaceHeader } from '@/components/workspaces/WorkspaceHeader';
// // // // // import { BoardCard } from '@/components/workspaces/BoardCard';
// // // // // import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';
// // // // // import { useWorkspace } from '@/hooks/useWorkspace';
// // // // // import { useBoard } from '@/hooks/useBoard';
// // // // // import { Workspace, Board } from '@/types';

// // // // // export default function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
// // // // //   const resolvedParams = use(params);
// // // // //   const workspaceId = resolvedParams.workspaceId;
// // // // //   const router = useRouter();
  
// // // // //   const { 
// // // // //     workspace, 
// // // // //     isLoading: workspaceLoading, 
// // // // //     updateWorkspace,
// // // // //     error: workspaceError 
// // // // //   } = useWorkspace(workspaceId);
  
// // // // //   const { 
// // // // //     boards, 
// // // // //     createBoard, 
// // // // //     updateBoard, 
// // // // //     deleteBoard,
// // // // //     isLoading: boardsLoading 
// // // // //   } = useBoard();
  
// // // // //   const [showCreateBoard, setShowCreateBoard] = useState(false);
// // // // //   const [workspaceBoards, setWorkspaceBoards] = useState<Board[]>([]);
// // // // //   const [recentBoards, setRecentBoards] = useState<Board[]>([]);

// // // // //   useEffect(() => {
// // // // //     if (workspace && boards.length > 0) {
// // // // //       const filteredBoards = boards.filter(board => board.workspaceId === workspaceId);
      
// // // // //       // Remove duplicates using Map
// // // // //       const uniqueBoards = Array.from(
// // // // //         new Map(filteredBoards.map(board => [board.id, board])).values()
// // // // //       );

// // // // //       setWorkspaceBoards(uniqueBoards);
      
// // // // //       // Get recent boards (last 4 visited or created)
// // // // //       const recent = uniqueBoards
// // // // //         .sort((a, b) => {
// // // // //           // Sort by last activity or creation date
// // // // //           const dateA = a.lastActivityAt || a.createdAt;
// // // // //           const dateB = b.lastActivityAt || b.createdAt;
// // // // //           return new Date(dateB).getTime() - new Date(dateA).getTime();
// // // // //         })
// // // // //         .slice(0, 4);
      
// // // // //       setRecentBoards(recent);
// // // // //     }
// // // // //   }, [workspace, boards, workspaceId]);

// // // // //   const handleCreateBoard = async (boardData: { title: string; description?: string; background?: string; workspaceId: string }) => {
// // // // //     try {
// // // // //       const newBoard = await createBoard({
// // // // //         ...boardData,
// // // // //         workspaceId: workspaceId,
// // // // //       });
      
// // // // //       setShowCreateBoard(false);
// // // // //       // Optionally navigate to the new board
// // // // //       // router.push(`/b/${newBoard.id}/...`);
// // // // //     } catch (error) {
// // // // //       console.error('Failed to create board:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
// // // // //     try {
// // // // //       await updateWorkspace(workspaceId, updates);
// // // // //     } catch (error) {
// // // // //       console.error('Failed to update workspace:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteBoard = async (boardId: string) => {
// // // // //     try {
// // // // //       await deleteBoard(boardId);
// // // // //     } catch (error) {
// // // // //       console.error('Failed to delete board:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateBoard = async (boardId: string, updates: Partial<Board>) => {
// // // // //     try {
// // // // //       await updateBoard(boardId, updates);
// // // // //     } catch (error) {
// // // // //       console.error('Failed to update board:', error);
// // // // //     }
// // // // //   };

// // // // //   if (workspaceLoading || boardsLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (workspaceError || !workspace) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Not Found</h1>
// // // // //           <p className="text-gray-600 mb-4">The workspace you're looking for doesn't exist.</p>
// // // // //           <Link 
// // // // //             href="/boards" 
// // // // //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// // // // //           >
// // // // //             Back to All Boards
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 w-full">
// // // // //       {/* Navigation */}
// // // // //       <div className="bg-white border-b border-gray-200">
// // // // //         <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
// // // // //           <div className="flex items-center justify-between h-16">
// // // // //             <div className="flex items-center gap-4">
// // // // //               <button
// // // // //                 onClick={() => router.push('/boards')}
// // // // //                 className="text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm font-medium"
// // // // //               >
// // // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // // // //                 </svg>
// // // // //                 All Boards
// // // // //               </button>
// // // // //               <div className="w-px h-6 bg-gray-300"></div>
// // // // //               <span className="text-gray-900 font-medium">{workspace.name}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         <WorkspaceHeader 
// // // // //           workspace={workspace} 
// // // // //           onUpdateWorkspace={handleUpdateWorkspace}
// // // // //         />
        
// // // // //         {/* Recent Boards Section */}
// // // // //         {recentBoards.length > 0 && (
// // // // //           <div className="mb-8">
// // // // //             <div className="flex items-center justify-between mb-6">
// // // // //               <div>
// // // // //                 <h2 className="text-2xl font-bold text-gray-900">Recent boards</h2>
// // // // //                 <p className="text-gray-600 mt-1">
// // // // //                   Boards you've visited recently
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // // //               {recentBoards.map(board => (
// // // // //                 <BoardCard
// // // // //                   key={board.id}
// // // // //                   board={board}
// // // // //                   workspaceId={workspaceId}
// // // // //                   onDeleteBoard={handleDeleteBoard}
// // // // //                   onUpdateBoard={handleUpdateBoard}
// // // // //                 />
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* All Boards Section */}
// // // // //         <div className="mb-8">
// // // // //           <div className="flex items-center justify-between mb-6">
// // // // //             <div>
// // // // //               <h2 className="text-2xl font-bold text-gray-900">All boards</h2>
// // // // //               <p className="text-gray-600 mt-1">
// // // // //                 {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} in this workspace
// // // // //               </p>
// // // // //             </div>
            
// // // // //             <button 
// // // // //               onClick={() => setShowCreateBoard(true)}
// // // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
// // // // //             >
// // // // //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // //               </svg>
// // // // //               Create Board
// // // // //             </button>
// // // // //           </div>

// // // // //           {workspaceBoards.length === 0 ? (
// // // // //             <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
// // // // //               <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// // // // //               </svg>
// // // // //               <h3 className="text-xl font-medium text-gray-900 mb-2">No boards yet</h3>
// // // // //               <p className="text-gray-500 mb-6 max-w-md mx-auto">
// // // // //                 Create your first board to start organizing your tasks and projects in {workspace.name}.
// // // // //               </p>
// // // // //               <button 
// // // // //                 onClick={() => setShowCreateBoard(true)}
// // // // //                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
// // // // //               >
// // // // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // //                 </svg>
// // // // //                 Create Your First Board
// // // // //               </button>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // // //               {workspaceBoards.map(board => (
// // // // //                 <BoardCard
// // // // //                   key={board.id}
// // // // //                   board={board}
// // // // //                   workspaceId={workspaceId}
// // // // //                   onDeleteBoard={handleDeleteBoard}
// // // // //                   onUpdateBoard={handleUpdateBoard}
// // // // //                 />
// // // // //               ))}
              
// // // // //               {/* Create new board card */}
// // // // //               <button
// // // // //                 onClick={() => setShowCreateBoard(true)}
// // // // //                 className="bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors flex flex-col items-center justify-center min-h-[140px]"
// // // // //               >
// // // // //                 <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // //                 </svg>
// // // // //                 <span className="text-gray-600 font-medium">Create new board</span>
// // // // //               </button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Workspace Members Section */}
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h3>
// // // // //           <div className="flex items-center gap-3">
// // // // //             {workspace.members.map((memberId, index) => (
// // // // //               <div key={memberId} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
// // // // //                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
// // // // //                   {String.fromCharCode(65 + index)}
// // // // //                 </div>
// // // // //                 <span className="text-sm text-gray-700">User {index + 1}</span>
// // // // //               </div>
// // // // //             ))}
// // // // //             <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
// // // // //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // //               </svg>
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <CreateBoardForm
// // // // //         isOpen={showCreateBoard}
// // // // //         onClose={() => setShowCreateBoard(false)}
// // // // //         onSubmit={handleCreateBoard}
// // // // //         workspaceId={workspaceId}
// // // // //         workspaceName={workspace.name}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }










