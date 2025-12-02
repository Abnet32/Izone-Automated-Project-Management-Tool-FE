// src/app/boards/page.tsx
'use client';

import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { BoardCard } from '@/components/boards/BoardCard';
import { CreateBoard } from '@/components/boards/CreateBoard';
import { Search, Filter, Grid, List, Archive, Star, Plus } from 'lucide-react';

export default function BoardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showArchived, setShowArchived] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get boards from store
  const boards = useBoardStore((state) => state.boards);
  const createBoard = useBoardStore((state) => state.createBoard);

  const handleCreateBoard = (boardData: any) => {
    createBoard(boardData);
    setIsModalOpen(false);
  };

  // Filter boards based on search, starred, and archived filters
  const filteredBoards = boards.filter(board => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      board.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Archived filter (if you have status property)
    // const matchesArchived = showArchived ? board.status === 'archived' : board.status === 'active';
    
    // Starred filter (if you have isStarred property)
    // const matchesStarred = !showStarred || board.isStarred === true;
    
    return matchesSearch; // Add && matchesArchived && matchesStarred when you add those properties
  });

  // Stats
  const stats = {
    total: boards.length,
    active: boards.length, // Update when adding status property
    archived: 0, // Update when adding status property
    starred: 0, // Update when adding isStarred property
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Boards</h1>
              <p className="text-gray-600 mt-2">
                Manage all your boards in one place
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Create Board
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Total Boards</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Archived</p>
            <p className="text-2xl font-bold text-amber-600">{stats.archived}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Starred</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.starred}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search boards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStarred(!showStarred)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    showStarred
                      ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Star size={16} className={showStarred ? 'fill-yellow-500 text-yellow-500' : ''} />
                  Starred
                </button>
                <button
                  onClick={() => setShowArchived(!showArchived)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    showArchived
                      ? 'bg-amber-50 border border-amber-200 text-amber-700'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Archive size={16} />
                  Archived
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Boards Display */}
        {filteredBoards.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Grid size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchTerm || showArchived || showStarred ? 'No boards found' : 'No boards yet'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'Create your first board to start organizing tasks and projects.'
              }
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
            : 'space-y-3'
          }>
            {filteredBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
            
            {/* Add New Board Card */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className={`bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 ${
                viewMode === 'grid' ? 'h-full min-h-[200px]' : 'h-32'
              }`}>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <Plus className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                </div>
                <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors">
                  Create New Board
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Create Board Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <CreateBoard 
              onCreate={handleCreateBoard}
              onClose={() => setIsModalOpen(false)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import { Plus, Archive, Grid, List, Search } from 'lucide-react';
// import { useBoardStore } from '@/store/board.store';
// import {bordcard} from '@/components/board/boardcard';
// import { Creatcom} from '@/components/board/CreateBoardModal';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// export default function BoardsPage() {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   const activeBoards = useBoardStore((state) => state.getActiveBoards());
//   const archivedBoards = useBoardStore((state) => state.getArchivedBoards());

//   // Filter boards based on search
//   const filteredActiveBoards = activeBoards.filter(board =>
//     board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     board.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredArchivedBoards = archivedBoards.filter(board =>
//     board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     board.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCreateSuccess = (boardId: string) => {
//     // You can navigate to the new board or show a success message
//     console.log('Board created:', boardId);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Boards</h1>
//               <p className="text-gray-600 mt-2">
//                 Manage your project boards. Archived boards won't appear in the main list.
//               </p>
//             </div>
//             <Button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="bg-blue-600 hover:bg-blue-700"
//             >
//               <Plus className="h-5 w-5 mr-2" />
//               New Board
//             </Button>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex-1 max-w-md">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search boards..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="flex items-center border rounded-lg">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="rounded-r-none"
//                 >
//                   <Grid className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="rounded-l-none border-l"
//                 >
//                   <List className="h-4 w-4" />
//                 </Button>
//               </div>

//               <Button
//                 variant="outline"
//                 onClick={() => setShowArchived(!showArchived)}
//                 className="relative"
//               >
//                 <Archive className="h-4 w-4 mr-2" />
//                 Archived ({archivedBoards.length})
//                 {showArchived && (
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Active Boards */}
//         <div className="mb-12">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             Active Boards ({filteredActiveBoards.length})
//           </h2>

//           {filteredActiveBoards.length === 0 ? (
//             <div className="bg-white rounded-xl border-2 border-dashed p-12 text-center">
//               <div className="max-w-md mx-auto">
//                 <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Plus className="h-8 w-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No boards yet
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Create your first board to start organizing your projects
//                 </p>
//                 <Button
//                   onClick={() => setIsCreateModalOpen(true)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   <Plus className="h-5 w-5 mr-2" />
//                   Create New Board
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className={`
//                 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'}
//                 gap-6
//               `}
//             >
//               {filteredActiveBoards.map((board) => (
//                 <BoardCard key={board.id} board={board} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Archived Boards (Only when toggled) */}
//         {showArchived && filteredArchivedBoards.length > 0 && (
//           <div className="border-t pt-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//               <Archive className="h-5 w-5 mr-2 text-gray-500" />
//               Archived Boards ({filteredArchivedBoards.length})
//             </h2>
//             <div
//               className={`
//                 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'}
//                 gap-6
//               `}
//             >
//               {filteredArchivedBoards.map((board) => (
//                 <BoardCard
//                   key={board.id}
//                   board={board}
//                   showActions={false}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty archived state */}
//         {showArchived && filteredArchivedBoards.length === 0 && (
//           <div className="border-t pt-8">
//             <div className="bg-gray-50 rounded-xl p-8 text-center">
//               <Archive className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No archived boards
//               </h3>
//               <p className="text-gray-600">
//                 Archived boards will appear here when you archive them
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Create Board Modal */}
//       <CreateBoardModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onCreateSuccess={handleCreateSuccess}
//       />
//     </div>
//   );
// }


// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { useBoards } from "@/hooks/useBoards";
// // import BoardCard from "@/components/board/BoardCard";

// // export default function BoardsPage() {
// //   const [isLoading, setIsLoading] = useState(true); // Change to true initially
// //   const [showCreateForm, setShowCreateForm] = useState(false);
// //   const [newBoardTitle, setNewBoardTitle] = useState("");
// //   const [newBoardDescription, setNewBoardDescription] = useState("");
  
// //   const router = useRouter();
// //   const { boards = [], createBoard } = useBoards(); // Add default value for boards

// //   useEffect(() => {
// //     // Simulate loading data
// //     const timer = setTimeout(() => {
// //       setIsLoading(false);
// //     }, 500);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   const handleCreateBoard = (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!newBoardTitle.trim()) {
// //       alert("Please enter a board title");
// //       return;
// //     }

// //     try {
// //       const newBoard = createBoard({
// //         title: newBoardTitle.trim(),
// //         description: newBoardDescription.trim() || undefined,
// //       });

// //       // Create URL-friendly slug
// //       const slug = newBoardTitle
// //         .toLowerCase()
// //         .replace(/[^a-z0-9]+/g, "-")
// //         .replace(/(^-|-$)/g, "")
// //         .slice(0, 50);

// //       // Reset form
// //       setNewBoardTitle("");
// //       setNewBoardDescription("");
// //       setShowCreateForm(false);

// //       // Navigate to new board
// //       router.push(`/b/${newBoard.id}/${slug}`);
// //     } catch (err) {
// //       console.error("Failed to create board:", err);
// //       alert("Failed to create board. Please try again.");
// //     }
// //   };

// //   const handleBoardClick = (boardId: string, boardTitle: string) => {
// //     const slug = boardTitle
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, "-")
// //       .replace(/(^-|-$)/g, "")
// //       .slice(0, 50);
// //     router.push(`/b/${boardId}/${slug}`);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-semibold mb-2">Loading boards...</h2>
// //           <p className="text-gray-500">Please wait while we load your boards.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // FIXED: Add null/undefined check for boards
// //   const safeBoards = boards || [];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8 md:mb-12">
// //           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Boards</h1>
// //           <p className="text-gray-600 mt-2 md:mt-3">
// //             Create and manage your project boards. All data is temporary and will reset on refresh.
// //           </p>
// //         </div>

