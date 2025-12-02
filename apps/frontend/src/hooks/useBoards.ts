import { useBoardStore } from "@/store/board.store"; 
import { createNewBoard, fetchBoards } from "../lib/api";

export const useBoards = () => {
  const { boards, setBoards, addBoard, loading, setLoading } = useBoardStore();

  const getBoards = async () => {
    setLoading(true);
    const data = await fetchBoards();
    setBoards(data);
    setLoading(false);
  };

  const createBoard = async (payload: Partial<any>) => {
    setLoading(true);
    const newBoard = await createNewBoard(payload);
    addBoard(newBoard);
    setLoading(false);
    return newBoard;
  };

  return { boards, loading, getBoards, createBoard };
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


