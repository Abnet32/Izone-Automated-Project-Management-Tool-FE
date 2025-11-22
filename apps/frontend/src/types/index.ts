export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  workspaceId: string;
  background?: string;
  lists: string[]; // Array of list IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  cards: string[]; // Array of card IDs
  createdAt: Date;
  updatedAt: Date;
  // mark lists that are auto-created as defaults (e.g., To Do/Doing/Done)
  isDefault?: boolean;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
  dueDate?: Date;
  labels: string[];
  attachments: string[];
  assignedMembers: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Extended types for components
export interface BoardWithDetails extends Omit<Board, 'lists'> {
  lists: ListWithCards[];
}

export interface ListWithCards extends Omit<List, 'cards'> {
  cards: Card[];
}

export interface CreateBoardData {
  title: string;
  description?: string;
  background?: string;
  workspaceId: string;
}

export interface UpdateBoardData {
  title?: string;
  description?: string;
  background?: string;
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

export interface CreateCardData {
  title: string;
  listId: string;
  position: number;
}

export interface UpdateCardData {
  title?: string;
  description?: string;
  position?: number;
  dueDate?: Date;
  labels?: string[];
  assignedMembers?: string[];
}