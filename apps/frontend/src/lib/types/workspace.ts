// lib/types/workspace.ts
export interface Workspace {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  members: Member[];
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  members: Member[];
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// // lib/types/workspace.ts
// export interface Board {
//   id: string;
//   name: string;
//   description: string;
//   workspaceId: string;
//   members: Member[];
//   // CHANGED: columns -> lists
//   lists: List[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface List {
//   id: string;
//   title: string;
//   cards: Card[];
// }

// export interface Card {
//   id: string;
//   title: string;
//   description?: string;
//   // Add other card properties as needed
// }



