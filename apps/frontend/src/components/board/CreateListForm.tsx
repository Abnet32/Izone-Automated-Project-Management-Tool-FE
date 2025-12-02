"use client";

import { useState } from "react";
import { useBoardStore } from "@/store/board.store";

interface CreateListFormProps {
  boardId: string;
}

export default function CreateListForm({ boardId }: CreateListFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const createList = useBoardStore((state) => state.createList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createList(boardId, title.trim());
      setTitle("");
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full h-12 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 transition-colors duration-200 border border-dashed border-gray-300 hover:border-gray-400"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add another list
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter list title..."
        className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex-1"
        >
          Add list
        </button>
        <button
          type="button"
          onClick={() => {
            setIsCreating(false);
            setTitle("");
          }}
          className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}