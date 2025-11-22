export interface Workspace {
  id: string;
  name: string;
  description: string;
  boards: Board[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
  background: string;
  privacy: 'workspace' | 'private' | 'public';
}

export interface Column {
  id: string;
  name: string;
  type: 'todo' | 'inProgress' | 'done' | string;
  boardId: string;
  tasks: Task[];
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Column['type'];
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  labels: Label[];
  assignees: Assignee[];
  attachments: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  boardId: string;
}

export interface Assignee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
}

// Onboarding specific types
export interface OnboardingData {
  workspace: {
    name: string;
    description: string;
  };
  board: {
    name: string;
    description: string;
    privacy: 'workspace' | 'private' | 'public';
    background: string;
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
    role: 'normal' | 'admin' | 'observer';
  }>;
  columns: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    columnId: string;
  }>;
}

export interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}


