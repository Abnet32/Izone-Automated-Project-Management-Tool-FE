// src/components/workspace/BoardCard.tsx
'use client';

import Link from 'next/link';
import { Board } from '@/stores/app.store';

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link
      href={`/board/${board.id}`}
      className="block group"
    >
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <svg
            className="w-5 h-5 text-blue-400 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
          {board.name}
        </h3>
        {board.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {board.description}
          </p>
        )}
        <div className="mt-4 text-xs text-gray-500">
          Updated {new Date(board.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}