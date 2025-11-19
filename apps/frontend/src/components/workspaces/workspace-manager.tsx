'use client';

import { useWorkspaces } from '@/hooks/workspaces/use-workspaces';
import { WorkspaceList } from './workspace-list';
import { BoardList } from '../boards/board-list';
import { WorkspaceForm } from "../workspaces/workspace-form";
import { BoardForm } from '../boards/board-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function WorkspaceManager() {
  const {
    workspaces,
    selectedWorkspace,
    selectedBoard,
    setSelectedWorkspace,
    setSelectedBoard,
    createWorkspace,
    createBoard,
  } = useWorkspaces();

  if (selectedBoard) {
    // You'll navigate to the actual Kanban board here
    return <div>Board View - To be implemented</div>;
  }

  if (selectedWorkspace) {
    return (
      <div>
        {/* Back Button */}
        <div className="p-6 pb-0">
          <Button
            variant="ghost"
            onClick={() => setSelectedWorkspace(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Workspaces
          </Button>
        </div>

        {/* Board List */}
        <BoardList
          workspace={selectedWorkspace}
          boards={selectedWorkspace.boards}
          onBoardSelect={setSelectedBoard}
          onCreateBoard={() => {
            // You can implement a modal for board creation
            const newBoard = createBoard(selectedWorkspace.id, {
              name: 'New Board',
              description: 'Board description',
              workspaceId: selectedWorkspace.id,
              members: selectedWorkspace.members,
            });
            setSelectedBoard(newBoard);
          }}
        />
      </div>
    );
  }

  return (
    <WorkspaceList
      workspaces={workspaces}
      onWorkspaceSelect={setSelectedWorkspace}
      onCreateWorkspace={() => {
        // You can implement a modal for workspace creation
        const newWorkspace = createWorkspace({
          name: 'New Workspace',
          description: 'Workspace description',
          emoji: '🚀',
          color: '#3B82F6',
          members: [],
        });
        setSelectedWorkspace(newWorkspace);
      }}
    />
  );
}