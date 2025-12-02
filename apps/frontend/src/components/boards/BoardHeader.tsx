// src/components/boards/BoardHeader.tsx
'use client';

import { Board } from "@/lib/types";

export const BoardHeader = ({ board }: { board: Board }) => {
  // Safe defaults
  const safeBoard = board || { name: 'Untitled Board', lists: [] };
  const lists = safeBoard.lists || [];
  
  const totalCards = lists.reduce((total, list) => 
    total + (list.cards?.length || 0), 
    0
  );

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {safeBoard.name}
        </h1>
        {safeBoard.description && (
          <p className="text-gray-600 mt-2">{safeBoard.description}</p>
        )}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span>{lists.length} lists</span>
          <span>{totalCards} cards</span>
        </div>
      </div>
    </div>
  );
};









