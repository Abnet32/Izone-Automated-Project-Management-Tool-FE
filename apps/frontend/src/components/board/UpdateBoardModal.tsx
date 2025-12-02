'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Board } from '@/types/board';
import { useBoardStore } from '@/store/board.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface UpdateBoardModalProps {
  board: Board;
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { value: '#3B82F6', label: 'Blue', bg: 'bg-blue-500' },
  { value: '#8B5CF6', label: 'Purple', bg: 'bg-purple-500' },
  { value: '#10B981', label: 'Green', bg: 'bg-green-500' },
  { value: '#F59E0B', label: 'Yellow', bg: 'bg-yellow-500' },
  { value: '#EF4444', label: 'Red', bg: 'bg-red-500' },
  { value: '#EC4899', label: 'Pink', bg: 'bg-pink-500' },
];

export function UpdateBoardModal({ board, isOpen, onClose }: UpdateBoardModalProps) {
  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description || '');
  const [selectedColor, setSelectedColor] = useState(board.color);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateBoard = useBoardStore((state) => state.updateBoard);

  useEffect(() => {
    setName(board.name);
    setDescription(board.description || '');
    setSelectedColor(board.color);
  }, [board]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    
    try {
      updateBoard(board.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
      });

      onClose();
    } catch (error) {
      console.error('Failed to update board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl data-[state=open]:animate-contentShow">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Edit Board
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board Name *
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Board Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`
                      h-10 rounded-lg flex items-center justify-center
                      ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                      transition-all
                    `}
                  >
                    <div className={`${color.bg} w-8 h-8 rounded-md`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}