'use client';

import { useState } from 'react';
import { mockWorkspaces } from '@/lib/mockData';

interface Board {
  id: string;
  title: string;
  description?: string;
  background?: string;
  workspaceId: string;
  visibility?: 'Private' | 'Workspace' | 'Public';
}

interface CreateBoardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (boardData: { title: string; description?: string; background?: string; workspaceId: string; visibility?: string }) => Promise<Board>;
  workspaceId?: string;
  workspaceName?: string;
}

const BOARD_BACKGROUNDS = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500' },
  { id: 'gradient-blue', name: 'Blue Gradient', class: 'bg-gradient-to-br from-blue-400 to-blue-600' },
  { id: 'gradient-green', name: 'Green Gradient', class: 'bg-gradient-to-br from-green-400 to-green-600' },
];

export function CreateBoardForm({ isOpen, onClose, onSubmit, workspaceId, workspaceName }: CreateBoardFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('blue');
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaceId || (mockWorkspaces[0] && mockWorkspaces[0].id) || '');
  const [visibility, setVisibility] = useState<'Private' | 'Workspace' | 'Public'>('Workspace');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);

    try {
      const newBoard = await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        background: selectedBackground,
        workspaceId: selectedWorkspace,
        visibility,
      });
      
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to create board:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedBackground('blue');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Board</h2>
            {workspaceName && (
              <p className="text-gray-600 text-sm mt-1">
                Create a new board in {workspaceName} workspace
              </p>
            )}
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Workspace selector - only show if no workspaceId was passed in */}
            {!workspaceId ? (
              <div>
                <label htmlFor="workspace-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Workspace
                </label>
                <select
                  id="workspace-select"
                  value={selectedWorkspace}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {mockWorkspaces.map(ws => (
                    <option key={ws.id} value={ws.id}>{ws.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workspace</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">{workspaceName}</div>
              </div>
            )}

            {/* Visibility selector */}
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Private">Private</option>
                <option value="Workspace">Workspace</option>
                <option value="Public">Public</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Private boards are only visible to invited members. Workspace boards are visible to everyone in the selected workspace.</p>
            </div>

            <div>
              <label htmlFor="board-title" className="block text-sm font-medium text-gray-700 mb-2">
                Board Title *
              </label>
              <input
                id="board-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Project Tasks, Marketing Campaign"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                id="board-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this board about?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Background (Optional)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {BOARD_BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setSelectedBackground(bg.id)}
                    className={`aspect-video rounded-lg border-2 ${
                      selectedBackground === bg.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${bg.class} transition-all`}
                    title={bg.name}
                  >
                    <span className="sr-only">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div
                className={`${
                  BOARD_BACKGROUNDS.find(bg => bg.id === selectedBackground)?.class || 'bg-blue-500'
                } rounded-lg p-4 aspect-video flex items-center justify-center transition-colors`}
              >
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">{title || 'Your Board Title'}</div>
                  <div className="text-xs text-white/80 mt-1">{mockWorkspaces.find(w => w.id === selectedWorkspace)?.name}</div>
                  <div className="text-xs text-white/80 mt-1">{visibility} board</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Board'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}







