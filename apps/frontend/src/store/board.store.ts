import { create } from "zustand";

export type Board = {
  id: string;
  name: string;
  description?: string;
  workspaceId?: string;
  color?: string;
  status?: "active" | "archived";
  isStarred?: boolean;
  memberCount?: number;
  taskCount?: number;
};

type BoardState = {
  boards: Board[];
  createBoard: (board: Partial<Board>) => Promise<Board>;
  updateBoard: (id: string, payload: Partial<Board>) => void;
  deleteBoard: (id: string) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],

  createBoard: async (board) => {
    const newBoard: Board = {
      id: `board_${Date.now()}`,
      name: board.name || "Untitled",
      description: board.description,
      workspaceId: board.workspaceId,
      color: board.color,
      status: "active",
      isStarred: false,
      memberCount: 0,
      taskCount: 0,
    };
    set((state) => ({ boards: [newBoard, ...state.boards] }));
    return newBoard;
  },

  updateBoard: (id, payload) => {
    set((state) => ({
      boards: state.boards.map((b) => (b.id === id ? { ...b, ...payload } : b)),
    }));
  },

  deleteBoard: (id) => {
    set((state) => ({
      boards: state.boards.filter((b) => b.id !== id),
    }));
  },
}));





// import { create } from 'zustand';
// import { Board, CreateBoardData } from '@/types/board';

// interface BoardStore {
//   boards: Board[];
//   createBoard: (boardData: CreateBoardData) => Board;
//   updateBoard: (id: string, data: Partial<Board>) => void;
//   deleteBoard: (id: string) => void;
//   getBoard: (id: string) => Board | undefined;
// }

// // Demo data
// const initialBoards: Board[] = [
//   {
//     id: '1',
//     name: 'Project Alpha',
//     description: 'Main project board',
//     color: '#0079BF',
//     status: 'active',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     createdBy: 'user1',
//     memberCount: 5,
//     taskCount: 12,
//   },
//   {
//     id: '2',
//     name: 'Marketing',
//     description: 'Marketing campaigns',
//     color: '#D29034',
//     status: 'active',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     createdBy: 'user1',
//     memberCount: 3,
//     taskCount: 8,
//   },
// ];

// export const useBoardStore = create<BoardStore>((set, get) => ({
//   boards: initialBoards,
  
//   createBoard: (boardData: CreateBoardData) => {
//     const newBoard: Board = {
//       id: `board-${Date.now()}`,
//       name: boardData.name,
//       description: boardData.description,
//       color: boardData.color || '#0079BF',
//       status: 'active',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       createdBy: 'user1', // Replace with actual user ID
//       memberCount: 1,
//       taskCount: 0,
//     };
    
//     set((state) => ({
//       boards: [...state.boards, newBoard],
//     }));
    
//     return newBoard;
//   },
  
//   updateBoard: (id: string, data: Partial<Board>) => {
//     set((state) => ({
//       boards: state.boards.map((board) =>
//         board.id === id
//           ? { ...board, ...data, updatedAt: new Date() }
//           : board
//       ),
//     }));
//   },
  
//   deleteBoard: (id: string) => {
//     set((state) => ({
//       boards: state.boards.filter((board) => board.id !== id),
//     }));
//   },
  
//   getBoard: (id: string) => {
//     return get().boards.find((board) => board.id === id);
//   },
// }));



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Board, CreateBoardData, UpdateBoardData } from '@/types/board';
// import { v4 as uuidv4 } from 'uuid';

// interface BoardStore {
//   boards: Board[];
//   archivedBoards: Board[];
  
//   // Actions
//   createBoard: (data: CreateBoardData) => Board;
//   updateBoard: (id: string, data: UpdateBoardData) => void;
//   archiveBoard: (id: string) => void;
//   restoreBoard: (id: string) => void;
//   deleteBoard: (id: string) => void;
//   getActiveBoards: () => Board[];
//   getArchivedBoards: () => Board[];
//   getBoardById: (id: string) => Board | undefined;
// }

// export const useBoardStore = create<BoardStore>()(
//   persist(
//     (set, get) => ({
//       boards: [],
//       archivedBoards: [],

