'use client';

import { Task } from '@/lib/types/kanban';
import { X, Calendar, User, Tag, Paperclip, Archive, Copy, Image } from 'lucide-react'; // ✅ Fixed icons
import { useState } from 'react';

interface CardSidebarProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

export function CardSidebar({ task, isOpen, onClose, onTaskUpdate, onTaskDelete }: CardSidebarProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSave = () => {
    onTaskUpdate({
      ...task,
      title,
      description
    });
  };

  const handleDelete = () => {
    if (confirm('Delete this card?')) {
      onTaskDelete(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Card Actions</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
          {/* Title */}
          <div>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border border-transparent hover:border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg resize-none"
              rows={2}
              placeholder="Card title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSave}
              placeholder="Add a more detailed description..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Action Buttons - Exactly like Trello */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Add to card</h4>
            
            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <User className="w-4 h-4" />
              <span>Members</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <Tag className="w-4 h-4" />
              <span>Labels</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Due date</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <Paperclip className="w-4 h-4" />
              <span>Attachment</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <Image className="w-4 h-4" /> {/* ✅ Changed from Template to Image */}
              <span>Cover</span>
            </button>
          </div>

          {/* Action Buttons - Exactly like Trello */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Actions</h4>
            
            <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>

            <button 
              onClick={handleDelete}
              className="flex items-center gap-3 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Archive className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>

          {/* Activity - Like Trello */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Activity</h4>
            <div className="text-xs text-gray-500">
              Card created {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}