import { KanbanBoard } from '@/components/kanban/kanban-board';

export default function DashboardPage() {
  return (
    <div className="flex-1">
      {/* Remove the header since KanbanBoard has its own header */}
      <KanbanBoard />
    </div>
  );
}

// import { WorkspaceManager } from '@/components/workspaces/workspace-manager';

// export default function DashboardPage() {
//   return (
//     <div className="flex-1 space-y-6">
//       {/* Header */}
//       <div className="px-6 pt-6">
//         <h1 className="text-3xl font-bold text-gray-900">🔥 Task</h1>
//         <p className="text-gray-600"></p>
//       </div>

//       {/* Workspace Manager */}
//       <WorkspaceManager />
//     </div>
//   );
// }