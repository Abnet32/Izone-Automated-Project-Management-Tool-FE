'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Board, 
  BoardWithDetails, 
  CreateBoardData, 
  UpdateBoardData, // ✅ ADD THIS IMPORT
  ListWithCards, 
  List, 
  Card 
} from '@/types';
import { mockBoards, mockLists, mockCards } from '@/lib/mockData';

export function useBoard(boardId?: string) {
  const [board, setBoard] = useState<BoardWithDetails | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to create default lists for a new board (Trello-style)
  const createDefaultLists = useCallback((boardId: string): List[] => {
    const defaultLists = [
      { title: 'To Do', position: 0 },
      { title: 'Doing', position: 1 },
      { title: 'Done', position: 2 },
    ];

    const createdLists: List[] = [];

    defaultLists.forEach((listData, index) => {
      const listId = `list-${boardId}-${Date.now()}-${index}`;
      const newList: List = {
        id: listId,
        title: listData.title,
        position: listData.position,
        boardId: boardId,
        cards: [],
        // mark these as auto-created defaults so UI can hide them
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockLists.push(newList);
      createdLists.push(newList);
    });

    return createdLists;
  }, []);

  const loadBoard = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundBoard = mockBoards.find(b => b.id === id);
      if (!foundBoard) {
        throw new Error('Board not found');
      }

      // Get all lists for this board
      const boardLists = mockLists.filter(list => list.boardId === id);
      
      // Get all cards for each list and create ListWithCards
      const listsWithCards: ListWithCards[] = boardLists.map(list => ({
        ...list,
        cards: mockCards
          .filter(card => card.listId === list.id)
          .sort((a, b) => a.position - b.position)
      }));

      const boardWithDetails: BoardWithDetails = {
        ...foundBoard,
        lists: listsWithCards.sort((a, b) => a.position - b.position)
      };

      setBoard(boardWithDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load board');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadBoards = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setBoards(mockBoards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load boards');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (boardId) {
      loadBoard(boardId);
    } else {
      loadBoards();
    }
  }, [boardId, loadBoard, loadBoards]);

  const createBoard = async (data: CreateBoardData): Promise<Board> => {
    console.log('🚀 useBoard: createBoard called with:', data);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBoard: Board = {
      id: `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: data.title,
      description: data.description,
      workspaceId: data.workspaceId,
      background: data.background || 'blue',
      lists: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('📝 useBoard: Created board object:', newBoard);

    // Note: default lists (To Do/Doing/Done) are no longer auto-created.
    // The board starts empty and the user can add lists manually via the UI.

    // Add the new board to mockBoards
    mockBoards.push(newBoard);
    
    setBoards(prev => [...prev, newBoard]);
    
    console.log('✅ useBoard: Board added to state. Total boards:', mockBoards.length);
    
    return newBoard;
  };

  const updateBoard = async (id: string, data: UpdateBoardData): Promise<Board> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const boardIndex = mockBoards.findIndex(b => b.id === id);
    if (boardIndex === -1) {
      throw new Error('Board not found');
    }

    const updatedBoard: Board = {
      ...mockBoards[boardIndex],
      ...data,
      updatedAt: new Date(),
    };

    mockBoards[boardIndex] = updatedBoard;
    setBoards(prev => prev.map(b => b.id === id ? updatedBoard : b));
    
    if (board?.id === id) {
      // Update the detailed board view as well
      const updatedBoardWithDetails: BoardWithDetails = {
        ...updatedBoard,
        lists: board.lists // Keep the existing lists structure
      };
      setBoard(updatedBoardWithDetails);
    }

    return updatedBoard;
  };

  const deleteBoard = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const boardIndex = mockBoards.findIndex(b => b.id === id);
    if (boardIndex !== -1) {
      mockBoards.splice(boardIndex, 1);
    }
    
    // Also delete associated lists and cards
    const boardLists = mockLists.filter(list => list.boardId === id);
    boardLists.forEach(list => {
      const listIndex = mockLists.findIndex(l => l.id === list.id);
      if (listIndex !== -1) {
        mockLists.splice(listIndex, 1);
      }
      
      // Delete cards in this list
      const listCards = mockCards.filter(card => card.listId === list.id);
      listCards.forEach(card => {
        const cardIndex = mockCards.findIndex(c => c.id === card.id);
        if (cardIndex !== -1) {
          mockCards.splice(cardIndex, 1);
        }
      });
    });
    
    setBoards(prev => prev.filter(b => b.id !== id));
    if (board?.id === id) {
      setBoard(null);
    }
  };

  return {
    board,
    boards,
    isLoading,
    error,
    createBoard,
    updateBoard,
    deleteBoard,
    refetch: boardId ? () => loadBoard(boardId) : loadBoards,
  };
}



// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { 
//   Board, 
//   BoardWithDetails, 
//   CreateBoardData, 
//   CreateListData, 
//   ListWithCards, 
//   List, 
//   Card 
// } from '@/types';
// import { mockBoards, mockLists, mockCards } from '@/lib/mockData';

// export function useBoard(boardId?: string) {
//   const [board, setBoard] = useState<BoardWithDetails | null>(null);
//   const [boards, setBoards] = useState<Board[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Function to create default lists for a new board (Trello-style)
//   const createDefaultLists = useCallback((boardId: string): List[] => {
//     const defaultLists = [
//       { title: 'To Do', position: 0 },
//       { title: 'Doing', position: 1 },
//       { title: 'Done', position: 2 },
//     ];

//     const createdLists: List[] = [];

//     defaultLists.forEach((listData, index) => {
//       const listId = `list-${boardId}-${Date.now()}-${index}`;
//       const newList: List = {
//         id: listId,
//         title: listData.title,
//         position: listData.position,
//         boardId: boardId,
//         cards: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
      
//       mockLists.push(newList);
//       createdLists.push(newList);
//     });

//     return createdLists;
//   }, []);

//   const loadBoard = useCallback(async (id: string) => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const foundBoard = mockBoards.find(b => b.id === id);
//       if (!foundBoard) {
//         throw new Error('Board not found');
//       }

//       // Get all lists for this board
//       const boardLists = mockLists.filter(list => list.boardId === id);
      
//       // Get all cards for each list and create ListWithCards
//       const listsWithCards: ListWithCards[] = boardLists.map(list => ({
//         ...list,
//         cards: mockCards
//           .filter(card => card.listId === list.id)
//           .sort((a, b) => a.position - b.position)
//       }));

//       const boardWithDetails: BoardWithDetails = {
//         ...foundBoard,
//         lists: listsWithCards.sort((a, b) => a.position - b.position)
//       };

//       setBoard(boardWithDetails);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load board');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const loadBoards = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       await new Promise(resolve => setTimeout(resolve, 300));
//       setBoards(mockBoards);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load boards');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (boardId) {
//       loadBoard(boardId);
//     } else {
//       loadBoards();
//     }
//   }, [boardId, loadBoard, loadBoards]);

//   const createBoard = async (data: CreateBoardData): Promise<Board> => {
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const newBoard: Board = {
//       id: `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       title: data.title,
//       description: data.description,
//       workspaceId: data.workspaceId,
//       background: data.background || 'blue',
//       lists: [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     // Create default lists for the new board (Trello-style)
//     const createdLists = createDefaultLists(newBoard.id);
//     newBoard.lists = createdLists.map(list => list.id);

//     // Add the new board to mockBoards
//     mockBoards.push(newBoard);
    
//     setBoards(prev => [...prev, newBoard]);
//     return newBoard;
//   };

//   const updateBoard = async (id: string, data: UpdateBoardData): Promise<Board> => {
//     await new Promise(resolve => setTimeout(resolve, 300));
    
//     const boardIndex = mockBoards.findIndex(b => b.id === id);
//     if (boardIndex === -1) {
//       throw new Error('Board not found');
//     }

//     const updatedBoard: Board = {
//       ...mockBoards[boardIndex],
//       ...data,
//       updatedAt: new Date(),
//     };

//     mockBoards[boardIndex] = updatedBoard;
//     setBoards(prev => prev.map(b => b.id === id ? updatedBoard : b));
    
//     if (board?.id === id) {
//       // Update the detailed board view as well
//       const updatedBoardWithDetails: BoardWithDetails = {
//         ...updatedBoard,
//         lists: board.lists // Keep the existing lists structure
//       };
//       setBoard(updatedBoardWithDetails);
//     }

//     return updatedBoard;
//   };

//   const deleteBoard = async (id: string): Promise<void> => {
//     await new Promise(resolve => setTimeout(resolve, 300));
    
//     const boardIndex = mockBoards.findIndex(b => b.id === id);
//     if (boardIndex !== -1) {
//       mockBoards.splice(boardIndex, 1);
//     }
    
//     // Also delete associated lists and cards
//     const boardLists = mockLists.filter(list => list.boardId === id);
//     boardLists.forEach(list => {
//       const listIndex = mockLists.findIndex(l => l.id === list.id);
//       if (listIndex !== -1) {
//         mockLists.splice(listIndex, 1);
//       }
      
//       // Delete cards in this list
//       const listCards = mockCards.filter(card => card.listId === list.id);
//       listCards.forEach(card => {
//         const cardIndex = mockCards.findIndex(c => c.id === card.id);
//         if (cardIndex !== -1) {
//           mockCards.splice(cardIndex, 1);
//         }
//       });
//     });
    
//     setBoards(prev => prev.filter(b => b.id !== id));
//     if (board?.id === id) {
//       setBoard(null);
//     }
//   };

//   return {
//     board,
//     boards,
//     isLoading,
//     error,
//     createBoard,
//     updateBoard,
//     deleteBoard,
//     refetch: boardId ? () => loadBoard(boardId) : loadBoards,
//   };
// }


// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import { Board, BoardWithDetails, CreateBoardData, UpdateBoardData, ListWithCards, List, Card } from '@/types';
// // import { mockBoards, mockLists, mockCards } from '@/lib/mockData';

// // export function useBoard(boardId?: string) {
// //   const [board, setBoard] = useState<BoardWithDetails | null>(null);
// //   const [boards, setBoards] = useState<Board[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   // Function to create default lists for a new board (Trello-style)
// //   const createDefaultLists = useCallback((boardId: string): List[] => {
// //     const defaultLists = [
// //       { title: 'To Do', position: 0 },
// //       { title: 'Doing', position: 1 },
// //       { title: 'Done', position: 2 },
// //     ];

// //     const createdLists: List[] = [];

// //     defaultLists.forEach((listData, index) => {
// //       const listId = `list-${boardId}-${Date.now()}-${index}`;
// //       const newList: List = {
// //         id: listId,
// //         title: listData.title,
// //         position: listData.position,
// //         boardId: boardId,
// //         cards: [],
// //         createdAt: new Date(),
// //         updatedAt: new Date(),
// //       };
      
// //       mockLists.push(newList);
// //       createdLists.push(newList);
// //     });

// //     return createdLists;
// //   }, []);

// //   const loadBoard = useCallback(async (id: string) => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);
      
// //       await new Promise(resolve => setTimeout(resolve, 500));
      
// //       const foundBoard = mockBoards.find(b => b.id === id);
// //       if (!foundBoard) {
// //         throw new Error('Board not found');
// //       }

// //       // Get all lists for this board
// //       const boardLists = mockLists.filter(list => list.boardId === id);
      
// //       // Get all cards for each list and create ListWithCards
// //       const listsWithCards: ListWithCards[] = boardLists.map(list => ({
// //         ...list,
// //         cards: mockCards.filter(card => card.listId === list.id)
// //           .sort((a, b) => a.position - b.position)
// //       }));

// //       setBoard({
// //         ...foundBoard,
// //         lists: listsWithCards.sort((a, b) => a.position - b.position)
// //       });
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to load board');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   const loadBoards = useCallback(async () => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);
      
// //       await new Promise(resolve => setTimeout(resolve, 300));
// //       setBoards(mockBoards);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to load boards');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (boardId) {
// //       loadBoard(boardId);
// //     } else {
// //       loadBoards();
// //     }
// //   }, [boardId, loadBoard, loadBoards]);

// //   const createBoard = async (data: CreateBoardData): Promise<Board> => {
// //     await new Promise(resolve => setTimeout(resolve, 500));
    
// //     const newBoard: Board = {
// //       id: `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
// //       title: data.title,
// //       description: data.description,
// //       workspaceId: data.workspaceId,
// //       background: data.background || 'blue',
// //       lists: [],
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //     };

// //     // Create default lists for the new board (Trello-style)
// //     const createdLists = createDefaultLists(newBoard.id);
// //     newBoard.lists = createdLists.map(list => list.id);

// //     // Add the new board to mockBoards
// //     mockBoards.push(newBoard);
    
// //     setBoards(prev => [...prev, newBoard]);
// //     return newBoard;
// //   };

// //   const updateBoard = async (id: string, data: UpdateBoardData): Promise<Board> => {
// //     await new Promise(resolve => setTimeout(resolve, 300));
    
// //     const boardIndex = mockBoards.findIndex(b => b.id === id);
// //     if (boardIndex === -1) {
// //       throw new Error('Board not found');
// //     }

// //     const updatedBoard: Board = {
// //       ...mockBoards[boardIndex],
// //       ...data,
// //       updatedAt: new Date(),
// //     };

// //     mockBoards[boardIndex] = updatedBoard;
// //     setBoards(prev => prev.map(b => b.id === id ? updatedBoard : b));
    
// //     if (board?.id === id) {
// //       setBoard(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
// //     }

// //     return updatedBoard;
// //   };

// //   const deleteBoard = async (id: string): Promise<void> => {
// //     await new Promise(resolve => setTimeout(resolve, 300));
    
// //     const boardIndex = mockBoards.findIndex(b => b.id === id);
// //     if (boardIndex !== -1) {
// //       mockBoards.splice(boardIndex, 1);
// //     }
    
// //     setBoards(prev => prev.filter(b => b.id !== id));
// //     if (board?.id === id) {
// //       setBoard(null);
// //     }
// //   };

// //   return {
// //     board,
// //     boards,
// //     isLoading,
// //     error,
// //     createBoard,
// //     updateBoard,
// //     deleteBoard,
// //     refetch: boardId ? () => loadBoard(boardId) : loadBoards,
// //   };
// // }




