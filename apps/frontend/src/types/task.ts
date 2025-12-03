// src/types/task.ts
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'archived';
}

export interface User {
  id: string;
  name: string;
  email: string;
}




// // types/task.ts
// export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
// export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate?: string;
//   projectId: string;
//   assigneeId?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateTaskData {
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate?: string;
//   projectId: string;
// }

// export interface UpdateTaskData {
//   title?: string;
//   description?: string;
//   status?: TaskStatus;
//   priority?: TaskPriority;
//   dueDate?: string;
//   projectId?: string;
// }




// export interface Task {
//   id: string;
//   title: string;
//   description?: string;
//   projectId: string;
//   assignedTo?: string;
//   dueDate?: string;
//   priority: "low" | "medium" | "high";
//   status: "todo" | "in-progress" | "review" | "done";
//   position: number;
//   createdAt: string;
//   updatedAt: string;
//   labels?: string[];
// }

// export interface CreateTaskData {
//   title: string;
//   description?: string;
//   projectId: string;
//   assignedTo?: string;
//   dueDate?: string;
//   priority: "low" | "medium" | "high";
//   status: "todo" | "in-progress" | "review" | "done";
//   labels?: string[];
// }

// export interface UpdateTaskData {
//   title?: string;
//   description?: string;
//   assignedTo?: string;
//   dueDate?: string;
//   priority?: "low" | "medium" | "high";
//   status?: "todo" | "in-progress" | "review" | "done";
//   position?: number;
//   labels?: string[];
// }