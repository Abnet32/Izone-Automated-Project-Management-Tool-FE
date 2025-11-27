export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "review" | "done";
  position: number;
  createdAt: string;
  updatedAt: string;
  labels?: string[];
}

export interface CreateTaskData {
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "review" | "done";
  labels?: string[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "review" | "done";
  position?: number;
  labels?: string[];
}