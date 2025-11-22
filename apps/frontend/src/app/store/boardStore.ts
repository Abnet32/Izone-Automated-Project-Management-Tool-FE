import { create } from 'zustand';
import { Board, BoardWithDetails } from '@/types/board';
import { List, ListWithCards } from '@/types/list';
import { Card } from '@/types/card';
import { mockBoards, mockLists, mockCards } from '@/lib/mockData';

interface BoardState {
  // State
  boards: Board[];
  currentBoard: BoardWithDetails | null;
  lists: ListWithCards[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Board actions
  loadBoards: () => Promise<void>;
  loadBoard: (boardId: string) => Promise<void>;
  createBoard: (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'lists'>) => Promise<Board>;
  updateBoard: (boardId: string, updates: Partial<Board>) => Promise<Board>;
  deleteBoard: (boardId: string) => Promise<void>;
  
  // List actions
  createList: (listData: Omit<List, 'id' | 'createdAt' | 'cards'>) => Promise<List>;
  updateList: (listId: string, updates: Partial<List>) => Promise<List>;
  deleteList: (listId: string) => Promise<void>;
  reorderLists: (sourceIndex: number, destinationIndex: number) => Promise<void>;
  
  // Card actions
  createCard: (cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'attachments'>) => Promise<Card>;
  updateCard: (cardId: string, updates: Partial<Card>) => Promise<Card>;
  deleteCard: (cardId: string) => Promise<void>;
  moveCard: (cardId: string, newListId: string, newPosition: number) => Promise<void>;
  reorderCards: (sourceIndex: number, destinationIndex: number, listId: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  // Initial state
  boards: [],
  currentBoard: null,
  lists: [],
  isLoading: false,
  error: null,

  // Basic actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Board actions
  loadBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ boards: mockBoards, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load boards', isLoading: false });
    }
  },

