import create from "zustand";
import { Board } from "../lib/types";

type State = {
  boards: Board[];
  loading: boolean;
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
  updateBoard: (id: string, payload: Partial<Board>) => void;
};

export const useBoardStore = create<State>((set) => ({
  boards: [],
  loading: false,
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
  updateBoard: (id, payload) =>
    set((state) => ({
      boards: state.boards.map((b) => (b.id === id ? { ...b, ...payload } : b)),
    })),
}));
