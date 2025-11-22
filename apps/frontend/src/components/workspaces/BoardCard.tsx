'use client';

import { useState } from 'react';
import { Board } from '@/types';
import Link from 'next/link';

interface BoardCardProps {
  board: Board;
  workspaceId: string;
  onUpdateBoard?: (boardId: string, updates: Partial<Board>) => void;
  onDeleteBoard?: (boardId: string) => void;
}

export function BoardCard({ board, workspaceId, onUpdateBoard, onDeleteBoard }: BoardCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState(board.title);

  const getBackgroundClass = (background?: string) => {
    const backgrounds: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      'gradient-blue': 'bg-gradient-to-br from-blue-400 to-blue-600',
      'gradient-green': 'bg-gradient-to-br from-green-400 to-green-600',
    };
    return backgrounds[background || 'blue'] || 'bg-blue-500';
  };

  const handleBoardClick = (e: React.MouseEvent) => {
    // If clicking the menu button or editing, don't navigate
    if ((e.target as HTMLElement).closest('.board-menu') || isEditing) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleSaveTitle = () => {
    if (boardTitle.trim() && onUpdateBoard) {
      onUpdateBoard(board.id, { title: boardTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setBoardTitle(board.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50);

  const slug = slugify(board.title || 'board');

  return (
    <Link
      href={`/b/${board.id}/${slug}`}
      onClick={handleBoardClick}
    >
      <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
        {/* Board Background */}
        <div className={`h-20 ${getBackgroundClass(board.background)} relative`}>
          {/* Menu Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="board-menu relative">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="bg-black bg-opacity-20 text-white p-1 rounded hover:bg-opacity-30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add change background functionality here
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Change Background
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteBoard?.(board.id);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete Board
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Board Info */}
        <div className="p-4">
          {isEditing ? (
            <input
              type="text"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSaveTitle}
              className="w-full font-semibold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
              autoFocus
            />
          ) : (
            <h3 className="font-semibold text-gray-900 mb-1 truncate">{board.title}</h3>
          )}
          {board.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{board.description}</p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{board.lists?.length || 0} lists</span>
            <span>Updated {new Date(board.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-colors rounded-lg" />
      </div>
    </Link>
  );
}