  loadBoard: async (boardId: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundBoard = mockBoards.find(b => b.id === boardId);
      if (!foundBoard) {
        throw new Error('Board not found');
      }

      const boardLists = mockLists.filter(list => list.boardId === boardId);
      const listsWithCards = boardLists.map(list => ({
        ...list,
        cards: mockCards.filter(card => card.listId === list.id)
      }));

      set({ 
        currentBoard: {
          ...foundBoard,
          lists: listsWithCards
        },
        lists: listsWithCards,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to load board', isLoading: false });
    }
  },

  createBoard: async (boardData) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBoard: Board = {
        id: `board-${Date.now()}`,
        ...boardData,
        lists: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({ 
        boards: [...state.boards, newBoard],
        isLoading: false 
      }));

      return newBoard;
    } catch (error) {
      set({ error: 'Failed to create board', isLoading: false });
      throw error;
    }
  },

  updateBoard: async (boardId, updates) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedBoard: Board = {
        ...mockBoards.find(b => b.id === boardId)!,
        ...updates,
        updatedAt: new Date(),
      };

      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? updatedBoard : b),
        currentBoard: state.currentBoard?.id === boardId 
          ? { ...state.currentBoard, ...updates, updatedAt: new Date() }
          : state.currentBoard,
        isLoading: false
      }));

      return updatedBoard;
    } catch (error) {
      set({ error: 'Failed to update board', isLoading: false });
      throw error;
    }
  },

  deleteBoard: async (boardId) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      set(state => ({
        boards: state.boards.filter(b => b.id !== boardId),
        currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete board', isLoading: false });
      throw error;
    }
  },

  // List actions
  createList: async (listData) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newList: List = {
        id: `list-${Date.now()}`,
        ...listData,
        cards: [],
        createdAt: new Date(),
      };

      set(state => ({
        lists: [...state.lists, { ...newList, cards: [] }],
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: [...state.currentBoard.lists, { ...newList, cards: [] }]
        } : state.currentBoard,
        isLoading: false
      }));

      return newList;
    } catch (error) {
      set({ error: 'Failed to create list', isLoading: false });
      throw error;
    }
  },

  updateList: async (listId, updates) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      set(state => ({
        lists: state.lists.map(list => 
          list.id === listId ? { ...list, ...updates } : list
        ),
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: state.currentBoard.lists.map(list =>
            list.id === listId ? { ...list, ...updates } : list
          )
        } : state.currentBoard,
        isLoading: false
      }));

      return { id: listId, ...updates } as List;
    } catch (error) {
      set({ error: 'Failed to update list', isLoading: false });
      throw error;
    }
  },

  deleteList: async (listId) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      set(state => ({
        lists: state.lists.filter(list => list.id !== listId),
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: state.currentBoard.lists.filter(list => list.id !== listId)
        } : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete list', isLoading: false });
      throw error;
    }
  },

  reorderLists: async (sourceIndex, destinationIndex) => {
    const { lists } = get();
    const reordered = [...lists];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(destinationIndex, 0, moved);

    const updatedLists = reordered.map((list, index) => ({
      ...list,
      position: index,
    }));

    set({ lists: updatedLists });
    await new Promise(resolve => setTimeout(resolve, 200));
  },

  // Card actions
  createCard: async (cardData) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newCard: Card = {
        id: `card-${Date.now()}`,
        ...cardData,
        labels: cardData.labels || [],
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({
        lists: state.lists.map(list =>
          list.id === cardData.listId
            ? { ...list, cards: [...list.cards, newCard] }
            : list
        ),
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: state.currentBoard.lists.map(list =>
            list.id === cardData.listId
              ? { ...list, cards: [...list.cards, newCard] }
              : list
          )
        } : state.currentBoard,
        isLoading: false
      }));

      return newCard;
    } catch (error) {
      set({ error: 'Failed to create card', isLoading: false });
      throw error;
    }
  },

  updateCard: async (cardId, updates) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      set(state => ({
        lists: state.lists.map(list => ({
          ...list,
          cards: list.cards.map(card =>
            card.id === cardId ? { ...card, ...updates, updatedAt: new Date() } : card
          )
        })),
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: state.currentBoard.lists.map(list => ({
            ...list,
            cards: list.cards.map(card =>
              card.id === cardId ? { ...card, ...updates, updatedAt: new Date() } : card
            )
          }))
        } : state.currentBoard,
        isLoading: false
      }));

      return { id: cardId, ...updates } as Card;
    } catch (error) {
      set({ error: 'Failed to update card', isLoading: false });
      throw error;
    }
  },

  deleteCard: async (cardId) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      set(state => ({
        lists: state.lists.map(list => ({
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        })),
        currentBoard: state.currentBoard ? {
          ...state.currentBoard,
          lists: state.currentBoard.lists.map(list => ({
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
          }))
        } : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete card', isLoading: false });
      throw error;
    }
  },

  moveCard: async (cardId, newListId, newPosition) => {
    const { lists } = get();
    
    // Find the card and its current list
    let cardToMove: Card | null = null;
    let oldListId: string | null = null;
    
    lists.forEach(list => {
      const card = list.cards.find(c => c.id === cardId);
      if (card) {
        cardToMove = card;
        oldListId = list.id;
      }
    });

    if (!cardToMove || !oldListId) return;

    // Remove from old list and add to new list
    const updatedLists = lists.map(list => {
      if (list.id === oldListId) {
        // Remove card from old list
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      } else if (list.id === newListId) {
        // Add card to new list at specified position
        const newCards = [...list.cards];
        newCards.splice(newPosition, 0, { ...cardToMove!, listId: newListId });
        return {
          ...list,
          cards: newCards.map((card, index) => ({ ...card, position: index }))
        };
      }
      return list;
    });

    set(state => ({
      lists: updatedLists,
      currentBoard: state.currentBoard ? {
        ...state.currentBoard,
        lists: updatedLists
      } : state.currentBoard
    }));

    await new Promise(resolve => setTimeout(resolve, 200));
  },

  reorderCards: async (sourceIndex, destinationIndex, listId) => {
    const { lists } = get();
    
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        const reordered = [...list.cards];
        const [moved] = reordered.splice(sourceIndex, 1);
        reordered.splice(destinationIndex, 0, moved);
        
        return {
          ...list,
          cards: reordered.map((card, index) => ({ ...card, position: index }))
        };
      }
      return list;
    });

    set(state => ({
      lists: updatedLists,
      currentBoard: state.currentBoard ? {
        ...state.currentBoard,
        lists: updatedLists
      } : state.currentBoard
    }));

    await new Promise(resolve => setTimeout(resolve, 200));
  }
}));





