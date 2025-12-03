export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
  dueDate?: Date;
  labels: string[];
  attachments: string[];
  assignedMembers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCardData {
  title: string;
  listId: string;
  position: number;
}

export interface UpdateCardData {
  title?: string;
  description?: string;
  position?: number;
  dueDate?: Date;
  labels?: string[];
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

// export interface CreateCardData {
//   title: string;
//   description?: string;
//   position: number;
//   listId: string;
//   dueDate?: Date;
//   labels?: string[];
// }

// export interface UpdateCardData {
//   title?: string;
//   description?: string;
//   position?: number;
//   listId?: string;
//   dueDate?: Date;
//   labels?: string[];
//   attachments?: string[];
// }