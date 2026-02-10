// import { Card } from './card';

import { Card } from "./card";





// types/list.ts - CORRECTED
export interface List {
  id: string;
  title: string;           // Backend uses 'title'
  board_id: string;        // Alias for project_id
  project_id?: string;     // Same as board_id
  status?: 'todo' | 'in-progress' | 'review' | 'done'; // Optional if not used
  position: number;
  description?: string;
  color?: string;
  cards?: Card[];
  created_at: string;
  updated_at: string;
}

export interface CreateListData {
  title: string;           // REQUIRED
  position?: number;
  description?: string;
  color?: string;
}

export interface UpdateListData {
  title?: string;
  position?: number;
  description?: string;
  color?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
}