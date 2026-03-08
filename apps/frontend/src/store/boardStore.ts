// @ts-ignore - zustand is provided in workspace deps but types may be resolved at build time
import { create, type StateCreator, type SetState, type GetState } from "zustand";
import { boardsAPI, type Board, type CreateBoardData } from "@/lib/api/boards";
import { cardsAPI, type Card as ApiCard } from "@/lib/api/cards";
import { listsAPI, type List as ApiList } from "@/lib/api/lists";

// Local types
type ListStatus = "todo" | "in-progress" | "review" | "done";

interface Card extends ApiCard {
  name: string;
  status: ListStatus;
  project_id: string;
}

interface List {
  id: string;
  title: string;
  position: number;
  board_id: string;
  status: ListStatus;
  cards?: Card[];
  created_at: string;
  updated_at: string;
}

type BoardWithLists = Board & { lists?: List[] };

interface BoardStore {
  boards: BoardWithLists[];
  isLoading: boolean;
  error: string | null;

  fetchWorkspaceBoards: (workspaceId: string) => Promise<void>;
  fetchBoard: (boardId: string) => Promise<void>;
  fetchBoardCards: (boardId: string) => Promise<void>;

  addBoard: (boardData: CreateBoardData & { workspaceId?: string; background?: string; color?: string; privacy?: string }) => Promise<string>;
  addList: (boardId: string, title: string) => Promise<void>;
  updateList: (boardId: string, listId: string, updates: Partial<List>) => Promise<void>;
  deleteList: (boardId: string, listId: string) => Promise<void>;
  addCard: (boardId: string, listId: string, title: string) => Promise<void>;
  updateCard: (boardId: string, listId: string, cardId: string, updates: Partial<Card>) => Promise<void>;
  removeCard: (boardId: string, listId: string, cardId: string) => Promise<void>;
  duplicateCard: (boardId: string, listId: string, cardId: string) => Promise<void>;

  getWorkspaceBoards: (workspaceId: string) => BoardWithLists[];
  getWorkspaceBoardCount: (workspaceId: string) => number;
  updateBoard: (boardId: string, updates: Partial<Board>) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
}

// Helpers
const mapApiCardToCard = (apiCard: ApiCard, projectId: string): Card => ({
  ...apiCard,
  name: apiCard.title,
  status: "todo",
  project_id: projectId,
  list_id: apiCard.list_id,
});

const mapApiListToList = (apiList: ApiList): List => ({
  id: apiList.id,
  title: apiList.title,
  position: apiList.position,
  board_id: apiList.project_id,
  status: "todo",
  created_at: apiList.created_at,
  updated_at: apiList.updated_at,
  cards: [],
});

