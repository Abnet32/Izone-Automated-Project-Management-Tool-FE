'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WorkspaceHeader } from '@/components/workspaces/WorkspaceHeader';
import { BoardCard } from '@/components/workspaces/BoardCard';
import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useBoard } from '@/hooks/useBoard';
import { Workspace, Board } from '@/types';

export default function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
  const resolvedParams = use(params);
  const workspaceId = resolvedParams.workspaceId;
  const router = useRouter();
  
  const { 
    workspace, 
    isLoading: workspaceLoading, 
    updateWorkspace,
    error: workspaceError 
  } = useWorkspace(workspaceId);
  
  const { 
    boards, 
    createBoard, 
    updateBoard, 
    deleteBoard,
    isLoading: boardsLoading 
  } = useBoard();
  
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [workspaceBoards, setWorkspaceBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (workspace && boards.length > 0) {
      const filteredBoards = boards.filter(board => board.workspaceId === workspaceId);
      // sort by newest first so recent boards appear first
      const sorted = filteredBoards
        .slice()
        .sort((a, b) => (b.createdAt?.valueOf ? (b.createdAt as any).valueOf() - (a.createdAt as any).valueOf() : 0));

      // Remove duplicates using Map
      const uniqueBoards = Array.from(
        new Map(sorted.map(board => [board.id, board])).values()
      );

      setWorkspaceBoards(uniqueBoards);
    }
  }, [workspace, boards, workspaceId]);

  const handleCreateBoard = async (boardData: { title: string; description?: string; background?: string; workspaceId: string }) => {
    console.log('Creating board with data:', boardData);
    
    try {
      const newBoard = await createBoard({
        ...boardData,
        workspaceId: workspaceId,
      });
      
      console.log('Board created successfully:', newBoard);
      // Redirect to Trello-style public board URL (/b/:id/:slug)
      const slugify = (s: string) =>
        s
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 50);

      const slug = slugify(newBoard.title || 'board');
      router.push(`/b/${newBoard.id}/${slug}`);
      setShowCreateBoard(false);
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleUpdateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
    try {
      await updateWorkspace(workspaceId, updates);
    } catch (error) {
      console.error('Failed to update workspace:', error);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await deleteBoard(boardId);
    } catch (error) {
      console.error('Failed to delete board:', error);
    }
  };

  const handleUpdateBoard = async (boardId: string, updates: Partial<Board>) => {
    try {
      await updateBoard(boardId, updates);
    } catch (error) {
      console.error('Failed to update board:', error);
    }
  };

  if (workspaceLoading || boardsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (workspaceError || !workspace) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Not Found</h1>
          <p className="text-gray-600 mb-4">The workspace you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkspaceHeader 
          workspace={workspace} 
          onUpdateWorkspace={handleUpdateWorkspace}
        />
        
        {/* Boards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Boards</h2>
              <p className="text-gray-600 mt-1">
                {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} in this workspace
              </p>
            </div>
            
            <button 
              onClick={() => {
                console.log('Create Board button clicked');
                setShowCreateBoard(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Board
            </button>
          </div>

          {workspaceBoards.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No boards yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first board to start organizing your tasks and projects in {workspace.name}.
              </p>
              <button 
                onClick={() => {
                  console.log('Create First Board button clicked');
                  setShowCreateBoard(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Board
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workspaceBoards.map(board => (
                <BoardCard
                  key={board.id}
                  board={board}
                  workspaceId={workspaceId}
                  onDeleteBoard={handleDeleteBoard}
                  onUpdateBoard={handleUpdateBoard}
                />
              ))}
            </div>
          )}
        </div>

        {/* Workspace Members Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h3>
          <div className="flex items-center gap-3">
            {workspace.members.map((memberId, index) => (
              <div key={memberId} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-sm text-gray-700">User {index + 1}</span>
              </div>
            ))}
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CreateBoardForm
        isOpen={showCreateBoard}
        onClose={() => {
          console.log('Closing Create Board modal');
          setShowCreateBoard(false);
        }}
        onSubmit={handleCreateBoard}
        workspaceId={workspaceId}
        workspaceName={workspace.name}
      />
    </div>
  );
}



// 'use client';

// import { useState, useEffect } from 'react';
// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { WorkspaceHeader } from '@/components/workspaces/WorkspaceHeader';
// import { BoardCard } from '@/components/workspaces/BoardCard';
// import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';
// import { useWorkspace } from '@/hooks/useWorkspace';
// import { useBoard } from '@/hooks/useBoard';
// import { Workspace, Board } from '@/types';

// export default function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
//   const resolvedParams = use(params);
//   const workspaceId = resolvedParams.workspaceId;
//   const router = useRouter();
  
//   const { 
//     workspace, 
//     isLoading: workspaceLoading, 
//     updateWorkspace,
//     error: workspaceError 
//   } = useWorkspace(workspaceId);
  
//   const { 
//     boards, 
//     createBoard, 
//     updateBoard, 
//     deleteBoard,
//     isLoading: boardsLoading 
//   } = useBoard();
  
//   const [showCreateBoard, setShowCreateBoard] = useState(false);
//   const [workspaceBoards, setWorkspaceBoards] = useState<Board[]>([]);

//   useEffect(() => {
//     if (workspace && boards.length > 0) {
//       const filteredBoards = boards.filter(board => board.workspaceId === workspaceId);
      
//       // Remove duplicates using Set to fix the duplicate key error
//       const uniqueBoards = Array.from(
//         new Map(filteredBoards.map(board => [board.id, board])).values()
//       );
      
//       setWorkspaceBoards(uniqueBoards);
//     }
//   }, [workspace, boards, workspaceId]);

//   const handleCreateBoard = async (boardData: { title: string; description?: string; background?: string; workspaceId: string }) => {
//     console.log('Creating board with data:', boardData);
    
//     try {
//       const newBoard = await createBoard({
//         ...boardData,
//         workspaceId: workspaceId,
//       });
      
//       console.log('Board created successfully:', newBoard);
      
//       // Redirect to the newly created board
//       router.push(`/board/${newBoard.id}`);
//       setShowCreateBoard(false);
//     } catch (error) {
//       console.error('Failed to create board:', error);
//     }
//   };

//   const handleUpdateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
//     try {
//       await updateWorkspace(workspaceId, updates);
//     } catch (error) {
//       console.error('Failed to update workspace:', error);
//     }
//   };

//   const handleDeleteBoard = async (boardId: string) => {
//     try {
//       await deleteBoard(boardId);
//     } catch (error) {
//       console.error('Failed to delete board:', error);
//     }
//   };

//   const handleUpdateBoard = async (boardId: string, updates: Partial<Board>) => {
//     try {
//       await updateBoard(boardId, updates);
//     } catch (error) {
//       console.error('Failed to update board:', error);
//     }
//   };

//   if (workspaceLoading || boardsLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (workspaceError || !workspace) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Not Found</h1>
//           <p className="text-gray-600 mb-4">The workspace you're looking for doesn't exist.</p>
//           <Link 
//             href="/dashboard" 
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <WorkspaceHeader 
//           workspace={workspace} 
//           onUpdateWorkspace={handleUpdateWorkspace}
//         />
        
//         {/* Boards Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Boards</h2>
//               <p className="text-gray-600 mt-1">
//                 {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} in this workspace
//               </p>
//             </div>
            
//             {/* ✅ FIXED: This button should open the Create Board modal */}
//             <button 
//               onClick={() => {
//                 console.log('Create Board button clicked');
//                 setShowCreateBoard(true);
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Create Board {/* ✅ FIXED: Changed from "Create Workspace" to "Create Board" */}
//             </button>
//           </div>

//           {workspaceBoards.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
//               <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//               </svg>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">No boards yet</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 Create your first board to start organizing your tasks and projects in {workspace.name}.
//               </p>
//               <button 
//                 onClick={() => {
//                   console.log('Create First Board button clicked');
//                   setShowCreateBoard(true);
//                 }}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Create Your First Board
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {workspaceBoards.map(board => (
//                 <BoardCard
//                   key={board.id}
//                   board={board}
//                   workspaceId={workspaceId}
//                   onDeleteBoard={handleDeleteBoard}
//                   onUpdateBoard={handleUpdateBoard}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Workspace Members Section */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h3>
//           <div className="flex items-center gap-3">
//             {workspace.members.map((memberId, index) => (
//               <div key={memberId} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
//                   {String.fromCharCode(65 + index)}
//                 </div>
//                 <span className="text-sm text-gray-700">User {index + 1}</span>
//               </div>
//             ))}
//             <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Create Board Form Modal - This should appear when showCreateBoard is true */}
//       <CreateBoardForm
//         isOpen={showCreateBoard}
//         onClose={() => {
//           console.log('Closing Create Board modal');
//           setShowCreateBoard(false);
//         }}
//         onSubmit={handleCreateBoard}
//         workspaceId={workspaceId}
//         workspaceName={workspace.name}
//       />
//     </div>
//   );
// }


// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { use } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { WorkspaceHeader } from '@/components/workspaces/WorkspaceHeader';
// // import { BoardCard } from '@/components/workspaces/BoardCard';
// // import { CreateBoardForm } from '@/components/workspaces/CreateBoardForm';
// // import { useWorkspace } from '@/hooks/useWorkspace';
// // import { useBoard } from '@/hooks/useBoard';
// // import { Workspace, Board } from '@/types';

// // export default function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
// //   const resolvedParams = use(params);
// //   const workspaceId = resolvedParams.workspaceId;
// //   const router = useRouter();
  
// //   const { 
// //     workspace, 
// //     isLoading: workspaceLoading, 
// //     updateWorkspace,
// //     error: workspaceError 
// //   } = useWorkspace(workspaceId);
  
// //   const { 
// //     boards, 
// //     createBoard, 
// //     updateBoard, 
// //     deleteBoard,
// //     isLoading: boardsLoading 
// //   } = useBoard();
  
// //   const [showCreateBoard, setShowCreateBoard] = useState(false);
// //   const [workspaceBoards, setWorkspaceBoards] = useState<Board[]>([]);

// //   useEffect(() => {
// //     if (workspace && boards.length > 0) {
// //       const filteredBoards = boards.filter(board => board.workspaceId === workspaceId);
      
// //       // Remove duplicates using Set to fix the duplicate key error
// //       const uniqueBoards = Array.from(
// //         new Map(filteredBoards.map(board => [board.id, board])).values()
// //       );
      
// //       setWorkspaceBoards(uniqueBoards);
// //     }
// //   }, [workspace, boards, workspaceId]);

// //   const handleCreateBoard = async (boardData: { title: string; description?: string; background?: string; workspaceId: string }) => {
// //     try {
// //       const newBoard = await createBoard({
// //         ...boardData,
// //         workspaceId: workspaceId,
// //       });
      
// //       // ✅ Fix: Redirect to /board/board-id instead of /workspace/workspaceId/board/board-id
// //       router.push(`/board/${newBoard.id}`);
// //       setShowCreateBoard(false);
// //     } catch (error) {
// //       console.error('Failed to create board:', error);
// //     }
// //   };

// //   const handleUpdateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
// //     try {
// //       await updateWorkspace(workspaceId, updates);
// //     } catch (error) {
// //       console.error('Failed to update workspace:', error);
// //     }
// //   };

// //   const handleDeleteBoard = async (boardId: string) => {
// //     try {
// //       await deleteBoard(boardId);
// //     } catch (error) {
// //       console.error('Failed to delete board:', error);
// //     }
// //   };

// //   const handleUpdateBoard = async (boardId: string, updates: Partial<Board>) => {
// //     try {
// //       await updateBoard(boardId, updates);
// //     } catch (error) {
// //       console.error('Failed to update board:', error);
// //     }
// //   };

// //   if (workspaceLoading || boardsLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   if (workspaceError || !workspace) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Not Found</h1>
// //           <p className="text-gray-600 mb-4">The workspace you're looking for doesn't exist.</p>
// //           <Link 
// //             href="/dashboard" 
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Back to Dashboard
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <WorkspaceHeader 
// //           workspace={workspace} 
// //           onUpdateWorkspace={handleUpdateWorkspace}
// //         />
        
// //         {/* Boards Section */}
// //         <div className="mb-8">
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900">Boards</h2>
// //               <p className="text-gray-600 mt-1">
// //                 {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} in this workspace
// //               </p>
// //             </div>
// //             <button 
// //               onClick={() => setShowCreateBoard(true)}
// //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
// //             >
// //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //               </svg>
// //               Create Board
// //             </button>
// //           </div>

// //           {workspaceBoards.length === 0 ? (
// //             <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
// //               <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// //               </svg>
// //               <h3 className="text-xl font-medium text-gray-900 mb-2">No boards yet</h3>
// //               <p className="text-gray-500 mb-6 max-w-md mx-auto">
// //                 Create your first board to start organizing your tasks and projects in {workspace.name}.
// //               </p>
// //               <button 
// //                 onClick={() => setShowCreateBoard(true)}
// //                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                 </svg>
// //                 Create Your First Board
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {workspaceBoards.map(board => (
// //                 <BoardCard
// //                   key={board.id}
// //                   board={board}
// //                   workspaceId={workspaceId}
// //                   onDeleteBoard={handleDeleteBoard}
// //                   onUpdateBoard={handleUpdateBoard}
// //                 />
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Workspace Members Section */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h3>
// //           <div className="flex items-center gap-3">
// //             {workspace.members.map((memberId, index) => (
// //               <div key={memberId} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
// //                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
// //                   {String.fromCharCode(65 + index)}
// //                 </div>
// //                 <span className="text-sm text-gray-700">User {index + 1}</span>
// //               </div>
// //             ))}
// //             <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <CreateBoardForm
// //         isOpen={showCreateBoard}
// //         onClose={() => setShowCreateBoard(false)}
// //         onSubmit={handleCreateBoard}
// //         workspaceId={workspaceId}
// //         workspaceName={workspace.name}
// //       />
// //     </div>
// //   );
// // }



