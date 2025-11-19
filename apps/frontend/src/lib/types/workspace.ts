export interface Workspace {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  color: string;
  members: Member[];
  boards: Board[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  columns: Column[];
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
}

export interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
}