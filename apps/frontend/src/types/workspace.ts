export interface Workspace {
  id: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'team';
  color: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
  boardCount: number;
}

export interface CreateWorkspaceData {
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'team';
  color: string;
}

export interface UpdateWorkspaceData {
  name?: string;
  description?: string;
  visibility?: 'public' | 'private' | 'team';
  color?: string;
}



