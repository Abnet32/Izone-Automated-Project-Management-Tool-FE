// src/components/boards/CreateBoard.tsx
'use client';

import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import { Board } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export const CreateBoard = ({ onClose }: { onClose?: () => void }) => {
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<Board["privacy"]>("workspace");
  const [background, setBackground] = useState("#4f46e5");
  const addBoard = useBoardStore((state) => state.addBoard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const newBoard: Board = {
      id: uuidv4(),
      name,
      privacy,
      background,
      lists: []
    };
    
    addBoard(newBoard);
    setName("");
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Create Board</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Board Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Event Planning"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Privacy
        </label>
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value as Board["privacy"])}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="workspace">Workspace (Visible to workspace members)</option>
          <option value="private">Private (Only invited members)</option>
          <option value="public">Public (Anyone can view)</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="w-full h-10 cursor-pointer rounded border border-gray-300"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-1"
        >
          Create Board
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};