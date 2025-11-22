export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
  dueDate?: Date;
  labels: string[];
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  cards: Card[];
  createdAt: Date;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  workspaceId: string;
  background?: string;
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
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

export interface BoardWithDetails extends Board {
  lists: List[];
}