// import { create } from 'zustand';
// import { Board, BoardWithDetails } from '@/types/board';
// import { List, ListWithCards } from '@/types/list';
// import { Card } from '@/types/card';
// import { mockBoards, mockLists, mockCards } from '@/lib/mockData';

// interface BoardState {
//   // State
//   boards: Board[];
//   currentBoard: BoardWithDetails | null;
//   lists: ListWithCards[];
//   isLoading: boolean;
//   error: string | null;

//   // Actions
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
  
//   // Board actions
//   loadBoards: () => Promise<void>;
//   loadBoard: (boardId: string) => Promise<void>;
//   createBoard: (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'lists'>) => Promise<Board>;
//   updateBoard: (boardId: string, updates: Partial<Board>) => Promise<Board>;
//   deleteBoard: (boardId: string) => Promise<void>;
  
//   // List actions
//   createList: (listData: Omit<List, 'id' | 'createdAt' | 'cards'>) => Promise<List>;
//   updateList: (listId: string, updates: Partial<List>) => Promise<List>;
//   deleteList: (listId: string) => Promise<void>;
//   reorderLists: (sourceIndex: number, destinationIndex: number) => Promise<void>;
  
//   // Card actions
//   createCard: (cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'attachments'>) => Promise<Card>;
//   updateCard: (cardId: string, updates: Partial<Card>) => Promise<Card>;
//   deleteCard: (cardId: string) => Promise<void>;
//   moveCard: (cardId: string, newListId: string, newPosition: number) => Promise<void>;
//   reorderCards: (sourceIndex: number, destinationIndex: number, listId: string) => Promise<void>;
// }

// export const useBoardStore = create<BoardState>((set, get) => ({
//   // Initial state
//   boards: [],
//   currentBoard: null,
//   lists: [],
//   isLoading: false,
//   error: null,

//   // Basic actions
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error }),

//   // Board actions
//   loadBoards: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       set({ boards: mockBoards, isLoading: false });
//     } catch (error) {
//       set({ error: 'Failed to load boards', isLoading: false });
//     }
//   },

//   loadBoard: async (boardId: string) => {
//     set({ isLoading: true, error: null });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const foundBoard = mockBoards.find(b => b.id === boardId);
//       if (!foundBoard) {
//         throw new Error('Board not found');
//       }

//       const boardLists = mockLists.filter(list => list.boardId === boardId);
//       const listsWithCards = boardLists.map(list => ({
//         ...list,
//         cards: mockCards.filter(card => card.listId === list.id)
//       }));

//       set({ 
//         currentBoard: {
//           ...foundBoard,
//           lists: listsWithCards
//         },
//         lists: listsWithCards,
//         isLoading: false 
//       });
//     } catch (error) {
//       set({ error: 'Failed to load board', isLoading: false });
//     }
//   },

//   createBoard: async (boardData) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const newBoard: Board = {
//         id: `board-${Date.now()}`,
//         ...boardData,
//         lists: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       set(state => ({ 
//         boards: [...state.boards, newBoard],
//         isLoading: false 
//       }));

//       return newBoard;
//     } catch (error) {
//       set({ error: 'Failed to create board', isLoading: false });
//       throw error;
//     }
//   },

//   updateBoard: async (boardId, updates) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//       const updatedBoard: Board = {
//         ...mockBoards.find(b => b.id === boardId)!,
//         ...updates,
//         updatedAt: new Date(),
//       };

//       set(state => ({
//         boards: state.boards.map(b => b.id === boardId ? updatedBoard : b),
//         currentBoard: state.currentBoard?.id === boardId 
//           ? { ...state.currentBoard, ...updates, updatedAt: new Date() }
//           : state.currentBoard,
//         isLoading: false
//       }));

//       return updatedBoard;
//     } catch (error) {
//       set({ error: 'Failed to update board', isLoading: false });
//       throw error;
//     }
//   },

//   deleteBoard: async (boardId) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//       set(state => ({
//         boards: state.boards.filter(b => b.id !== boardId),
//         currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard,
//         isLoading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to delete board', isLoading: false });
//       throw error;
//     }
//   },

//   // List actions
//   createList: async (listData) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//       const newList: List = {
//         id: `list-${Date.now()}`,
//         ...listData,
//         cards: [],
//         createdAt: new Date(),
//       };