//       createBoard: (data) => {
//         const newBoard: Board = {
//           id: uuidv4(),
//           name: data.name,
//           description: data.description || '',
//           color: data.color || getRandomColor(),
//           status: 'active',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           createdBy: 'current-user-id', // In real app, get from auth
//           memberCount: 1,
//           taskCount: 0,
//         };

//         set((state) => ({
//           boards: [newBoard, ...state.boards],
//         }));

//         return newBoard;
//       },

//       updateBoard: (id, data) => {
//         set((state) => ({
//           boards: state.boards.map((board) =>
//             board.id === id
//               ? {
//                   ...board,
//                   ...data,
//                   updatedAt: new Date(),
//                 }
//               : board
//           ),
//         }));
//       },

//       archiveBoard: (id) => {
//         const boardToArchive = get().boards.find((b) => b.id === id);
//         if (!boardToArchive) return;

//         set((state) => ({
//           boards: state.boards.filter((b) => b.id !== id),
//           archivedBoards: [
//             { ...boardToArchive, status: 'archived', updatedAt: new Date() },
//             ...state.archivedBoards,
//           ],
//         }));
//       },

//       restoreBoard: (id) => {
//         const boardToRestore = get().archivedBoards.find((b) => b.id === id);
//         if (!boardToRestore) return;

//         set((state) => ({
//           archivedBoards: state.archivedBoards.filter((b) => b.id !== id),
//           boards: [
//             { ...boardToRestore, status: 'active', updatedAt: new Date() },
//             ...state.boards,
//           ],
//         }));
//       },

//       deleteBoard: (id) => {
//         set((state) => ({
//           boards: state.boards.filter((b) => b.id !== id),
//           archivedBoards: state.archivedBoards.filter((b) => b.id !== id),
//         }));
//       },

//       getActiveBoards: () => {
//         return get().boards;
//       },

//       getArchivedBoards: () => {
//         return get().archivedBoards;
//       },

//       getBoardById: (id) => {
//         return [...get().boards, ...get().archivedBoards].find((b) => b.id === id);
//       },
//     }),
//     {
//       name: 'board-storage',
//       partialize: (state) => ({
//         boards: state.boards.filter((b) => b.status === 'active'),
//         archivedBoards: state.archivedBoards,
//       }),
//     }
//   )
// );

// // Helper function to generate random colors
// function getRandomColor(): string {
//   const colors = [
//     '#3B82F6', // Blue
//     '#8B5CF6', // Purple
//     '#10B981', // Green
//     '#F59E0B', // Yellow
//     '#EF4444', // Red
//     '#EC4899', // Pink
//     '#6366F1', // Indigo
//     '#14B8A6', // Teal
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// }





// "use client";

// import { create } from "zustand";
// import { v4 as uuid } from "uuid";
// import { Board, List, Card } from "@/types/board";

// interface BoardState {
//   boards: Board[];
//   loading: boolean;
//   error: string | null;
  
//   addBoard: (board: Board) => void;
//   addList: (boardId: string, listTitle: string) => void;
//   addCard: (boardId: string, listId: string, cardTitle: string, description?: string) => void;
//   updateCard: (boardId: string, listId: string, cardId: string, updates: Partial<Card>) => void;
//   deleteCard: (boardId: string, listId: string, cardId: string) => void;
//   updateList: (boardId: string, listId: string, updates: Partial<List>) => void;
//   deleteList: (boardId: string, listId: string) => void;
//   updateBoard: (boardId: string, updates: Partial<Board>) => void;
//   deleteBoard: (boardId: string) => void;
//   moveCard: (boardId: string, fromListId: string, toListId: string, cardId: string) => void;
//   getBoard: (boardId: string) => Board | undefined;
// }

// export const useBoardStore = create<BoardState>((set, get) => ({
//   boards: [],
//   loading: false,
//   error: null,
  
//   addBoard: (board) => set((state) => ({ 
//     boards: [...state.boards, board] 
//   })),

