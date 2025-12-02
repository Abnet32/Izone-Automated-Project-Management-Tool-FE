// // // src/hooks/useBoard.ts
// // "use client";

// // import { useEffect } from "react";
// // import { useBoardStore } from "@/store/board.store";

// // export const useBoard = (boardId?: string) => {
// //   // Get all store functions directly from Zustand
// //   const currentBoard = useBoardStore((state) => state.currentBoard);
// //   const boards = useBoardStore((state) => state.boards);
  
// //   // Get all action functions
// //   const getBoard = useBoardStore((state) => state.getBoard);
// //   const setCurrentBoard = useBoardStore((state) => state.setCurrentBoard);
// //   const createBoard = useBoardStore((state) => state.createBoard);
// //   const updateBoard = useBoardStore((state) => state.updateBoard);
// //   const deleteBoard = useBoardStore((state) => state.deleteBoard);
// //   const createList = useBoardStore((state) => state.createList);
// //   const updateList = useBoardStore((state) => state.updateList);
// //   const deleteList = useBoardStore((state) => state.deleteList);
// //   const createCard = useBoardStore((state) => state.createCard);
// //   const updateCard = useBoardStore((state) => state.updateCard);
// //   const deleteCard = useBoardStore((state) => state.deleteCard);
// //   const moveCard = useBoardStore((state) => state.moveCard);
// //   const reorderLists = useBoardStore((state) => state.reorderLists);
// //   const reorderCards = useBoardStore((state) => state.reorderCards);

// //   useEffect(() => {
// //     if (boardId) {
// //       setCurrentBoard(boardId);
// //     }
// //   }, [boardId, setCurrentBoard]);

// //   return {
// //     // Board data
// //     board: currentBoard,
// //     boards,
    
// //     // Board operations
// //     createBoard,
// //     updateBoard,
// //     deleteBoard,
// //     getBoard,
// //     setCurrentBoard,
    
// //     // List operations
// //     createList,
// //     updateList,
// //     deleteList,
// //     reorderLists,
    
// //     // Card operations
// //     createCard,
// //     updateCard,
// //     deleteCard,
// //     moveCard,
// //     reorderCards,
// //   };
// // };











// 'use client';

// import { useState, useEffect } from 'react';
// import { Board } from '@/types/board';
// import { boardStore } from '@/lib/boardStore';

// export function useBoard(boardId: string) {
//   const [board, setBoard] = useState<Board | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadBoard = () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // Try to get board from store
//         const foundBoard = boardStore.getBoard(boardId);
        
//         if (foundBoard) {
//           setBoard(foundBoard);
//         } else {
//           // Create a demo board if not found
//           const demoBoard = boardStore.createBoard({
//             id: boardId,
//             title: 'Project Board',
//             name: 'Project Board',
//             description: 'Project management board',
//             workspaceId: '1',
//             background: 'blue',
//             lists: [
//               {
//                 id: 'list-1',
//                 name: 'To Do',
//                 cards: [
//                   {
//                     id: 'card-1',
//                     title: 'Design Homepage',
//                     description: 'Create the homepage design mockups',
//                     labels: ['design', 'high-priority'],
//                     dueDate: '2024-12-15',
//                     attachments: [],
//                     createdAt: new Date().toISOString()
//                   }
//                 ]
//               },
//               {
//                 id: 'list-2',
//                 name: 'In Progress',
//                 cards: []
//               },
//               {
//                 id: 'list-3',
//                 name: 'Done',
//                 cards: []
//               }
//             ]
//           });
//           setBoard(demoBoard);
//         }
//       } catch (err) {
//         setError('Failed to load board');
//         console.error('Error loading board:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (boardId) {
//       loadBoard();
//     }
//   }, [boardId]);

//   // Subscribe to board updates
//   useEffect(() => {
//     const unsubscribe = boardStore.subscribe((boards) => {
//       const updatedBoard = boards.find(b => b.id === boardId);
//       if (updatedBoard && board) {
//         setBoard(updatedBoard);
//       }
//     });
    
//     return unsubscribe;
//   }, [boardId, board]);

//   const refetch = () => {
//     if (boardId) {
//       setIsLoading(true);
//       const foundBoard = boardStore.getBoard(boardId);
//       setBoard(foundBoard || null);
//       setIsLoading(false);
//     }
//   };

//   return {
//     board,
//     isLoading,
//     error,
//     refetch
//   };
// }