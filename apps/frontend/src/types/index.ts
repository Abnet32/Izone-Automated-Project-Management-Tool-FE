// // Workspace types
// export interface Workspace {
//   id: string;
//   name: string;
//   description?: string;
//   members: string[];
//   visibility: 'workspace' | 'private' | 'public';
//   createdAt: string;
//   updatedAt: string;
// }

// // Card types
// export interface ChecklistItem {
//   id: string;
//   text: string;
//   completed: boolean;
// }

// export interface Checklist {
//   id: string;
//   title: string;
//   items: ChecklistItem[];
// }

// export interface Comment {
//   id: string;
//   text: string;
//   userId: string;
//   userName: string;
//   createdAt: string;
// }

// export interface Attachment {
//   id: string;
//   name: string;
//   url: string;
//   type: 'image' | 'pdf' | 'doc' | 'other';
//   uploadedAt: string;
// }

// export interface Label {
//   id: string;
//   text: string;
//   color: string;
// }

// export interface Card {
//   id: string;
//   title: string;
//   description?: string;
//   listId: string;
//   boardId: string;
//   labels: Label[];
//   members: string[]; // user IDs
//   checklists: Checklist[];
//   comments: Comment[];
//   attachments: Attachment[];
//   dueDate?: string;
//   coverImage?: string;
//   order: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // List types
// export interface List {
//   id: string;
//   title: string;
//   boardId: string;
//   cards: Card[];
//   order: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // Board types
// export interface Board {
//   id: string;
//   title: string;
//   description?: string;
//   workspaceId: string;
//   lists: List[];
//   members: string[]; // user IDs
//   background: string; // color or image URL
//   visibility: 'workspace' | 'private' | 'public';
//   labels: Label[]; // board-specific labels
//   createdAt: string;
//   updatedAt: string;
// }

// // Store types
// export interface AppStoreState {
//   // Workspaces
//   workspaces: Workspace[];
//   currentWorkspace: Workspace | null;
  
//   // Boards
//   boards: Board[];
//   currentBoard: Board | null;
  
//   // UI state
//   loading: boolean;
//   error: string | null;
  
//   // Workspace actions
//   createWorkspace: (data: Partial<Workspace>) => Workspace;
//   updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
//   deleteWorkspace: (id: string) => void;
//   getWorkspace: (id: string) => Workspace | undefined;
//   setCurrentWorkspace: (id: string) => void;
//   addWorkspaceMember: (workspaceId: string, userId: string) => void;
//   removeWorkspaceMember: (workspaceId: string, userId: string) => void;
  
//   // Board actions
//   createBoard: (data: Partial<Board>) => Board;
//   updateBoard: (id: string, updates: Partial<Board>) => void;
//   deleteBoard: (id: string) => void;
//   getBoard: (id: string) => Board | undefined;
//   setCurrentBoard: (id: string) => void;
//   addBoardMember: (boardId: string, userId: string) => void;
//   removeBoardMember: (boardId: string, userId: string) => void;
//   addBoardLabel: (boardId: string, label: Label) => void;
//   removeBoardLabel: (boardId: string, labelId: string) => void;
  
//   // List actions
//   createList: (boardId: string, title: string) => List;
//   updateList: (boardId: string, listId: string, updates: Partial<List>) => void;
//   deleteList: (boardId: string, listId: string) => void;
//   reorderLists: (boardId: string, lists: List[]) => void;
  
//   // Card actions
//   createCard: (boardId: string, listId: string, data: Partial<Card>) => Card;
//   updateCard: (boardId: string, listId: string, cardId: string, updates: Partial<Card>) => void;
//   deleteCard: (boardId: string, listId: string, cardId: string) => void;
//   moveCard: (boardId: string, sourceListId: string, destinationListId: string, cardId: string, newIndex?: number) => void;
//   reorderCards: (boardId: string, listId: string, cards: Card[]) => void;
  
//   // Card detail actions
//   addCardLabel: (boardId: string, listId: string, cardId: string, labelId: string) => void;
//   removeCardLabel: (boardId: string, listId: string, cardId: string, labelId: string) => void;
//   addCardMember: (boardId: string, listId: string, cardId: string, userId: string) => void;
//   removeCardMember: (boardId: string, listId: string, cardId: string, userId: string) => void;
//   addChecklist: (boardId: string, listId: string, cardId: string, title: string) => Checklist;
//   updateChecklistItem: (boardId: string, listId: string, cardId: string, checklistId: string, itemId: string, updates: Partial<ChecklistItem>) => void;
//   addComment: (boardId: string, listId: string, cardId: string, text: string, userId: string, userName: string) => Comment;
//   deleteComment: (boardId: string, listId: string, cardId: string, commentId: string) => void;
//   addAttachment: (boardId: string, listId: string, cardId: string, attachment: Attachment) => void;
//   removeAttachment: (boardId: string, listId: string, cardId: string, attachmentId: string) => void;
// }




// Project = Board (Trello model)
export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'archived';
  background: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  // Trello-like properties
  isFavorite: boolean;
  visibility: 'private' | 'workspace' | 'public';
  lastActivity: string;
}

// List = Column (Trello model)
export interface List {
  id: string;
  title: string;
  projectId: string;  // Belongs to a project/board
  position: number;
  createdAt: string;
  updatedAt: string;
}

// Task = Card (Trello model)
export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;     // Belongs to a list/column
  projectId: string;  // Also track which project/board it belongs to
  position: number;
  labels: string[];
  dueDate?: string;
  assigneeId?: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
}

// For detailed project/board view
export interface ProjectWithDetails extends Project {
  lists: List[];
  tasks: Task[];
}