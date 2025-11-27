





// // src/lib/mockData.ts
// import { Workspace, Board, List, Card, Project } from '@/types';

// export const mockWorkspaces: Workspace[] = [
//   {
//     id: 'ws-1',
//     name: 'Web Development',
//     description: 'All web development projects and tasks',
//     ownerId: 'user-1',
//     members: ['user-1', 'user-2', 'user-3'],
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date('2024-01-20'),
//   },
// ];

// export const mockBoards: Board[] = [
//   {
//     id: 'board-1',
//     title: 'Website Redesign',
//     description: 'Board for Website Redesign project',
//     workspaceId: 'ws-1',
//     background: 'blue',
//     lists: ['list-1', 'list-2', 'list-3'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-02-01'),
//   },
// ];

// export const mockLists: List[] = [
//   {
//     id: 'list-1',
//     title: 'To Do',
//     position: 0,
//     boardId: 'board-1',
//     cards: ['card-1', 'card-2'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
//   {
//     id: 'list-2',
//     title: 'In Progress',
//     position: 1,
//     boardId: 'board-1',
//     cards: ['card-3'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
//   {
//     id: 'list-3',
//     title: 'Done',
//     position: 2,
//     boardId: 'board-1',
//     cards: ['card-4'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
// ];

// export const mockCards: Card[] = [
//   {
//     id: 'card-1',
//     title: 'Design Homepage',
//     description: 'Create new homepage design',
//     position: 0,
//     listId: 'list-1',
//     labels: ['design', 'high-priority'],
//     attachments: [],
//     assignedMembers: ['user-1'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
//   {
//     id: 'card-2',
//     title: 'Setup Development Environment',
//     description: 'Configure development tools and environments',
//     position: 1,
//     listId: 'list-1',
//     labels: ['development'],
//     attachments: [],
//     assignedMembers: ['user-2'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
//   {
//     id: 'card-3',
//     title: 'Implement Authentication',
//     description: 'Add user authentication system',
//     position: 0,
//     listId: 'list-2',
//     labels: ['development', 'feature'],
//     attachments: [],
//     assignedMembers: ['user-3'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
//   {
//     id: 'card-4',
//     title: 'Project Planning',
//     description: 'Complete initial project planning phase',
//     position: 0,
//     listId: 'list-3',
//     labels: ['planning'],
//     attachments: [],
//     assignedMembers: ['user-1'],
//     createdAt: new Date('2024-01-16'),
//     updatedAt: new Date('2024-01-16'),
//   },
// ];

// export const mockProjects: Project[] = [
//   {
//     id: 'project-1',
//     title: 'Website Redesign 2024',
//     description: 'Complete overhaul of company website with modern design and improved user experience',
//     workspaceId: 'ws-1',
//     boardId: 'board-1',
//     status: 'active',
//     startDate: new Date('2024-01-01'),
//     endDate: new Date('2024-06-30'),
//     members: ['user-1', 'user-2', 'user-3'],
//     labels: ['design', 'development', 'high-priority', 'web'],
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date('2024-01-20'),
//   },
//   {
//     id: 'project-2',
//     title: 'Mobile App Development',
//     description: 'Develop and launch new mobile application for iOS and Android',
//     workspaceId: 'ws-1',
//     status: 'active',
//     startDate: new Date('2024-02-01'),
//     endDate: new Date('2024-08-31'),
//     members: ['user-1', 'user-4'],
//     labels: ['development', 'mobile', 'feature'],
//     createdAt: new Date('2024-02-01'),
//     updatedAt: new Date('2024-02-10'),
//   },
//   {
//     id: 'project-3',
//     title: 'Marketing Campaign Q1',
//     description: 'Q1 marketing campaign planning and execution',
//     workspaceId: 'ws-1',
//     status: 'completed',
//     startDate: new Date('2024-01-01'),
//     endDate: new Date('2024-03-31'),
//     members: ['user-1', 'user-5'],
//     labels: ['marketing', 'completed'],
//     createdAt: new Date('2023-12-15'),
//     updatedAt: new Date('2024-04-01'),
//   },
// ];




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


