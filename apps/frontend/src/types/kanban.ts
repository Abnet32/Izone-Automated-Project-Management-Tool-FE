export interface Column {
  id: string;
  title: string;
  projectId: string;
  position: number;
  taskIds: string[];
}

export interface KanbanBoard {
  columns: Column[];
  tasks: any[]; // You can import Task type later if needed
}