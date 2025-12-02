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
