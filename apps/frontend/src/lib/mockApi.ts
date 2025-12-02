import { Board } from "./types";

const KEY = "izone_mock_v1";

function readState() {
  if (typeof window === "undefined") return { boards: [] as Board[] };
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const seed = { boards: [] as Board[] };
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function writeState(state: any) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export async function createBoard(payload: Partial<Board>) {
  const s = readState();
  const board: Board = {
    id: `board_${Date.now()}`,
    name: payload.name || "Untitled",
    privacy: payload.privacy || "workspace",
    bg: payload.bg,
    createdAt: Date.now(),
    lists: payload.lists || [],
  };
  s.boards.unshift(board);
  writeState(s);
  return board;
}

export async function getBoards() {
  const s = readState();
  return s.boards;
}
