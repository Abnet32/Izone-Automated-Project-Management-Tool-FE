"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBoardStore } from "@/store/board.store";
import BoardList from "@/components/board/BoardList";

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = params.boardId as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);
  
  const board = useBoardStore((state) => state.getBoard(boardId));
  const addList = useBoardStore((state) => state.addList);
  const updateBoard = useBoardStore((state) => state.updateBoard);

  useEffect(() => {
    if (boardId) {
      setIsLoading(false);
    }
  }, [boardId]);

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(boardId, newListTitle.trim());
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  const handleUpdateBoardName = (newName: string) => {
    if (board && newName.trim() && newName !== board.name) {
      updateBoard(boardId, { name: newName.trim() });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Loading board...</h2>
          <p className="text-gray-500">Please wait while we load your board.</p>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Board not found</h2>
          <p className="text-gray-500 mb-6">The board you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/workspaces")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Workspaces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ 
        backgroundColor: board.background === 'blue' ? '#1d4ed8' :
                        board.background === 'green' ? '#059669' :
                        board.background === 'purple' ? '#7c3aed' :
                        board.background === 'red' ? '#dc2626' :
                        board.background === 'orange' ? '#ea580c' :
                        board.background === 'teal' ? '#0d9488' : '#1d4ed8'
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        {/* Board Header */}
        <div className="mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{board.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>{board.lists.length} lists</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/workspaces")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Workspaces
              </button>
            </div>
          </div>
        </div>

        {/* Lists Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-200px)]">
          {board.lists.map((list) => (
            <BoardList
              key={list.id}
              boardId={board.id}
              list={list}
            />
          ))}
          
          {/* Create New List */}
          <div className="w-80 flex-shrink-0">
            {isAddingList ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Enter list title..."
                  className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddList();
                    if (e.key === "Escape") {
                      setIsAddingList(false);
                      setNewListTitle("");
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddList}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex-1"
                  >
                    Add list
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingList(false);
                      setNewListTitle("");
                    }}
                    className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingList(true)}
                className="w-full h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors duration-200 border border-dashed border-white/30 hover:border-white/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another list
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import { useParams } from 'next/navigation';
// import { useBoard } from '@/hooks/useBoard';
// import { useBoards } from '@/hooks/useBoards';
// import ListContainer from '@/components/board/ListContainer';

// export default function BoardPage() {
//   const params = useParams();
//   const boardId = params.boardId as string;
  
//   const { board, isLoading, error } = useBoard(boardId);
//   const { 
//     addListToBoard, 
//     addCardToList, 
//     updateCard, 
//     toggleCardLabel 
//   } = useBoards();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error || !board) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Board not found</h1>
//           <p className="text-gray-600 mb-4">{error || 'The board you\'re looking for doesn\'t exist.'}</p>
//           <button
//             onClick={() => window.history.back()}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ListContainer
//         board={board}
//         onAddList={addListToBoard}
//         onAddCard={addCardToList}
//         onUpdateCard={updateCard}
//         onLabelToggle={toggleCardLabel}
//       />
//     </div>
//   );
// }










// 'use client';

// import { use } from 'react';
// import { useBoard } from '@/hooks/useBoard';
// import { BoardHeader } from '@/components/board/BoardHeader';
// import ListContainer from '@/components/board/ListContainer';
// import { BoardWithDetails } from '@/types/board';

// interface BoardPageProps {
//   params: Promise<{
//     boardId: string;
//     slug: string;
//   }>;
// }

// export default function BoardPage({ params }: BoardPageProps) {
//   const resolvedParams = use(params);
//   const boardId = resolvedParams.boardId;
  
//   const { board, isLoading, error, refetch } = useBoard(boardId);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (error || !board) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center text-white">
//           <h1 className="text-2xl font-bold mb-2">Board Not Found</h1>
//           <p className="text-gray-300">The board you're looking for doesn't exist.</p>
//           <p className="text-gray-400 text-sm mt-2">Board ID: {boardId}</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Convert board to project format for BoardHeader
//   const project = {
//     ...board,
//     title: board.title || 'Untitled Board',
//     background: board.background || 'blue',
//     description: board.description,
//     visibility: 'private' as const,
//     isFavorite: false,
//     lastActivity: new Date().toISOString(),
//     createdAt: board.createdAt || new Date().toISOString(),
//     updatedAt: board.updatedAt || new Date().toISOString(),
//   };

//   return (
//     <div 
//       className="min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{
//         background: project.background?.includes('gradient') 
//           ? project.background === 'gradient-blue' 
//             ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
//             : 'linear-gradient(135deg, #10B981, #047857)'
//           : project.background === 'blue' ? '#3B82F6' :
//             project.background === 'green' ? '#10B981' :
//             project.background === 'red' ? '#EF4444' :
//             project.background === 'purple' ? '#8B5CF6' :
//             project.background === 'orange' ? '#F59E0B' :
//             project.background === 'pink' ? '#EC4899' : '#3B82F6'
//       }}
//     >
//       <BoardHeader 
//         project={project}  // ✅ Pass as project prop
//         onUpdateBackground={(background) => {
//           // Handle background update if needed
//         }}
//       />
//       <ListContainer board={board as BoardWithDetails} onRefresh={refetch} />
//     </div>
//   );
// }