// //         {/* Create Board Button/Form */}
// //         <div className="mb-8 md:mb-10">
// //           {showCreateForm ? (
// //             <form onSubmit={handleCreateBoard} className="bg-white rounded-xl shadow-lg p-6 max-w-md">
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Board</h3>
              
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Board Title *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={newBoardTitle}
// //                     onChange={(e) => setNewBoardTitle(e.target.value)}
// //                     placeholder="e.g., Project Roadmap"
// //                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                     required
// //                     autoFocus
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Description (optional)
// //                   </label>
// //                   <textarea
// //                     value={newBoardDescription}
// //                     onChange={(e) => setNewBoardDescription(e.target.value)}
// //                     placeholder="Describe what this board is about..."
// //                     rows={3}
// //                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //                   />
// //                 </div>

// //                 <div className="flex justify-end gap-3 pt-2">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setShowCreateForm(false);
// //                       setNewBoardTitle("");
// //                       setNewBoardDescription("");
// //                     }}
// //                     className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
// //                   >
// //                     Create Board
// //                   </button>
// //                 </div>
// //               </div>
// //             </form>
// //           ) : (
// //             <button
// //               onClick={() => setShowCreateForm(true)}
// //               className="group w-full max-w-xs h-52 border-3 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 flex flex-col items-center justify-center"
// //             >
// //               <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-sm">
// //                 <svg
// //                   className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M12 4v16m8-8H4"
// //                   />
// //                 </svg>
// //               </div>
// //               <span className="text-gray-700 font-semibold text-lg group-hover:text-blue-700 transition-colors duration-300">
// //                 Create new board
// //               </span>
// //               <span className="text-sm text-gray-500 mt-2 group-hover:text-gray-600 transition-colors duration-300">
// //                 Start organizing your projects
// //               </span>
// //             </button>
// //           )}
// //         </div>

