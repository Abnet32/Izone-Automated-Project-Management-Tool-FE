
import { Board } from "@/types/board";
import { List } from "@/types/board";
import { Card } from "@/types/card";
import { Workspace } from "@/types/board";

export const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Web Development',
    description: 'All web development projects and tasks',
    ownerId: 'user-1',
    members: ['user-1', 'user-2', 'user-3'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
 
];

// Start with completely empty arrays
export const mockBoards: Board[] = [];
export const mockLists: List[] = [];
export const mockCards: Card[] = [];


