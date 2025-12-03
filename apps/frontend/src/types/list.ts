import { Card } from './card';

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  cards: string[];
  createdAt: Date;
  updatedAt: Date;
  // mark lists that are auto-created as defaults (e.g., To Do/Doing/Done)
  isDefault?: boolean;
}

export interface ListWithCards extends Omit<List, 'cards'> {
  cards: Card[];
}

export interface CreateListData {
  title: string;
  boardId: string;
  position: number;
}

export interface UpdateListData {
  title?: string;
  position?: number;
}