// Zustand store
const store: StateCreator<BoardStore, [], [], BoardStore> = (set, get) => ({
  boards: [],
  isLoading: false,
  error: null,

  fetchWorkspaceBoards: async (workspaceId) => {
    set({ isLoading: true, error: null });
    try {
      const backendBoards = await boardsAPI.getWorkspaceBoards(workspaceId);
      const boardsWithLists = backendBoards.map((board) => ({ ...board, lists: [] }));
      set({ boards: boardsWithLists, isLoading: false });

      backendBoards.forEach(board => get().fetchBoardCards(board.id));
    } catch (error: any) {
      set({ error: error?.message || "Failed to fetch boards", isLoading: false });
    }
  },

  fetchBoard: async (boardId) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardsAPI.getBoard(boardId);
      const boardWithLists: BoardWithLists = { ...board, lists: (board as any).lists || [] };
      set((state) => ({
        boards: [...state.boards.filter(b => b.id !== boardId), boardWithLists],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error?.message || "Failed to fetch board", isLoading: false });
    }
  },

  fetchBoardCards: async (boardId) => {
    try {
      const apiLists = await listsAPI.getProjectLists(boardId);
      const listsWithCards = await Promise.all(apiLists.map(async (apiList) => {
        const list = mapApiListToList(apiList);
        try {
          const apiCards = await cardsAPI.getListCards(list.id);
          const cards = apiCards.map(c => mapApiCardToCard(c, boardId)).sort((a,b) => a.position - b.position);
          return { ...list, cards };
        } catch {
          return list;
        }
      }));
      listsWithCards.sort((a,b) => a.position - b.position);
      set((state) => ({
        boards: state.boards.map(board => board.id === boardId ? { ...board, lists: listsWithCards } : board)
      }));
    } catch (error) {
      console.error("Error fetching board content:", error);
    }
  },

  addBoard: async (boardData) => {
    try {
      const realBoard = await boardsAPI.createBoard({
        name: boardData.name,
        description: boardData.description,
        background_color: boardData.background || boardData.color || "#0079bf",
        workspace_id: boardData.workspaceId || "default",
      });

      const newBoard: BoardWithLists = {
        id: realBoard.id,
        name: realBoard.name,
        title: realBoard.name,
        description: realBoard.description,
        background_color: realBoard.background_color,
        background: realBoard.background_color,
        color: realBoard.background_color,
        workspace_id: realBoard.workspace_id,
        privacy: (boardData as any).privacy || "workspace",
        archived: false,
        created_by: realBoard.created_by,
        created_at: realBoard.created_at,
        updated_at: realBoard.updated_at,
        lists: [],
      };

      set((state) => ({ boards: [newBoard, ...state.boards] }));
      return realBoard.id;
    } catch (error) {
      console.error("Backend create failed:", error);
      throw error;
    }
  },

  addList: async (boardId, title) => {
    const board = get().boards.find(b => b.id === boardId);
    const position = board?.lists?.length || 0;

    const tempListId = `temp-list-${Date.now()}`;
    const newList: List = {
      id: tempListId,
      title,
      position,
      board_id: boardId,
      status: "todo",
      cards: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? { ...b, lists: [...(b.lists || []), newList] } : b)
    }));

    try {
      const apiList = await listsAPI.createList(boardId, { title, position });
      const realList = mapApiListToList(apiList);

      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? {
          ...b,
          lists: b.lists?.map(l => l.id === tempListId ? { ...realList, cards: [] } : l)
        } : b)
      }));
    } catch (error) {
      console.error("Failed to add list:", error);
      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? { ...b, lists: b.lists?.filter(l => l.id !== tempListId) } : b)
      }));
    }
  },

  updateList: async (boardId, listId, updates) => {
    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? {
        ...b,
        lists: b.lists?.map(l => l.id === listId ? { ...l, ...updates } : l)
      } : b)
    }));
    try {
      await listsAPI.updateList(boardId, listId, { title: updates.title, position: updates.position });
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  },

  deleteList: async (boardId, listId) => {
    const previousLists = get().boards.find(b => b.id === boardId)?.lists;
    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? { ...b, lists: b.lists?.filter(l => l.id !== listId) } : b)
    }));
    try {
      await listsAPI.deleteList(boardId, listId);
    } catch {
      if (previousLists) set(state => ({
        boards: state.boards.map(b => b.id === boardId ? { ...b, lists: previousLists } : b)
      }));
    }
  },

  addCard: async (boardId, listId, title) => {
    const board = get().boards.find(b => b.id === boardId);
    const list = board?.lists?.find(l => l.id === listId);
    const position = list?.cards?.length || 0;

    const tempCardId = `temp-card-${Date.now()}`;
    const tempCard: Card = {
      id: tempCardId,
      title,
      name: title,
      status: "todo",
      project_id: boardId,
      list_id: listId,
      position,
      created_by: "current_user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      priority: "medium",
      description: "",
      due_date: undefined,
    };

    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? {
        ...b,
        lists: b.lists?.map(l => l.id === listId ? { ...l, cards: [...(l.cards || []), tempCard] } : l)
      } : b)
    }));

    try {
      const newApiCard = await cardsAPI.createCard(listId, { title, description: "", position, priority: "medium" });
      const newCard = mapApiCardToCard(newApiCard, boardId);

      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? {
          ...b,
          lists: b.lists?.map(l => l.id === listId ? {
            ...l,
            cards: l.cards?.map(c => c.id === tempCardId ? newCard : c)
          } : l)
        } : b)
      }));
    } catch (error) {
      console.error("Backend create card failed:", error);
      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? {
          ...b,
          lists: b.lists?.map(l => l.id === listId ? { ...l, cards: l.cards?.filter(c => c.id !== tempCardId) } : l)
        } : b)
      }));
    }
  },

  updateCard: async (boardId, listId, cardId, updates) => {
    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? {
        ...b,
        lists: b.lists?.map(l => l.id === listId ? {
          ...l,
          cards: l.cards?.map(c => c.id === cardId ? { ...c, ...updates } : c)
        } : l)
      } : b)
    }));

    try {
      const updateData: Record<string, any> = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.name && !updates.title) updateData.title = updates.name;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.due_date !== undefined) updateData.due_date = updates.due_date;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.position !== undefined) updateData.position = updates.position;
      if (updates.list_id !== undefined) updateData.list_id = updates.list_id;

      await cardsAPI.updateCard(listId, cardId, updateData);
    } catch (error) {
      console.error("Backend update card failed:", error);
    }
  },

  removeCard: async (boardId, listId, cardId) => {
    const previousBoard = get().boards.find(b => b.id === boardId);
    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? {
        ...b,
        lists: b.lists?.map(l => l.id === listId ? { ...l, cards: l.cards?.filter(c => c.id !== cardId) } : l)
      } : b)
    }));
    try {
      await cardsAPI.deleteCard(listId, cardId);
    } catch {
      if (previousBoard) set(state => ({
        boards: state.boards.map(b => b.id === boardId ? previousBoard : b)
      }));
    }
  },

  duplicateCard: async (boardId, listId, cardId) => {
    try {
      const newApiCard = await cardsAPI.duplicateCard(listId, cardId);
      const newCard = mapApiCardToCard(newApiCard, boardId);

      set(state => ({
        boards: state.boards.map(b => b.id === boardId ? {
          ...b,
          lists: b.lists?.map(l => l.id === listId ? { ...l, cards: [...(l.cards || []), newCard] } : l)
        } : b)
      }));
    } catch (error) {
      console.error("Backend duplicate card failed:", error);
      throw error;
    }
  },

  getWorkspaceBoards: (workspaceId) => get().boards.filter(b => b.workspace_id === workspaceId),
  getWorkspaceBoardCount: (workspaceId) => get().boards.filter(b => b.workspace_id === workspaceId).length,

  deleteBoard: async (boardId) => {
    const previousBoards = get().boards;
    set(state => ({ boards: state.boards.filter(b => b.id !== boardId) }));
    try {
      await boardsAPI.deleteBoard(boardId);
    } catch {
      set({ boards: previousBoards });
      throw new Error("Failed to delete board");
    }
  },

  updateBoard: async (boardId, updates) => {
    set(state => ({
      boards: state.boards.map(b => b.id === boardId ? { ...b, ...updates } : b)
    }));

    try {
      const apiUpdates: any = { ...updates };
      if (updates.title) apiUpdates.name = updates.title;
      await boardsAPI.updateBoard(boardId, apiUpdates);
    } catch {
      console.error("Failed to update board");
    }
  },
});

export const useBoardStore = create<BoardStore>(store);