//       set(state => ({
//         lists: [...state.lists, { ...newList, cards: [] }],
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: [...state.currentBoard.lists, { ...newList, cards: [] }]
//         } : state.currentBoard,
//         isLoading: false
//       }));

//       return newList;
//     } catch (error) {
//       set({ error: 'Failed to create list', isLoading: false });
//       throw error;
//     }
//   },

//   updateList: async (listId, updates) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 200));
      
//       set(state => ({
//         lists: state.lists.map(list => 
//           list.id === listId ? { ...list, ...updates } : list
//         ),
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: state.currentBoard.lists.map(list =>
//             list.id === listId ? { ...list, ...updates } : list
//           )
//         } : state.currentBoard,
//         isLoading: false
//       }));

//       return { id: listId, ...updates } as List;
//     } catch (error) {
//       set({ error: 'Failed to update list', isLoading: false });
//       throw error;
//     }
//   },

//   deleteList: async (listId) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 200));
      
//       set(state => ({
//         lists: state.lists.filter(list => list.id !== listId),
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: state.currentBoard.lists.filter(list => list.id !== listId)
//         } : state.currentBoard,
//         isLoading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to delete list', isLoading: false });
//       throw error;
//     }
//   },

//   reorderLists: async (sourceIndex, destinationIndex) => {
//     const { lists } = get();
//     const reordered = [...lists];
//     const [moved] = reordered.splice(sourceIndex, 1);
//     reordered.splice(destinationIndex, 0, moved);

//     const updatedLists = reordered.map((list, index) => ({
//       ...list,
//       position: index,
//     }));

//     set({ lists: updatedLists });
//     await new Promise(resolve => setTimeout(resolve, 200));
//   },

//   // Card actions
//   createCard: async (cardData) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//       const newCard: Card = {
//         id: `card-${Date.now()}`,
//         ...cardData,
//         labels: cardData.labels || [],
//         attachments: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       set(state => ({
//         lists: state.lists.map(list =>
//           list.id === cardData.listId
//             ? { ...list, cards: [...list.cards, newCard] }
//             : list
//         ),
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: state.currentBoard.lists.map(list =>
//             list.id === cardData.listId
//               ? { ...list, cards: [...list.cards, newCard] }
//               : list
//           )
//         } : state.currentBoard,
//         isLoading: false
//       }));

//       return newCard;
//     } catch (error) {
//       set({ error: 'Failed to create card', isLoading: false });
//       throw error;
//     }
//   },

//   updateCard: async (cardId, updates) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 200));
      
//       set(state => ({
//         lists: state.lists.map(list => ({
//           ...list,
//           cards: list.cards.map(card =>
//             card.id === cardId ? { ...card, ...updates, updatedAt: new Date() } : card
//           )
//         })),
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: state.currentBoard.lists.map(list => ({
//             ...list,
//             cards: list.cards.map(card =>
//               card.id === cardId ? { ...card, ...updates, updatedAt: new Date() } : card
//             )
//           }))
//         } : state.currentBoard,
//         isLoading: false
//       }));

//       return { id: cardId, ...updates } as Card;
//     } catch (error) {
//       set({ error: 'Failed to update card', isLoading: false });
//       throw error;
//     }
//   },

//   deleteCard: async (cardId) => {
//     set({ isLoading: true });
//     try {
//       await new Promise(resolve => setTimeout(resolve, 200));
      
//       set(state => ({
//         lists: state.lists.map(list => ({
//           ...list,
//           cards: list.cards.filter(card => card.id !== cardId)
//         })),
//         currentBoard: state.currentBoard ? {
//           ...state.currentBoard,
//           lists: state.currentBoard.lists.map(list => ({
//             ...list,
//             cards: list.cards.filter(card => card.id !== cardId)
//           }))
//         } : state.currentBoard,
//         isLoading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to delete card', isLoading: false });
//       throw error;
//     }
//   },

//   moveCard: async (cardId, newListId, newPosition) => {
//     const { lists } = get();
    
//     // Find the card and its current list
//     let cardToMove: Card | null = null;
//     let oldListId: string | null = null;
    
//     lists.forEach(list => {
//       const card = list.cards.find(c => c.id === cardId);
//       if (card) {
//         cardToMove = card;
//         oldListId = list.id;
//       }
//     });

//     if (!cardToMove || !oldListId) return;

//     // Remove from old list and add to new list
//     const updatedLists = lists.map(list => {
//       if (