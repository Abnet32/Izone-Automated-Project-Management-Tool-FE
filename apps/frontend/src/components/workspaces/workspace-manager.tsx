// 'use client';

// import { useWorkspaces } from '@/hooks/workspaces/use-workspaces';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Plus, Settings } from 'lucide-react';
// import Link from 'next/link';

// export default function WorkspaceManager() {
//   const { workspaces, createWorkspace } = useWorkspaces();

//   const handleCreateWorkspace = () => {
//     const newWorkspace = createWorkspace({
//       name: 'New Workspace',
//       description: 'A new workspace for your projects',
//       emoji: '🚀',
//       color: '#3B82F6',
//       members: [
//         { id: '1', name: 'You', email: 'you@example.com', avatar: '', role: 'owner' }
//       ],
//       boards: []
//     });

//     console.log('Created workspace:', newWorkspace);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Your Workspaces</h1>
//           <p className="text-gray-600 mt-2">Manage your projects and teams</p>
//         </div>
//         <Button onClick={handleCreateWorkspace} className="bg-blue-600 hover:bg-blue-700">
//           <Plus className="w-4 h-4 mr-2" />
//           New Workspace
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {workspaces.map(workspace => (
//           <Card key={workspace.id} className="cursor-pointer hover:shadow-lg transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
//                     style={{ backgroundColor: workspace.color + '20', color: workspace.color }}
//                   >
//                     {workspace.emoji}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
//                     <p className="text-sm text-gray-600">{workspace.boards.length} boards</p>
//                   </div>
//                 </div>
//                 <Button variant="ghost" size="sm">
//                   <Settings className="w-4 h-4" />
//                 </Button>
//               </div>

//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {workspace.description}
//               </p>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   {workspace.members.slice(0, 3).map(member => (
//                     <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
//                       <AvatarImage src={member.avatar} />
//                       <AvatarFallback className="text-xs bg-gray-200">
//                         {member.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
//                   ))}
//                   {workspace.members.length > 3 && (
//                     <span className="text-xs text-gray-500">
//                       +{workspace.members.length - 3}
//                     </span>
//                   )}
//                 </div>
//                 <span className="text-sm text-gray-500">
//                   {workspace.members.length} members
//                 </span>
//               </div>

//               <div className="mt-4 space-y-2">
//                 {workspace.boards.map(board => (
//                   <Link
//                     key={board.id}
//                     href={`/board/${board.id}`}
//                     className="block text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded transition-colors"
//                   >
//                     {board.name}
//                   </Link>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}

//         <Card
//           className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
//           onClick={handleCreateWorkspace}
//         >
//           <CardContent className="flex flex-col items-center justify-center h-64 gap-3">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//               <Plus className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="font-semibold text-gray-700 group-hover:text-blue-700">
//               Create New Workspace
//             </h3>
//             <p className="text-sm text-gray-500 text-center">
//               Start organizing your projects with a new workspace
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


