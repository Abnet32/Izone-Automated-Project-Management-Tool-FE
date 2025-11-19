export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  labels: Label[];
  assignees: Member[];
  attachments: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  type: 'design' | 'research' | 'writing' | 'documentation' | 'content' | 'planning';
}

export interface Column {
  id: string;
  name: string;
  type: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  position: number;
  tasks: Task[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
}