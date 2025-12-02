'use client';

import { Board, BoardWithDetails } from '@/types/board';

interface BoardBackgroundProps {
  board: Board | BoardWithDetails;
  onUpdateBackground: (background: string) => void;
}

const BACKGROUND_OPTIONS = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500' },
  { id: 'gradient-blue', name: 'Blue Gradient', class: 'bg-gradient-to-br from-blue-400 to-blue-600' },
  { id: 'gradient-green', name: 'Green Gradient', class: 'bg-gradient-to-br from-green-400 to-green-600' },
];

export function BoardBackground({ board, onUpdateBackground }: BoardBackgroundProps) {
  return (
    <div className="p-4">
      <h3 className="text-white font-semibold mb-3">Change Background</h3>
      <div className="grid grid-cols-4 gap-3">
        {BACKGROUND_OPTIONS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onUpdateBackground(bg.id)}
            className={`aspect-video rounded-lg border-2 ${
              board.background === bg.id 
                ? 'border-white ring-2 ring-blue-200' 
                : 'border-white border-opacity-30 hover:border-opacity-50'
            } ${bg.class} transition-all hover:scale-105`}
            title={bg.name}
          >
            <span className="sr-only">{bg.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}