//   addList: (boardId, listTitle) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? { 
//             ...board, 
//             lists: [...board.lists, { 
//               id: uuid(), 
//               title: listTitle, 
//               cards: [], 
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString()
//             }],
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   addCard: (boardId, listId, cardTitle, description = "") => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? {
//             ...board,
//             lists: board.lists.map((list) =>
//               list.id === listId
//                 ? { 
//                     ...list, 
//                     cards: [...list.cards, { 
//                       id: uuid(), 
//                       title: cardTitle, 
//                       description,
//                       createdAt: new Date().toISOString(),
//                       updatedAt: new Date().toISOString()
//                     }],
//                     updatedAt: new Date().toISOString()
//                   }
//                 : list
//             ),
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   updateCard: (boardId, listId, cardId, updates) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? {
//             ...board,
//             lists: board.lists.map((list) =>
//               list.id === listId
//                 ? {
//                     ...list,
//                     cards: list.cards.map((card) =>
//                       card.id === cardId
//                         ? { ...card, ...updates, updatedAt: new Date().toISOString() }
//                         : card
//                     ),
//                     updatedAt: new Date().toISOString()
//                   }
//                 : list
//             ),
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   deleteCard: (boardId, listId, cardId) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? {
//             ...board,
//             lists: board.lists.map((list) =>
//               list.id === listId
//                 ? {
//                     ...list,
//                     cards: list.cards.filter((card) => card.id !== cardId),
//                     updatedAt: new Date().toISOString()
//                   }
//                 : list
//             ),
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   updateList: (boardId, listId, updates) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? {
//             ...board,
//             lists: board.lists.map((list) =>
//               list.id === listId
//                 ? { ...list, ...updates, updatedAt: new Date().toISOString() }
//                 : list
//             ),
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   deleteList: (boardId, listId) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? {
//             ...board,
//             lists: board.lists.filter((list) => list.id !== listId),
//             updatedAt: new Date().toISOString()
//           }
//         : board
//     )
//   })),

//   updateBoard: (boardId, updates) => set((state) => ({
//     boards: state.boards.map((board) =>
//       board.id === boardId
//         ? { ...board, ...updates, updatedAt: new Date().toISOString() }
//         : board
//     )
//   })),

//   deleteBoard: (boardId) => set((state) => ({
//     boards: state.boards.filter((board) => board.id !== boardId)
//   })),

//   moveCard: (boardId, fromListId, toListId, cardId) => {
//     const board = get().boards.find((b) => b.id === boardId);
//     if (!board) return;

//     const fromList = board.lists.find((l) => l.id === fromListId);
//     const toList = board.lists.find((l) => l.id === toListId);
    
//     if (!fromList || !toList) return;

//     const card = fromList.cards.find((c) => c.id === cardId);
//     if (!card) return;

//     set((state) => ({
//       boards: state.boards.map((board) =>
//         board.id === boardId
//           ? {
//               ...board,
//               lists: board.lists.map((list) => {
//                 if (list.id === fromListId) {
//                   return {
//                     ...list,
//                     cards: list.cards.filter((c) => c.id !== cardId),
//                     updatedAt: new Date().toISOString()
//                   };
//                 }
//                 if (list.id === toListId) {
//                   return {
//                     ...list,
//                     cards: [...list.cards, card],
//                     updatedAt: new Date().toISOString()
//                   };
//                 }
//                 return list;
//               }),
//               updatedAt: new Date().toISOString()
//             }
//           : board
//       )
//     }));
//   },

//   getBoard: (boardId) => {
//     return get().boards.find((board) => board.id === boardId);
//   },
// }));




// Remove this circular import and export
// export { boardStore };

// "use client";

// import { create } from "zustand";
// import { Board, BoardStoreState } from "@/types/board";
// import { v4 as uuid } from "uuid";
// import { boardStore } from "@/lib/boardStore";

// export const boardStore = create<BoardStoreState>()((set, get) => ({
//   boards: [],
//   loading: false,
//   error: null,

//   createBoard: (data) => {
//     const newBoard: Board = {
//       id: uuid(),
//       title: data.title || "Untitled Board",
//       description: data.description || "",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     set({ boards: [...get().boards, newBoard] });
//   },

//   updateBoard: (id, updates) => {
//     set({
//       boards: get().boards.map((b) =>
//         b.id === id
//           ? { ...b, ...updates, updatedAt: new Date().toISOString() }
//           : b
//       ),
//     });
//   },

//   deleteBoard: (id) => {
//     set({ boards: get().boards.filter((b) => b.id !== id) });
//   },

//   getBoard: (id) => get().boards.find((b) => b.id === id),
// }));
