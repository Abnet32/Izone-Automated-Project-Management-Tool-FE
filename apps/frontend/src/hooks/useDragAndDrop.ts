import { useState, useRef } from 'react';

interface DragItem {
  type: 'card' | 'list';
  id: string;
  listId?: string;
  index: number;
}

interface DropResult {
  type: 'card' | 'list';
  source: DragItem;
  destination: {
    index: number;
    listId?: string;
  };
}

export function useDragAndDrop() {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (item: DragItem, event: React.DragEvent) => {
    setDraggedItem(item);
    setIsDragging(true);
    
    // Set drag image for better visual feedback
    if (event.dataTransfer && dragPreviewRef.current) {
      event.dataTransfer.setDragImage(dragPreviewRef.current, 20, 20);
    }
    
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleDrop = (destination: { index: number; listId?: string }, event: React.DragEvent): DropResult | null => {
    event.preventDefault();
    
    if (!draggedItem) return null;

    const dropResult: DropResult = {
      type: draggedItem.type,
      source: draggedItem,
      destination,
    };

    setDraggedItem(null);
    setIsDragging(false);

    return dropResult;
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return {
    draggedItem,
    isDragging,
    dragPreviewRef,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
  };
}