'use client';

import { use } from 'react';
import { useBoard } from '@/hooks/useBoard';
import { BoardHeader } from '@/components/board/BoardHeader';
import { ListContainer } from '@/components/board/ListContainer';
import { BoardWithDetails } from '@/types';

export default function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const resolvedParams = use(params);
  const boardId = resolvedParams.boardId;
  
  const { board, isLoading, error, updateBoard, refetch } = useBoard(boardId as unknown as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Board Not Found</h1>
          <p className="text-gray-300">The board you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        background: board.background?.includes('gradient') 
          ? `linear-gradient(135deg, ${getGradientColors(board.background)})`
          : getBackgroundColor(board.background)
      }}
    >
      <BoardHeader board={board} onUpdateBackground={async (bg: string) => {
        try {
          if (updateBoard && board?.id) {
            await updateBoard(board.id, { background: bg });
          }
        } catch (err) {
          console.error('Failed to update board background', err);
        }
      }} />
      <ListContainer board={board as BoardWithDetails} onRefresh={refetch} />
    </div>
  );
}

// Helper functions for backgrounds
function getGradientColors(background: string = 'blue') {
  const gradients = {
    'gradient-blue': '#3b82f6, #1d4ed8',
    'gradient-green': '#10b981, #047857',
    'gradient-red': '#ef4444, #dc2626',
    'gradient-purple': '#8b5cf6, #7c3aed',
    'gradient-orange': '#f59e0b, #d97706',
    'gradient-pink': '#ec4899, #db2777',
  };
  return gradients[background as keyof typeof gradients] || '#3b82f6, #1d4ed8';
}

function getBackgroundColor(background: string = 'blue') {
  const colors = {
    'blue': '#3b82f6',
    'green': '#10b981',
    'red': '#ef4444',
    'purple': '#8b5cf6',
    'orange': '#f59e0b',
    'pink': '#ec4899',
    'gradient-blue': '#3b82f6',
    'gradient-green': '#10b981',
    'gradient-red': '#ef4444',
    'gradient-purple': '#8b5cf6',
    'gradient-orange': '#f59e0b',
    'gradient-pink': '#ec4899',
  };
  return colors[background as keyof typeof colors] || '#3b82f6';
}





