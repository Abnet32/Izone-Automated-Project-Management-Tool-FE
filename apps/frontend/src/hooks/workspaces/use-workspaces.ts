import { useState } from 'react';
import { Workspace, Board, Member } from '@/lib/types/workspace';

// Mock data with sample workspaces
const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'All website development projects and tasks',
    emoji: '🚀',
    color: '#3B82F6',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' },
    ],
    boards: [
      {
        id: '1',
        name: 'Frontend Development',
        description: 'React and Next.js development',
        workspaceId: '1',
        columns: [
          { id: '1', name: 'Backlog', position: 0, tasks: [] },
          { id: '2', name: 'To Do', position: 1, tasks: [] },
          { id: '3', name: 'In Progress', position: 2, tasks: [] },
          { id: '4', name: 'Review', position: 3, tasks: [] },
          { id: '5', name: 'Done', position: 4, tasks: [] },
        ],
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Marketing campaigns and content creation',
    emoji: '📈',
    color: '#10B981',
    members: [
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '', role: 'admin' },
      { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '', role: 'member' },
    ],
    boards: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  // Workspace CRUD Operations
  const createWorkspace = (workspaceData: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt' | 'boards'>) => {
    const newWorkspace: Workspace = {
      ...workspaceData,
      id: Date.now().toString(),
      boards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setWorkspaces(prev => [...prev, newWorkspace]);
    return newWorkspace;
  };

  const updateWorkspace = (workspaceId: string, updates: Partial<Workspace>) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? { ...workspace, ...updates, updatedAt: new Date().toISOString() }
        : workspace
    ));
    
    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
    }
  };

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces(prev => prev.filter(workspace => workspace.id !== workspaceId));
    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(null);
    }
  };

  // Board CRUD Operations
  const createBoard = (workspaceId: string, boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'columns'>) => {
    const newBoard: Board = {
      ...boardData,
      id: Date.now().toString(),
      workspaceId,
      columns: [
        { id: '1', name: 'Backlog', position: 0, tasks: [] },
        { id: '2', name: 'To Do', position: 1, tasks: [] },
        { id: '3', name: 'In Progress', position: 2, tasks: [] },
        { id: '4', name: 'Review', position: 3, tasks: [] },
        { id: '5', name: 'Done', position: 4, tasks: [] },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? { ...workspace, boards: [...workspace.boards, newBoard] }
        : workspace
    ));

    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(prev => prev ? { ...prev, boards: [...prev.boards, newBoard] } : null);
    }

    return newBoard;
  };

  const updateBoard = (workspaceId: string, boardId: string, updates: Partial<Board>) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? {
            ...workspace,
            boards: workspace.boards.map(board =>
              board.id === boardId
                ? { ...board, ...updates, updatedAt: new Date().toISOString() }
                : board
            )
          }
        : workspace
    ));

    if (selectedBoard?.id === boardId) {
      setSelectedBoard(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
    }
  };

  const deleteBoard = (workspaceId: string, boardId: string) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? { ...workspace, boards: workspace.boards.filter(board => board.id !== boardId) }
        : workspace
    ));

    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(prev => prev ? { ...prev, boards: prev.boards.filter(board => board.id !== boardId) } : null);
    }

    if (selectedBoard?.id === boardId) {
      setSelectedBoard(null);
    }
  };

  // Member Management
  const addMemberToWorkspace = (workspaceId: string, member: Member) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? { 
            ...workspace, 
            members: [...workspace.members, member],
            updatedAt: new Date().toISOString()
          }
        : workspace
    ));

    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(prev => prev ? { 
        ...prev, 
        members: [...prev.members, member],
        updatedAt: new Date().toISOString()
      } : null);
    }
  };

  const removeMemberFromWorkspace = (workspaceId: string, memberId: string) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId 
        ? { 
            ...workspace, 
            members: workspace.members.filter(m => m.id !== memberId),
            updatedAt: new Date().toISOString()
          }
        : workspace
    ));

    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(prev => prev ? { 
        ...prev, 
        members: prev.members.filter(m => m.id !== memberId),
        updatedAt: new Date().toISOString()
      } : null);
    }
  };

  return {
    // State
    workspaces,
    selectedWorkspace,
    selectedBoard,
    
    // Setters
    setSelectedWorkspace,
    setSelectedBoard,
    
    // Workspace operations
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    
    // Board operations
    createBoard,
    updateBoard,
    deleteBoard,
    
    // Member operations
    addMemberToWorkspace,
    removeMemberFromWorkspace,
  };
}