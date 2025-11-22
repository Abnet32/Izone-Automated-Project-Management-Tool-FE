'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface TaskCreatorProps {
  columnId: string;
  onSubmit: (taskData: { title: string; description?: string }) => void;
  onCancel?: () => void;
}

export function TaskCreator({ columnId, onSubmit, onCancel }: TaskCreatorProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isCreating && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCreating]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsCreating(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full flex items-center gap-2 p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-medium">Create Task</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-3 shadow-sm space-y-3">
      <textarea
        ref={textareaRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter task title..."
        className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[60px] touch-manipulation"
        rows={2}
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add description (optional)..."
        className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[40px] touch-manipulation"
        rows={1}
      />

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors touch-manipulation"
        >
          Create Task
        </button>
        <button
          onClick={handleCancel}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors touch-manipulation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

