export type BoardStatus = 'active' | 'archived';

export interface Board {
  id: string;
  name: string;
  title?: string; // For compatibility
  description?: string;
  color: string;
  background?: string; // For compatibility
  status: BoardStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
  memberCount: number;
  taskCount: number;
  workspaceId?: string;
  lists?: Array<any>; // For compatibility
  // Add other properties from your existing code
  backgroundImage?: string;
  isStarred?: boolean;
  lastActivity?: Date;
}

export interface CreateBoardData {
  name: string;
  description?: string;
  color?: string;
  workspaceId?: string;
}

export interface UpdateBoardData {
  name?: string;
  description?: string;
  color?: string;
  status?: BoardStatus;
  backgroundImage?: string;
  isStarred?: boolean;
}

// export interface Card {
//   id: string;
//   title: string;
//   description?: string;
//   position: number;
//   listId: string;
//   dueDate?: Date;
//   labels: string[];
//   attachments: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface List {
//   id: string;
//   title: string;
//   position: number;
//   boardId: string;
//   cards: Card[];
//   createdAt: Date;
// }

// export interface Board {
//   id: string;
//   title: string;
//   description?: string;
//   workspaceId: string;
//   background?: string;
//   lists: List[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Workspace {
//   id: string;
//   name: string;
//   description?: string;
//   ownerId: string;
//   members: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }


// export interface CreateBoardData {
//   title: string;
//   description?: string;
//   background?: string;
//   workspaceId: string;
// }

// export interface UpdateBoardData {
//   title?: string;
//   description?: string;
//   background?: string;
// }

// export interface BoardWithDetails extends Board {
//   lists: List[];
// }




