// src/lib/types.ts
export type Privacy = "workspace" | "private" | "public";

export interface Card {
  id: string;
  title: string;
  description?: string;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  name: string;
  privacy: Privacy;
  background: string; // color or image URL
  lists: List[];
}



// export type Privacy = "workspace" | "private" | "public";

// export type Card = {
//   id: string;
//   title: string;
//   description?: string;
//   labels?: string[];
//   members?: string[];
//   dueDate?: string | null;
//   checklist?: { id: string; title: string; checked: boolean }[];
//   position: number;
// };

// export type List = {
//   id: string;
//   title: string;
//   position: number;
//   cards: Card[];
// };

// export type Board = {
//   id: string;
//   name: string;
//   privacy: Privacy;
//   bg?: string;
//   createdAt: number;
//   lists: List[];
// };
