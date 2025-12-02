// src/store/boardStore.ts
import { create } from "zustand";
import { Board, List, Card } from "../lib/types";

interface BoardState {
  boards: Board[];
  addBoard: (board: Board) => void;
  updateBoard: (boardId: string, data: Partial<Board>) => void;
  removeBoard: (boardId: string) => void;

  addList: (boardId: string, list: List) => void;
  updateList: (boardId: string, listId: string, data: Partial<List>) => void;
  removeList: (boardId: string, listId: string) => void;

  addCard: (boardId: string, listId: string, card: Card) => void;
  updateCard: (boardId: string, listId: string, cardId: string, data: Partial<Card>) => void;
  removeCard: (boardId: string, listId: string, cardId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],

  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  updateBoard: (boardId, data) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? { ...b, ...data } : b)
  })),
  removeBoard: (boardId) => set((state) => ({
    boards: state.boards.filter(b => b.id !== boardId)
  })),

  addList: (boardId, list) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? { ...b, lists: [...b.lists, list] } : b)
  })),
  updateList: (boardId, listId, data) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? {
      ...b,
      lists: b.lists.map(l => l.id === listId ? { ...l, ...data } : l)
    } : b)
  })),
  removeList: (boardId, listId) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? {
      ...b,
      lists: b.lists.filter(l => l.id !== listId)
    } : b)
  })),

  addCard: (boardId, listId, card) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? {
      ...b,
      lists: b.lists.map(l => l.id === listId ? { ...l, cards: [...l.cards, card] } : l)
    } : b)
  })),
  updateCard: (boardId, listId, cardId, data) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? {
      ...b,
      lists: b.lists.map(l => l.id === listId ? {
        ...l,
        cards: l.cards.map(c => c.id === cardId ? { ...c, ...data } : c)
      } : l)
    } : b)
  })),
  removeCard: (boardId, listId, cardId) => set((state) => ({
    boards: state.boards.map(b => b.id === boardId ? {
      ...b,
      lists: b.lists.map(l => l.id === listId ? {
        ...l,
        cards: l.cards.filter(c => c.id !== cardId)
      } : l)
    } : b)
  })),
}));



// import create from "zustand";
// import { Board } from "../lib/types";

// type State = {
//   boards: Board[];
//   loading: boolean;
//   setBoards: (boards: Board[]) => void;
//   addBoard: (board: Board) => void;
//   updateBoard: (id: string, payload: Partial<Board>) => void;
// };

// export const useBoardStore = create<State>((set) => ({
//   boards: [],
//   loading: false,
//   setBoards: (boards) => set({ boards }),
//   addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
//   updateBoard: (id, payload) =>
//     set((state) => ({
//       boards: state.boards.map((b) => (b.id === id ? { ...b, ...payload } : b)),
//     })),
// }));
