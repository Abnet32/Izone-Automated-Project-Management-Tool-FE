// src/store/boardStore.ts - SIMPLIFIED WORKING VERSION
import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { Board, List, Card } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

interface BoardState {
  boards: Board[];
  
  // Board operations
  addBoard: (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBoard: (boardId: string, data: Partial<Board>) => void;
  removeBoard: (boardId: string) => void;
  getBoard: (boardId: string) => Board | undefined;
  
  // List operations
  addList: (boardId: string, listTitle: string) => void;
  updateList: (boardId: string, listId: string, data: Partial<List>) => void;
  removeList: (boardId: string, listId: string) => void;
  
  // Card operations
  addCard: (boardId: string, listId: string, cardTitle: string) => void;
  updateCard: (boardId: string, listId: string, cardId: string, data: Partial<Card>) => void;
  removeCard: (boardId: string, listId: string, cardId: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],

      // Create board with all required fields
      addBoard: (boardData) => set((state) => {
        const newBoard: Board = {
          id: uuidv4(),
          ...boardData,
          lists: boardData.lists || [], // Ensure lists exists
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return { boards: [...state.boards, newBoard] };
      }),
      
      updateBoard: (boardId, data) => set((state) => ({
        boards: state.boards.map(b => b.id === boardId ? { 
          ...b, 
          ...data,
          updatedAt: new Date().toISOString()
        } : b)
      })),
      
      removeBoard: (boardId) => set((state) => ({
        boards: state.boards.filter(b => b.id !== boardId)
      })),
      
      getBoard: (boardId) => get().boards.find(b => b.id === boardId),

      // Add list with proper List object
      addList: (boardId, listTitle) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          const newList: List = {
            id: uuidv4(),
            title: listTitle,
            cards: [],
            position: b.lists?.length || 0
          };
          
          return {
            ...b,
            lists: [...(b.lists || []), newList],
            updatedAt: new Date().toISOString()
          };
        })
      })),
      
      updateList: (boardId, listId, data) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          return {
            ...b,
            lists: (b.lists || []).map(l => 
              l.id === listId ? { ...l, ...data } : l
            ),
            updatedAt: new Date().toISOString()
          };
        })
      })),
      
      removeList: (boardId, listId) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          return {
            ...b,
            lists: (b.lists || []).filter(l => l.id !== listId),
            updatedAt: new Date().toISOString()
          };
        })
      })),

      // Add card
      addCard: (boardId, listId, cardTitle) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          const newCard: Card = {
            id: uuidv4(),
            title: cardTitle,
          };
          
          return {
            ...b,
            lists: (b.lists || []).map(l => {
              if (l.id !== listId) return l;
              
              return {
                ...l,
                cards: [...(l.cards || []), newCard]
              };
            }),
            updatedAt: new Date().toISOString()
          };
        })
      })),
      
      updateCard: (boardId, listId, cardId, data) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          return {
            ...b,
            lists: (b.lists || []).map(l => {
              if (l.id !== listId) return l;
              
              return {
                ...l,
                cards: (l.cards || []).map(c => 
                  c.id === cardId ? { ...c, ...data } : c
                )
              };
            }),
            updatedAt: new Date().toISOString()
          };
        })
      })),
      
      removeCard: (boardId, listId, cardId) => set((state) => ({
        boards: state.boards.map(b => {
          if (b.id !== boardId) return b;
          
          return {
            ...b,
            lists: (b.lists || []).map(l => {
              if (l.id !== listId) return l;
              
              return {
                ...l,
                cards: (l.cards || []).filter(c => c.id !== cardId)
              };
            }),
            updatedAt: new Date().toISOString()
          };
        })
      })),
    }),
    {
      name: 'board-storage',
    }
  )
);