// //         {/* Boards Grid - FIXED: Use safeBoards with null check */}
// //         {(!safeBoards || safeBoards.length === 0) ? (
// //           <div className="text-center py-16 md:py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
// //             <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
// //               <svg
// //                 className="w-10 h-10 text-gray-400"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={1.5}
// //                   d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold text-gray-900 mb-3">
// //               No boards yet
// //             </h3>
// //             <p className="text-gray-600 mb-8 max-w-md mx-auto">
// //               Create your first board to start organizing tasks and projects.
// //               All boards are temporary and will reset when you refresh the page.
// //             </p>
// //             <button
// //               onClick={() => setShowCreateForm(true)}
// //               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
// //             >
// //               Create Your First Board
// //             </button>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="mb-6">
// //               <h2 className="text-2xl font-semibold text-gray-900">
// //                 Your Boards ({safeBoards.length})
// //               </h2>
// //               <p className="text-gray-600 mt-1">
// //                 Click on a board to open it
// //               </p>
// //             </div>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
// //               {safeBoards.map((board) => (
// //                 <div
// //                   key={board.id}
// //                   onClick={() => handleBoardClick(board.id, board.title)}
// //                   className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
// //                 >
// //                   <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-48 relative">
// //                     {/* Background overlay */}
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
// //                     {/* Content */}
// //                     <div className="h-full p-5 flex flex-col justify-end relative z-10">
// //                       <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
// //                         {board.title}
// //                       </h3>
// //                       {board.description && (
// //                         <p className="text-blue-100 text-sm line-clamp-2">
// //                           {board.description}
// //                         </p>
// //                       )}
                      
// //                       {/* Stats */}
// //                       <div className="flex justify-between items-center mt-4 text-blue-100 text-sm">
// //                         <div className="flex items-center gap-1">
// //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
// //                           </svg>
// //                           <span>{board.lists?.length || 0} lists</span>
// //                         </div>
// //                         <div className="flex items-center gap-1">
// //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                           </svg>
// //                           <span>{new Date(board.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
              
// //               {/* Add New Board Card */}
// //               <div
// //                 onClick={() => setShowCreateForm(true)}
// //                 className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
// //               >
// //                 <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-48 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50">
// //                   <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
// //                     <svg
// //                       className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M12 4v16m8-8H4"
// //                       />
// //                     </svg>
// //                   </div>
// //                   <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">
// //                     Add New Board
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }





// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import Link from 'next/link';
// // // import { useSearchParams, useRouter } from 'next/navigation';
// // // import { Board } from '@/types/board';
// // // import { Workspace } from '@/types/workspace';
// // // import { mockWorkspaces, mockBoards } from '@/lib/mockData';
// // // import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';


// // // export default function BoardsPage() {
// // //   const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
// // //   const [boards, setBoards] = useState<Board[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [showCreate, setShowCreate] = useState(false);
// // //   const [createWorkspaceId, setCreateWorkspaceId] = useState<string | null>(null);
// // //   const [createWorkspaceName, setCreateWorkspaceName] = useState<string | undefined>(undefined);

// // //   const searchParams = useSearchParams();
// // //   const router = useRouter();
// // //   const { createBoard, boards: trelloBoards } = useBoards(); // Get createBoard from useBoards

