// src/components/boards/CardItem.tsx
'use client';

import { Card } from "@/lib/types";
import { useBoardStore } from "@/store/boardStore";
import { MoreVertical } from "lucide-react";

export const CardItem = ({ 
  boardId, 
  listId, 
  card 
}: { 
  boardId: string; 
  listId: string; 
  card: Card 
}) => {
  const removeCard = useBoardStore((state) => state.removeCard);

  const handleDelete = () => {
    if (confirm("Delete this card?")) {
      removeCard(boardId, listId, card.id);
    }
  };

  return (
    <div className="p-3 bg-white border rounded shadow-sm hover:shadow cursor-pointer group relative">
      <p>{card.title}</p>
      {card.description && (
        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      )}
      
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-opacity"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};