'use client';

import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent 
} from '@/components/ui/sidebar';
import { WorkspaceItem } from './WorkspaceItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import {workspaceform} from "@/components/workspaces/workspace-form";
import { useWorkspaces } from '@/hooks/workspaces/use-workspaces';

export const WorkspaceGroup = () => {
  const { workspaces, createWorkspace } = useWorkspaces();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateWorkspace = (workspaceData: any) => {
    createWorkspace(workspaceData);
    setShowCreateForm(false);
  };

  const formattedWorkspaces = workspaces.map(workspace => ({
    id: workspace.id,
    name: workspace.name,
    icon: workspace.emoji || workspace.name.charAt(0),
    color: workspace.color
  }));

  return (
    <>
      <SidebarGroup>
        <div className="flex items-center justify-between px-2">
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <SidebarGroupContent>
          {formattedWorkspaces.map((workspace) => (
            <WorkspaceItem key={workspace.id} workspace={workspace} />
          ))}
        </SidebarGroupContent>
      </SidebarGroup>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4">
            <WorkspaceForm
              onSubmit={handleCreateWorkspace}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};





// 'use client';

// import { 
//   SidebarGroup, 
//   SidebarGroupLabel, 
//   SidebarGroupContent 
// } from '@/components/ui/sidebar';
// import { WorkspaceItem } from './WorkspaceItem';
// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';
// import { Workspace } from '@/types/workspace';
// import { useState } from 'react';
// import {workspaceform } from '@/components/workspaces/workspace-form';
// import { useWorkspaces } from '@/hooks/workspaces/use-workspaces';

// export const WorkspaceGroup = () => {
  
//   const { workspaces, createWorkspace } = useWorkspaces();
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   const handleCreateWorkspace = (workspaceData: any) => {
//     createWorkspace(workspaceData);
//     setShowCreateForm(false);
//   };

//   const formattedWorkspaces = workspaces.map(workspace => ({
//     id: workspace.id,
//     name: workspace.name,
//     icon: workspace.emoji || workspace.name.charAt(0),
//     color: workspace.color
//   }));

//   return (
//     <>
//       <SidebarGroup>
//         <div className="flex items-center justify-between px-2">
//           <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="h-6 w-6"
//             onClick={() => setShowCreateForm(true)}
//           >
//             <Plus className="h-3 w-3" />
//           </Button>
//         </div>

//         <SidebarGroupContent>
//           {formattedWorkspaces.map((workspace) => (
//             <WorkspaceItem key={workspace.id} workspace={workspace} />
//           ))}
//         </SidebarGroupContent>
//       </SidebarGroup>

//       {showCreateForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4">
//             <workspaceform
//               onSubmit={handleCreateWorkspace}
//               onCancel={() => setShowCreateForm(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };




