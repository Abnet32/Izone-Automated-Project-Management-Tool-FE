"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBoardStore } from "@/store/board.store";
import { v4 as uuid } from "uuid";
import CreateBoardModal from "@/components/board/CreateBoardModal";
import {BoardCard} from "@/components/board/BoardCard";

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const boards = useBoardStore((state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  
  const workspaceBoards = boards.filter(board => 
    !workspaceId || board.id.startsWith(workspaceId)
  );

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleCreateBoard = (name: string, background: string = "blue") => {
    const newBoard: any = {
      id: `${workspaceId}-${uuid()}`,
      name,
      lists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      background,
    };
    
    addBoard(newBoard);
    setIsModalOpen(false);
    
    // Navigate to board
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);
    
    router.push(`/b/${newBoard.id}/${slug}`);
  };

  const handleDeleteBoard = (boardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this board?")) {
      deleteBoard(boardId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Loading workspace...</h2>
          <p className="text-gray-500">Please wait while we load your workspace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Workspace Boards</h1>
              <p className="text-gray-600 mt-2 md:mt-3">
                Create and manage boards for your projects
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Board
            </button>
          </div>
        </div>

        {/* Boards Grid */}
        {workspaceBoards.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No boards yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first board to start organizing tasks and projects.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Create Your First Board
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Boards ({workspaceBoards.length})
              </h2>
              <p className="text-gray-600 mt-1">
                Click on a board to open it
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {workspaceBoards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onDelete={(e) => handleDeleteBoard(board.id, e)}
                  onClick={() => {
                    const slug = board.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")
                      .slice(0, 50);
                    router.push(`/b/${board.id}/${slug}`);
                  }}
                />
              ))}
              
              {/* Add New Board Card */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-48 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    Create New Board
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Create Board Modal */}
        {isModalOpen && (
          <CreateBoardModal
            onCreate={handleCreateBoard}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}