'use client';

import { useState, useEffect } from 'react';
import { Workspace, Board, Column, Task } from '@/lib/types/kanban';

const initialColumns: Column[] = [
  {
    id: 'todo',
    name: 'To Do',
    type: 'todo',
    boardId: 'board-1',
    tasks: [],
    order: 0,
  },
  {
    id: 'inProgress',
    name: 'In Progress',
    type: 'inProgress',
    boardId: 'board-1',
    tasks: [],
    order: 1,
  },
  {
    id: 'done',
    name: 'Done',
    type: 'done',
    boardId: 'board-1',
    tasks: [],
    order: 2,
  }
];

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('kanban-workspace');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setWorkspace(parsedData.workspace);
        setCurrentBoard(parsedData.currentBoard);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (workspace && currentBoard) {
      localStorage.setItem('kanban-workspace', JSON.stringify({
        workspace,
        currentBoard
      }));
    }
  }, [workspace, currentBoard]);

  const initializeWorkspace = (workspaceData: { name: string; description: string }, boardData: { name: string; description: string; privacy: 'workspace' | 'private' | 'public'; background: string }) => {
    const newWorkspace: Workspace = {
      id: 'workspace-1',
      name: workspaceData.name,
      description: workspaceData.description,
      boards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newBoard: Board = {
      id: 'board-1',
      name: boardData.name,
      description: boardData.description,
      workspaceId: 'workspace-1',
      columns: initialColumns,
      background: boardData.background,
      privacy: boardData.privacy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    newWorkspace.boards.push(newBoard);
    setWorkspace(newWorkspace);
    setCurrentBoard(newBoard);
  };

  const createTask = (taskData: { title: string; description?: string }, columnId: string) => {
    if (!currentBoard) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      description: taskData.description || '',
      status: 'todo',
      priority: 'medium',
      dueDate: undefined,
      labels: [],
      assignees: [],
      attachments: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: 0,
    };

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(column =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      ),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
    return newTask;
  };

  const moveTask = (taskId: string, newColumnId: string) => {
    if (!currentBoard) return;

    const taskToMove = currentBoard.columns
      .flatMap(col => col.tasks)
      .find(task => task.id === taskId);

    if (!taskToMove) return;

    const newColumn = currentBoard.columns.find(col => col.id === newColumnId);
    if (!newColumn) return;

    const updatedTask = {
      ...taskToMove,
      status: newColumn.type,
      updatedAt: new Date().toISOString(),
    };

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(column => ({
        ...column,
        tasks: column.id === newColumnId
          ? [...column.tasks, updatedTask]
          : column.tasks.filter(task => task.id !== taskId)
      })),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === taskId
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        )
      })),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  const deleteTask = (taskId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId)
      })),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  const addColumn = (name: string, type: Column['type']) => {
    if (!currentBoard) return;

    const newColumn: Column = {
      id: `col-${Date.now()}`,
      name,
      type,
      boardId: currentBoard.id,
      tasks: [],
      order: currentBoard.columns.length,
    };

    const updatedBoard = {
      ...currentBoard,
      columns: [...currentBoard.columns, newColumn],
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  const updateColumn = (columnId: string, updates: Partial<Column>) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(column =>
        column.id === columnId
          ? { ...column, ...updates }
          : column
      ),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  const deleteColumn = (columnId: string) => {
    if (!currentBoard || currentBoard.columns.length <= 1) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.filter(col => col.id !== columnId),
      updatedAt: new Date().toISOString(),
    };

    setCurrentBoard(updatedBoard);
  };

  return {
    workspace,
    currentBoard,
    isLoading,
    initializeWorkspace,
    createTask,
    moveTask,
    updateTask,
    deleteTask,
    addColumn,
    updateColumn,
    deleteColumn,
  };
}