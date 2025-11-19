'use client';

import { Board, Workspace } from '@/lib/types/workspace';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface BoardListProps {
  workspace: Workspace;
  boards: Board[];
  onBoardSelect: (board: Board) => void;
  onCreateBoard: () => void;
}

export function BoardList({ 
  workspace, 
  boards, 
  onBoardSelect, 
  onCreateBoard 
}: BoardListProps) {
  return (
    <div className="p-6">
      {/* Workspace Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
            style={{ backgroundColor: workspace.color + '20' }}
          >
            {workspace.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {workspace.name}
            </h1>
            <p className="text-gray-600">{workspace.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{workspace.members.length} members</span>
          <span>•</span>
          <span>{boards.length} boards</span>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Board Card */}
        <Card 
          className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
          onClick={onCreateBoard}
        >
          <CardContent className="flex flex-col items-center justify-center h-32 gap-2">
            <Plus className="w-6 h-6 text-gray-500" />
            <h3 className="font-semibold text-gray-700">Create Board</h3>
          </CardContent>
        </Card>

        {/* Board Cards */}
        {boards.map((board) => (
          <Card
            key={board.id}
            className="cursor-pointer group hover:shadow-lg transition-all duration-200"
            onClick={() => onBoardSelect(board)}
          >
            <CardContent className="p-0">
              {/* Board Preview - You can add background images later */}
              <div 
                className="h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {board.name}
                </h3>
                {board.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {board.description}
                  </p>
                )}
                
                {/* Board Stats */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">
                    {board.columns.reduce((total, col) => total + col.tasks.length, 0)} tasks
                  </div>
                  
                  {/* Members */}
                  <AvatarGroup>
                    {board.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {board.members.length > 3 && (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                        +{board.members.length - 3}
                      </div>
                    )}
                  </AvatarGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}