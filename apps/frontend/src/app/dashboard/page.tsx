'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Workspace, Board } from '@/types';
import { mockWorkspaces, mockBoards } from '@/lib/mockData';

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track current user id (read from localStorage). Keep hooks at top level so
  // their order never changes across renders (avoids React hooks order errors).
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWorkspaces(mockWorkspaces);
      setBoards(mockBoards);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Read current user from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        setCurrentUserId(parsed?.id || parsed?.userId || null);
      } else {
        setCurrentUserId(null);
      }
    } catch (e) {
      setCurrentUserId(null);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  // Only include workspaces owned by the current user (boards the user created).
  // If there's no signed-in user, show no workspaces so the list remains empty
  // (this removes the example 'Web Development' card when not signed in).
  const userWorkspaces = currentUserId
    ? workspaces.filter(ws => ws.ownerId === currentUserId)
    : [];

  const primaryWorkspace = userWorkspaces[0];
  const primaryBoards = primaryWorkspace ? boards.filter(b => b.workspaceId === primaryWorkspace.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Workspaces</h1>
          <p className="text-gray-600 mt-2">Manage your projects and collaborate with your team</p>
        </div>

        {/* Show primary workspace header and its boards (only for workspaces owned by the user) */}
        <div className="mb-8">
          {primaryWorkspace ? (
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold bg-blue-100 text-blue-700">
                  {primaryWorkspace.name.split(' ').map(s => s[0]).slice(0,2).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{primaryWorkspace.name}</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span>{primaryWorkspace.members.length} members</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">Premium</span>
                    <span className="text-xs text-gray-500">Private</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href={`/workspace/${primaryWorkspace.id}`} className="text-sm text-blue-600 hover:underline">View workspace</Link>
              </div>
            </div>
          ) : (
            // If the user doesn't own any workspace, hide the workspace card entirely
            null
          )}
        </div>

        {/* Your boards - show boards for the primary workspace */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your boards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {primaryBoards.map(board => (
              <Link
                key={board.id}
                href={`/b/${board.id}/${(board.title || 'board').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0,50)}`}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200"
              >
                <div className={`h-20 ${
                  board.background === 'blue' ? 'bg-linear-to-r from-blue-400 to-blue-600' :
                  board.background === 'green' ? 'bg-linear-to-r from-green-400 to-green-600' :
                  board.background === 'red' ? 'bg-linear-to-r from-red-400 to-red-600' :
                  board.background === 'purple' ? 'bg-linear-to-r from-purple-400 to-purple-600' :
                  board.background === 'orange' ? 'bg-linear-to-r from-orange-400 to-orange-600' :
                  board.background === 'pink' ? 'bg-linear-to-r from-pink-400 to-pink-600' :
                  'bg-linear-to-r from-gray-200 to-gray-300'
                }`} />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{board.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{board.description}</p>
                </div>
              </Link>
            ))}

            {/* Create new board card */}
            {primaryWorkspace && (
              <Link
                href={`/workspace/${primaryWorkspace.id}/board/create`}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white h-36 hover:border-gray-400 transition-colors text-center p-4"
              >
                <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-sm text-gray-700">Create new board</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



// // app/dashboard/page.tsx
// 'use client';

// import { useWorkspaces } from "@/hooks/workspaces/use-workspaces";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Plus, Settings } from "lucide-react";
// import Link from "next/link";

// // AvatarGroup component for member avatars
// function AvatarGroup({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex -space-x-2">
//       {children}
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const { workspaces } = useWorkspaces();

//   // Calculate total tasks across all workspaces
//   const totalTasks = workspaces.reduce((total, ws) => {
//     const workspaceTasks = ws.boards.reduce((boardTotal, board) => {
//       const boardTasks = board.lists.reduce((listTotal, list) => {
//         return listTotal + list.cards.length;
//       }, 0);
//       return boardTotal + boardTasks;
//     }, 0);
//     return total + workspaceTasks;
//   }, 0);

//   // Calculate total boards
//   const totalBoards = workspaces.reduce((total, ws) => total + ws.boards.length, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Your Workspaces</h1>
//               <p className="text-gray-600 mt-2">Manage your projects and teams</p>
//             </div>
//             <Button className="bg-blue-600 hover:bg-blue-700">
//               <Plus className="w-4 h-4 mr-2" />
//               New Workspace
//             </Button>
//           </div>
//         </div>

//         {/* Workspaces Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {workspaces.map(workspace => {
//             const workspaceTotalTasks = workspace.boards.reduce((total, board) => {
//               return total + board.lists.reduce((listTotal, list) => {
//                 return listTotal + list.cards.length;
//               }, 0);
//             }, 0);

//             return (
//               <Card key={workspace.id} className="cursor-pointer hover:shadow-lg transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div 
//                         className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
//                         style={{ backgroundColor: workspace.color + '20', color: workspace.color }}
//                       >
//                         {workspace.emoji}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
//                         <p className="text-sm text-gray-600">{workspace.boards.length} boards</p>
//                       </div>
//                     </div>
//                     <Button variant="ghost" size="sm">
//                       <Settings className="w-4 h-4" />
//                     </Button>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {workspace.description}
//                   </p>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <AvatarGroup>
//                         {workspace.members.slice(0, 3).map(member => (
//                           <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
//                             <AvatarImage src={member.avatar} />
//                             <AvatarFallback className="text-xs bg-gray-200">
//                               {member.name.split(' ').map(n => n[0]).join('')}
//                             </AvatarFallback>
//                           </Avatar>
//                         ))}
//                       </AvatarGroup>
//                       {workspace.members.length > 3 && (
//                         <span className="text-xs text-gray-500">
//                           +{workspace.members.length - 3}
//                         </span>
//                       )}
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {workspaceTotalTasks} tasks
//                     </span>
//                   </div>

//                   {/* Board Links */}
//                   <div className="mt-4 space-y-2">
//                     {workspace.boards.map(board => (
//                       <Link 
//                         key={board.id}
//                         href={`/board/${board.id}`}
//                         className="block text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded transition-colors"
//                       >
//                         {board.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}

//           {/* Create New Workspace Card */}
//           <Card className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
//             <CardContent className="flex flex-col items-center justify-center h-64 gap-3">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//                 <Plus className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="font-semibold text-gray-700 group-hover:text-blue-700">
//                 Create New Workspace
//               </h3>
//               <p className="text-sm text-gray-500 text-center">
//                 Start organizing your projects with a new workspace
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Stats Section */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold text-blue-600">{workspaces.length}</div>
//               <div className="text-gray-600">Workspaces</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold text-green-600">{totalBoards}</div>
//               <div className="text-gray-600">Total Boards</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold text-purple-600">{totalTasks}</div>
//               <div className="text-gray-600">Total Tasks</div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }




// // 'use client';

// // import { useWorkspaces } from '@/hooks/workspaces/use-workspaces';
// // import { useRouter } from 'next/navigation';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { AvatarGroup } from '@/components/ui/avatar-group';
// // import { Plus, Settings } from 'lucide-react';
// // import { Button } from '@/components/ui/button';

// // export default function DashboardPage() {
// //   const { workspaces } = useWorkspaces();
// //   const router = useRouter();

// //   // Calculate total stats across all workspaces
// //   const totalBoards = workspaces.reduce((total, ws) => total + ws.boards.length, 0);
// //   const totalTasks = workspaces.reduce((total, ws) => 
// //     total + ws.boards.reduce((boardTotal, board) => 
// //       boardTotal + board.columns.reduce((colTotal, col) => colTotal + col.tasks.length, 0), 0
// //     ), 0
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
// //       {/* Header */}
// //       <div className="max-w-7xl mx-auto mb-8">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">Your Workspaces</h1>
// //             <p className="text-gray-600 mt-2">Manage all your projects and teams</p>
// //           </div>
// //           <div className="flex items-center gap-4 text-sm text-gray-600">
// //             <div className="text-center">
// //               <div className="text-2xl font-bold text-blue-600">{workspaces.length}</div>
// //               <div>Workspaces</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="text-2xl font-bold text-green-600">{totalBoards}</div>
// //               <div>Boards</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="text-2xl font-bold text-purple-600">{totalTasks}</div>
// //               <div>Tasks</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Workspaces Grid */}
// //       <div className="max-w-7xl mx-auto">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {/* Create New Workspace Card */}
// //           <Card className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
// //             <CardContent className="flex flex-col items-center justify-center h-40 gap-3">
// //               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //                 <Plus className="w-6 h-6 text-blue-600" />
// //               </div>
// //               <h3 className="font-semibold text-gray-700">Create Workspace</h3>
// //               <p className="text-sm text-gray-500 text-center">Organize your boards</p>
// //             </CardContent>
// //           </Card>

// //           {/* Workspace Cards */}
// //           {workspaces.map(workspace => {
// //             const totalTasks = workspace.boards.reduce((total, board) => 
// //               total + board.columns.reduce((colTotal, col) => colTotal + col.tasks.length, 0), 0
// //             );

// //             return (
// //               <Card
// //                 key={workspace.id}
// //                 className="cursor-pointer hover:shadow-lg transition-all duration-300 group border border-gray-200"
// //                 onClick={() => router.push(`/boards?workspace=${workspace.id}`)}
// //               >
// //                 <CardContent className="p-0">
// //                   {/* Workspace Header */}
// //                   <div 
// //                     className="h-4 rounded-t-lg"
// //                     style={{ backgroundColor: workspace.color }}
// //                   />
// //                   <div className="p-4">
// //                     <div className="flex items-start justify-between mb-3">
// //                       <div className="flex items-center gap-3">
// //                         <div 
// //                           className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
// //                           style={{ backgroundColor: workspace.color + '20' }}
// //                         >
// //                           {workspace.emoji}
// //                         </div>
// //                         <div>
// //                           <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
// //                             {workspace.name}
// //                           </h3>
// //                           <p className="text-sm text-gray-500">{workspace.description}</p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Workspace Stats */}
// //                     <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
// //                       <span>{workspace.boards.length} boards</span>
// //                       <span>{totalTasks} tasks</span>
// //                     </div>

// //                     {/* Members */}
// //                     <div className="flex items-center justify-between">
// //                       <AvatarGroup>
// //                         {workspace.members.slice(0, 4).map(member => (
// //                           <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
// //                             <AvatarImage src={member.avatar} />
// //                             <AvatarFallback className="text-xs bg-gray-200">
// //                               {member.name.split(' ').map(n => n[0]).join('')}
// //                             </AvatarFallback>
// //                           </Avatar>
// //                         ))}
// //                         {workspace.members.length > 4 && (
// //                           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white text-gray-600">
// //                             +{workspace.members.length - 4}
// //                           </div>
// //                         )}
// //                       </AvatarGroup>
                      
// //                       <div className="text-xs text-gray-500">
// //                         {workspace.members.length} members
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             );
// //           })}
// //         </div>

// //         {/* Recent Activity Section */}
// //         {workspaces.length > 0 && (
// //           <div className="mt-12">
// //             <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
// //             <div className="bg-white rounded-lg border border-gray-200 p-6">
// //               <div className="text-center text-gray-500">
// //                 <p>Recent activity across all workspaces will appear here</p>
// //                 <p className="text-sm mt-2">Track updates, new boards, and team activity</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

