import { useState, useEffect } from 'react';

interface BoardHeaderProps {
  board?: {
    title: string;
    // ... other board properties
  };
  onUpdateBackground: () => void;
}

export function BoardHeader({ board, onUpdateBackground }: BoardHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board?.title || '');
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  // Sync title when board data changes
  useEffect(() => {
    if (board?.title && board.title !== title) {
      setTitle(board.title);
    }
  }, [board?.title]);

  // Loading state
  if (!board) {
    return (
      <div className="p-4 border-b bg-white">
        <div className="h-7 bg-gray-200 rounded w-48 mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
    );
  }

  const handleSave = () => {
    // Your save logic here
    setIsEditing(false);
    // Save the title to your backend
  };

  return (
    <div className="p-4 border-b bg-white">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="text-2xl font-bold border-b-2 border-blue-500 outline-none"
          autoFocus
        />
      ) : (
        <h1 
          className="text-2xl font-bold cursor-pointer hover:bg-gray-100 p-1 rounded"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
      {/* ... rest of your JSX */}
    </div>
  );
}