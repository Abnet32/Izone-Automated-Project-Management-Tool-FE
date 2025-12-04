import React from 'react';
import { Workspace } from '@/types/workspace';
import { Users, Trello, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

interface WorkspaceCardProps {
  workspace: Workspace;
  onDelete?: (id: string) => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onDelete }) => {
  const VisibilityIcon = { public: Globe, private: Lock, team: Users }[workspace.visibility];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-2 w-full" style={{ backgroundColor: workspace.color }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 text-lg">
                <Link href={`/workspace/${workspace.id}`} className="hover:text-blue-600">
                  {workspace.name}
                </Link>
              </h3>
              <VisibilityIcon className="w-4 h-4 text-gray-400" />
            </div>
            {workspace.description && (
              <p className="text-gray-600 text-sm mb-3">{workspace.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{workspace.memberCount} member{workspace.memberCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trello className="w-4 h-4" />
            <span>{workspace.boardCount} board{workspace.boardCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};