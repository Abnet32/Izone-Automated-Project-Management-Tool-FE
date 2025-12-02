// src/hooks/useBoards.ts
'use client';

import { useState, useEffect } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Board, List, Card } from '@/lib/types';

export const useBoards = () => {
  // Get all methods from the store
  const boards = useBoardStore((state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const updateBoard = useBoardStore((state) => state.updateBoard);
  const removeBoard = useBoardStore((state) => state.removeBoard);
  const addList = useBoardStore((state) => state.addList);
  const updateList = useBoardStore((state) => state.updateList);
  const removeList = useBoardStore((state) => state.removeList);
  const addCard = useBoardStore((state) => state.addCard);
  const updateCard = useBoardStore((state) => state.updateCard);
  const removeCard = useBoardStore((state) => state.removeCard);
  
  const [loading, setLoading] = useState(false);

  // Create a new board with defaults
  const createBoard = async (boardData: {
    name: string;
    privacy?: 'workspace' | 'private' | 'public';
    background?: string;
    description?: string;
  }) => {
    setLoading(true);
    
    const newBoard: Board = {
      id: Date.now().toString(),
      name: boardData.name,
      privacy: boardData.privacy || 'workspace',
      background: boardData.background || '#4f46e5',
      description: boardData.description,
      lists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addBoard(newBoard);
    setLoading(false);
    return newBoard;
  };

  // Add list to board
  const addListToBoard = (boardId: string, listData: { title: string }) => {
    const newList: List = {
      id: Date.now().toString(),
      title: listData.title,
      cards: []
    };
    
    addList(boardId, newList);
    return newList;
  };

  // Add card to list
  const addCardToList = (boardId: string, listId: string, cardData: { title: string; description?: string }) => {
    const newCard: Card = {
      id: Date.now().toString(),
      title: cardData.title,
      description: cardData.description
    };
    
    addCard(boardId, listId, newCard);
    return newCard;
  };

  // Update card
  const updateCardDetails = (boardId: string, listId: string, cardId: string, updates: Partial<Card>) => {
    updateCard(boardId, listId, cardId, updates);
  };

  // Get board by ID
  const getBoard = (boardId: string) => {
    return boards.find(b => b.id === boardId);
  };

  // Get lists by board ID
  const getBoardLists = (boardId: string) => {
    const board = boards.find(b => b.id === boardId);
    return board?.lists || [];
  };

  // Get cards by list ID
  const getListCards = (boardId: string, listId: string) => {
    const board = boards.find(b => b.id === boardId);
    const list = board?.lists.find(l => l.id === listId);
    return list?.cards || [];
  };

  // Toggle card label (example additional feature)
  const toggleCardLabel = (boardId: string, listId: string, cardId: string, label: string) => {
    const board = getBoard(boardId);
    if (!board) return;

    // This is an example - you'd need to add labels to your Card type
    const updatedCard = { label };
    updateCard(boardId, listId, cardId, updatedCard);
  };

  // Add checklist to card (example)
  const addChecklistToCard = (boardId: string, listId: string, cardId: string, checklistTitle: string) => {
    // Implementation depends on your Card type structure
    console.log('Adding checklist:', { boardId, listId, cardId, checklistTitle });
  };

  // Add comment to card (example)
  const addCommentToCard = (boardId: string, listId: string, cardId: string, commentText: string) => {
    // Implementation depends on your Card type structure
    console.log('Adding comment:', { boardId, listId, cardId, commentText });
  };

  // Toggle card watch (example)
  const toggleCardWatch = (boardId: string, listId: string, cardId: string) => {
    // Implementation depends on your Card type structure
    console.log('Toggling watch:', { boardId, listId, cardId });
  };

  return {
    // Data
    boards,
    loading,
    
    // Board operations
    createBoard,
    updateBoard,
    removeBoard,
    getBoard,
    
    // List operations
    addListToBoard,
    updateList,
    removeList,
    getBoardLists,
    
    // Card operations
    addCardToList,
    updateCard: updateCardDetails,
    removeCard,
    getListCards,
    
    // Additional features
    toggleCardLabel,
    addChecklistToCard,
    addCommentToCard,
    toggleCardWatch
  };
};










// 'use client';

// import { useState, useEffect } from 'react';
// import { Board } from '@/types/board';
// import { boardStore } from '@/lib/boardStore';

// export function useBoards() {
//   const [boards, setBoards] = useState<Board[]>([]);

//   useEffect(() => {
//     console.log('useBoards: Setting up subscription');
    
//     const unsubscribe = boardStore.subscribe((newBoards) => {
//       console.log('useBoards: Received update with', newBoards.length, 'boards');
//       setBoards(newBoards);
//     });
    
//     return () => {
//       console.log('useBoards: Cleaning up subscription');
//       unsubscribe();
//     };
//   }, []);

//   // Ensure all methods are properly bound and available
//   const createBoard = (boardData: Partial<Board>) => {
//     console.log('useBoards: Creating board', boardData);
//     return boardStore.createBoard(boardData);
//   };

//   const updateBoard = (id: string, updates: Partial<Board>) => {
//     return boardStore.updateBoard(id, updates);
//   };

//   const getBoard = (id: string) => {
//     return boardStore.getBoard(id);
//   };

//   const addListToBoard = (boardId: string, listData: { name: string }) => {
//     return boardStore.addListToBoard(boardId, listData);
//   };

//   const addCardToList = (boardId: string, listId: string, cardData: any) => {
//     return boardStore.addCardToList(boardId, listId, cardData);
//   };

//   const updateCard = (boardId: string, listId: string, cardId: string, updates: any) => {
//     return boardStore.updateCard(boardId, listId, cardId, updates);
//   };

//   const toggleCardLabel = (boardId: string, listId: string, cardId: string, label: string) => {
//     return boardStore.toggleCardLabel(boardId, listId, cardId, label);
//   };

//   const addChecklistToCard = (boardId: string, listId: string, cardId: string, checklistTitle: string) => {
//     return boardStore.addChecklistToCard(boardId, listId, cardId, checklistTitle);
//   };

//   const addCommentToCard = (boardId: string, listId: string, cardId: string, commentText: string, userId: string, userName: string) => {
//     return boardStore.addCommentToCard(boardId, listId, cardId, commentText, userId, userName);
//   };

//   const toggleCardWatch = (boardId: string, listId: string, cardId: string) => {
//     return boardStore.toggleCardWatch(boardId, listId, cardId);
//   };

//   return {
//     boards,
//     createBoard,
//     updateBoard,
//     getBoard,
//     addListToBoard,
//     addCardToList,
//     updateCard,
//     toggleCardLabel,
//     addChecklistToCard,
//     addCommentToCard,
//     toggleCardWatch
//   };
// }