// // //   useEffect(() => {
// // //     // Simulate loading data
// // //     const loadData = async () => {
// // //       setIsLoading(true);
// // //       await new Promise(resolve => setTimeout(resolve, 400));
// // //       setWorkspaces(mockWorkspaces);
// // //       setBoards(mockBoards);
// // //       setIsLoading(false);
// // //     };

// // //     loadData();
// // //   }, []);

// // //   // Open create modal when ?workspace= is present
// // //   useEffect(() => {
// // //     const ws = searchParams?.get('workspace');
// // //     if (ws) {
// // //       const found = mockWorkspaces.find(w => w.id === ws);
// // //       setCreateWorkspaceId(ws);
// // //       setCreateWorkspaceName(found?.name);
// // //       setShowCreate(true);
// // //     }
// // //   }, [searchParams]);

// // //   const handleCloseCreate = () => {
// // //     setShowCreate(false);
// // //     // remove query param to avoid reopening on refresh
// // //     router.push('/boards');
// // //   };

// // //   const handleCreateBoard = async (data: { title: string; description?: string; background?: string; workspaceId: string }) => {
// // //     try {
// // //       console.log('Creating board with data:', data);
      
// // //       if (!createBoard) {
// // //         console.error('createBoard function is not available');
// // //         return;
// // //       }

// // //       const newBoard = await createBoard({
// // //         title: data.title,
// // //         name: data.title,
// // //         description: data.description,
// // //         background: data.background,
// // //         workspaceId: data.workspaceId,
// // //         lists: [] // Start with empty lists
// // //       });

// // //       console.log('Board created successfully:', newBoard);
      
// // //       // Navigate to the new board using Trello-style public URL
// // //       const slugify = (s: string) =>
// // //         s
// // //           .toLowerCase()
// // //           .replace(/[^a-z0-9]+/g, '-')
// // //           .replace(/(^-|-$)/g, '')
// // //           .slice(0, 50);

// // //       const slug = slugify(newBoard.title || 'board');
// // //       router.push(`/b/${newBoard.id}/${slug}`);
// // //     } catch (err) {
// // //       console.error('Failed to create board', err);
// // //     }
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //       </div>
// // //     );
// // //   }

// // //   // Combine mock boards and trello boards
// // //   const allBoards = [...boards, ...trelloBoards].filter((board, index, self) => 
// // //     index === self.findIndex(b => b.id === board.id)
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <div className="mb-8">
// // //           <h1 className="text-3xl font-bold text-gray-900">All Boards</h1>
// // //           <p className="text-gray-600 mt-2">Browse all boards across your workspaces</p>
// // //         </div>

// // //         {allBoards.length === 0 ? (
// // //           <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
// // //             <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// // //             </svg>
// // //             <p className="text-gray-600 mb-4">No boards yet.</p>
// // //             <Link 
// // //               href="/workspace/create"
// // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// // //             >
// // //               Create Your First Workspace
// // //             </Link>
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // //             {allBoards.map(board => {
// // //               const workspace = workspaces.find(ws => ws.id === board.workspaceId);
// // //               return (
// // //                 <Link
// // //                   key={board.id}
// // //                   href={`/b/${board.id}/${board.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`}
// // //                   className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow block"
// // //                 >
// // //                   <div className={`h-3 rounded-t-lg mb-3 ${
// // //                     board.background === 'blue' ? 'bg-blue-500' :
// // //                     board.background === 'green' ? 'bg-green-500' :
// // //                     board.background === 'red' ? 'bg-red-500' :
// // //                     board.background === 'purple' ? 'bg-purple-500' :
// // //                     board.background === 'orange' ? 'bg-orange-500' :
// // //                     board.background === 'pink' ? 'bg-pink-500' :
// // //                     'bg-blue-500'
// // //                   }`} />
// // //                   <h4 className="font-semibold text-gray-900 mb-2 truncate">{board.title}</h4>
// // //                   {board.description && (
// // //                     <p className="text-gray-600 text-sm mb-2 line-clamp-2">{board.description}</p>
// // //                   )}
// // //                   <div className="flex items-center justify-between text-xs text-gray-500">
// // //                     <span>{workspace?.name || 'Workspace'}</span>
// // //                     <span>{board.lists?.length || 0} lists</span>
// // //                   </div>
// // //                 </Link>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <CreateBoardForm
// // //         isOpen={showCreate}
// // //         onClose={handleCloseCreate}
// // //         onSubmit={handleCreateBoard}
// // //         workspaceId={createWorkspaceId || ''}
// // //         workspaceName={createWorkspaceName}
// // //       />
// // //     </div>
// // //   );
// // // }





