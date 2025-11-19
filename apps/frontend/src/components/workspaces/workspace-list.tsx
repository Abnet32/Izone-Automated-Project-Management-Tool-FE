'use client';

import { Workspace } from '@/lib/types/workspace';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Plus } from 'lucide-react';

interface WorkspaceListProps {
  workspaces: Workspace[];
  onWorkspaceSelect: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
}

export function WorkspaceList({ 
  workspaces, 
  onWorkspaceSelect, 
  onCreateWorkspace 
}: WorkspaceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Create New Workspace Card */}
      <Card 
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
        onClick={onCreateWorkspace}
      >
        <CardContent className="flex flex-col items-center justify-center h-40 gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Plus className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="font-semibold text-gray-700">Create Workspace</h3>
          <p className="text-sm text-gray-500 text-center">
            Start organizing your projects
          </p>
        </CardContent>
      </Card>

      {/* Workspace Cards */}
      {workspaces.map((workspace) => (
        <Card
          key={workspace.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onWorkspaceSelect(workspace)}
        >
          <CardContent className="p-6">
            {/* Workspace Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: workspace.color + '20' }}
                >
                  {workspace.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {workspace.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {workspace.boards.length} boards
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="capitalize">
                {workspace.members.length} members
              </Badge>
            </div>

            {/* Workspace Description */}
            {workspace.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {workspace.description}
              </p>
            )}

            {/* Members Avatar Group */}
            <div className="flex items-center justify-between">
              <AvatarGroup>
                {workspace.members.slice(0, 5).map((member) => (
                  <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {workspace.members.length > 5 && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{workspace.members.length - 5}
                  </div>
                )}
              </AvatarGroup>

              <div className="text-xs text-gray-500">
                Updated {new Date(workspace.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}