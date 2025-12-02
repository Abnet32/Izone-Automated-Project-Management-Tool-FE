// src/components/boards/AddCard.tsx
'use client';

import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import { Card } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Plus, X } from "lucide-react";

export const AddCard = ({ boardId, listId }: { boardId: string; listId: string }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addCard = useBoardStore((state) => state.addCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const newCard: Card = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim() || undefined
    };
    
    addCard(boardId, listId, newCard);
    setTitle("");
    setDescription("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm"
      >
        <Plus className="w-4 h-4" />
        Add a card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter card title..."
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add description... (optional)"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        rows={3}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={() => {
            setIsAdding(false);
            setTitle("");
            setDescription("");
          }}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
};