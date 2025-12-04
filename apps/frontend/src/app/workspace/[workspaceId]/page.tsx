'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Loader2, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const { currentWorkspace, isLoading, error, loadWorkspaceById } = useWorkspace();

  useEffect(() => {
    if (workspaceId) {
      loadWorkspaceById(workspaceId);
    }
  }, [workspaceId, loadWorkspaceById]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !currentWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Workspace not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The workspace does not exist'}</p>
          <Link href="/workspace" className="inline-flex items-center gap-2 text-blue-600">
            <ArrowLeft className="w-4 h-4" /> Back to workspaces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/workspace" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to all workspaces
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkspaceHeader workspace={currentWorkspace} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Boards</h2>
              <p className="text-gray-600 text-sm mt-1">All boards in this workspace</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="w-4 h-4" /> Create Board
            </button>
          </div>

          {currentWorkspace.boardCount > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 flex flex-col justify-between cursor-pointer">
                <div className="text-white font-semibold">Product Roadmap</div>
                <div className="text-white/80 text-sm">5 lists, 32 cards</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-6H7v-2h4v4zm0-6H7V7h4v4zm6 12h-4v-2h4v2zm0-6h-4v-2h4v2zm0-6h-4V7h4v4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No boards yet</h3>
              <p className="text-gray-600 mb-6">Create your first board to start organizing your work</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Board
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}









// // src/app/workspace/[workspaceId]/page.tsx
// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useAppStore } from '@/store/useAppStore';

// export default function WorkspaceDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const workspaceId = params.workspaceId as string;
  
//   // SOLUTION: Get store data once and compute locally
//   const storeWorkspaces = useAppStore((state) => state.workspaces);
//   const storeBoards = useAppStore((state) => state.boards);
//   const createBoard = useAppStore((state) => state.createBoard);
  
//   // Compute derived values locally (NO store selectors)
//   const workspace = useMemo(() => 
//     storeWorkspaces.find((w) => w.id === workspaceId),
//     [storeWorkspaces, workspaceId]
//   );
  
//   const workspaceBoards = useMemo(() => 
//     storeBoards.filter((b) => b.workspaceId === workspaceId),
//     [storeBoards, workspaceId]
//   );
  
//   const [showCreateBoard, setShowCreateBoard] = useState(false);
//   const [boardName, setBoardName] = useState('');

//   const handleCreateBoard = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!boardName.trim() || !workspace) return;
    
//     createBoard({
//       name: boardName.trim(),
//       workspaceId: workspace.id,
//     });
    
//     setBoardName('');
//     setShowCreateBoard(false);
//   };

//   if (!workspace) {
//     return (
//       <div className="min-h-screen p-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-2xl font-bold">Workspace not found</h1>
//           <p>The workspace you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Workspace Header */}
//         <div className="bg-white rounded-lg border p-6 mb-6">
//           <div className="flex items-center gap-4 mb-4">
//             <div
//               className="w-12 h-12 rounded-lg"
//               style={{ backgroundColor: workspace.color }}
//             />
//             <div>
//               <h1 className="text-2xl font-bold">{workspace.name}</h1>
//               {workspace.description && (
//                 <p className="text-gray-600">{workspace.description}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Boards Section */}
//         <div className="bg-white rounded-lg border p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">Boards</h2>
//             <button
//               onClick={() => setShowCreateBoard(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               + Create Board
//             </button>
//           </div>

//           {/* Create Board Form */}
//           {showCreateBoard && (
//             <form onSubmit={handleCreateBoard} className="mb-6 p-4 bg-gray-100 rounded">
//               <input
//                 type="text"
//                 value={boardName}
//                 onChange={(e) => setBoardName(e.target.value)}
//                 placeholder="Board name"
//                 className="w-full p-2 border rounded mb-3"
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//                   Create
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateBoard(false)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Boards List */}
//           {workspaceBoards.length === 0 ? (
//             <p className="text-gray-600">No boards yet. Create your first board.</p>
//           ) : (
//             <div className="space-y-3">
//               {workspaceBoards.map((board) => (
//                 <div
//                   key={board.id}
//                   className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
//                   onClick={() => router.push(`/board/${board.id}`)}
//                 >
//                   <h3 className="font-semibold">{board.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     Created {new Date(board.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








