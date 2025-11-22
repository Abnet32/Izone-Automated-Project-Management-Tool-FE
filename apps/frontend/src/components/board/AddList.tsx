'use client';

import { useState } from 'react';

interface AddListProps {
  onCreateList: (title: string) => Promise<void> | void;
  fullWidth?: boolean;
}

export function AddList({ onCreateList, fullWidth }: AddListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || isSubmitting) return;
    const run = async () => {
      try {
        setIsSubmitting(true);
        await onCreateList(title.trim());
        setTitle('');
        setIsAdding(false);
      } catch (err) {
        console.error('AddList: failed to create list', err);
      } finally {
        setIsSubmitting(false);
      }
    };
    void run();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setTitle('');
    }
  };

  if (isAdding) {
    return (
      <div className={`${fullWidth ? 'w-full max-w-3xl mx-4' : 'w-72'} bg-white/90 rounded-lg p-3 shadow-sm`}>
        <label htmlFor="new-list-title" className="sr-only">List title</label>
        <input
          id="new-list-title"
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter list title..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-medium text-sm"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors font-medium disabled:opacity-60"
          >
            {isSubmitting ? 'Adding…' : 'Add List'}
          </button>
          <button
            onClick={() => { setIsAdding(false); setTitle(''); }}
            aria-label="Cancel adding list"
            className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Collapsed pill button (matches screenshot: rounded pill with plus icon)
  return (
    <button
      onClick={() => setIsAdding(true)}
      className={`px-4 py-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 flex items-center gap-3 shadow-sm transition-colors font-medium border border-gray-200 ${fullWidth ? 'min-w-[220px] max-w-xs text-left' : 'min-w-[220px]'}`}
      aria-label="Add another list"
    >
      <span className="text-sm">+ Add another list</span>
    </button>
  );
}




