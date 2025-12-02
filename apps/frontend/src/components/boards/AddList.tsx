// src/components/boards/AddList.tsx
'use client';

import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import { List } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Plus, X } from "lucide-react";

export const AddList = ({ boardId }: { boardId: string }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const addList = useBoardStore((state) => state.addList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const newList: List = {
      id: uuidv4(),
      title: title.trim(),
      cards: []
    };
    
    addList(boardId, newList);
    setTitle("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="min-w-72 bg-gray-100 hover:bg-gray-200 rounded-lg p-4 h-fit flex items-center gap-2 text-gray-700"
      >
        <Plus size={20} />
        Add another list
      </button>
    );
  }

  return (
    <div className="min-w-72 bg-white rounded-lg shadow-sm p-4 h-fit">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          className="w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Add list
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAdding(false);
              setTitle("");
            }}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            <X size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};