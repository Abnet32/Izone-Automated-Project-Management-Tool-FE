'use client';

import { useState } from 'react';
import { Plus, X, Palette } from 'lucide-react';
import { useBoardStore } from '@/store/board.store';
import { CreateBoardData } from '@/types/board';

const BOARD_COLORS = [
  '#0079BF', // Blue
  '#D29034', // Orange
  '#519839', // Green
  '#B04632', // Red
  '#89609E', // Purple
  '#CD5A91', // Pink
  '#4BBF6B', // Light Green
  '#00AECC', // Cyan
];

export default function CreateBoardButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedColor, setSelectedColor] = useState(BOARD_COLORS[0]);
  const [formData, setFormData] = useState<CreateBoardData>({
    name: '',
    description: '',
    color: BOARD_COLORS[0],
  });

  const createBoard = useBoardStore((state) => state.createBoard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a board name');
      return;
    }

    setIsCreating(true);
    
    try {
      // Create the board
      createBoard({
        ...formData,
        color: selectedColor,
      });
      
      // Reset form and close modal
      setFormData({
        name: '',
        description: '',
        color: BOARD_COLORS[0],
      });
      setSelectedColor(BOARD_COLORS[0]);
      setIsModalOpen(false);
      
      // Optional: Redirect to the new board or show success message
      // router.push(`/board/${newBoard.id}`);
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Create Board Button - Two Versions */}
      <div className="flex flex-col space-y-4 p-4">
        {/* Version 1: Button in Workspace */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Version 1: Button in Workspace</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create new board
          </button>
        </div>

        {/* Version 2: Plus button beside username */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Version 2: Plus button beside name</h3>
          <div className="flex items-center justify-between">
            <span className="font-medium">John Doe</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Create board"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Board Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Create board</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              {/* Board Preview */}
              <div
                className="h-32 rounded-lg mb-4 flex items-center justify-center transition-all"
                style={{ backgroundColor: selectedColor }}
              >
                {formData.name ? (
                  <span className="text-white font-semibold text-lg">
                    {formData.name}
                  </span>
                ) : (
                  <span className="text-white/80 text-sm">Board preview</span>
                )}
              </div>

              {/* Color Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select background color
                </label>
                <div className="flex flex-wrap gap-2">
                  {BOARD_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setFormData(prev => ({ ...prev, color }));
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      // Open custom color picker if needed
                      const color = prompt('Enter hex color code:', selectedColor);
                      if (color && /^#[0-9A-F]{6}$/i.test(color)) {
                        setSelectedColor(color);
                        setFormData(prev => ({ ...prev, color }));
                      }
                    }}
                    className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    aria-label="Custom color"
                  >
                    <Palette size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Board Name */}
              <div className="mb-4">
                <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Board name *
                </label>
                <input
                  id="board-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Project Alpha"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>

              {/* Board Description */}
              <div className="mb-6">
                <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  id="board-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What's this board about?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !formData.name.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isCreating ? 'Creating...' : 'Create board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}