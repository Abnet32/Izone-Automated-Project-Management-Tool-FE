// hooks/kanban/use-kanban.ts
'use client';

import { useState, useEffect } from 'react';
import { Task, Column, Board } from '@/lib/types/kanban';

const initialColumns: Column[] = [
  {
    id: 'backlog',
    name: 'Backlog',
    type: 'backlog',
    tasks: []
  },
  {
    id: 'todo',
    name: 'To Do',
    type: 'todo',
    tasks: []
  },
  {
    id: 'inProgress',
    name: 'In Progress',
    type: 'inProgress',
    tasks: []
  },
  {
    id: 'review',
    name: 'Review',
    type: 'review',
    tasks: []
  },
  {
    id: 'done',
    name: 'Done',
    type: 'done',
    tasks: []
  }
];

const mockLabels = [
  { id: '1', name: 'Design', color: '#8B5CF6', type: 'design' },
  { id: '2', name: 'Writing', color: '#10B981', type: 'writing' },
  { id: '3', name: 'Research', color: '#3B82F6', type: 'research' },
  { id: '4', name: 'Documentation', color: '#6B7280', type: 'documentation' },
];

const mockAssignees = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' as const },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' as const },
];

export function useKanban() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('kanban-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setColumns(parsedData.columns || initialColumns);
      } catch (error) {
        console.error('Error loading saved data:', error);
        // Initialize with sample data
        initializeSampleData();
      }
    } else {
      initializeSampleData();
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever columns change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kanban-data', JSON.stringify({ columns }));
    }
  }, [columns, isLoaded]);

  const initializeSampleData = () => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Create project documentation',
        description: 'Write comprehensive documentation for the new project',
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        labels: [mockLabels[0], mockLabels[3]],
        assignees: [mockAssignees[0]],
        attachments: 2,
        comments: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Design user interface mockups',
        description: 'Create wireframes and mockups for the main dashboard',
        status: 'inProgress',
        priority: 'medium',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        labels: [mockLabels[0]],
        assignees: [mockAssignees[1]],
        attachments: 5,
        comments: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Research competitor products',
        description: 'Analyze features and pricing of competitor products',
        status: 'backlog',
        priority: 'low',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        labels: [mockLabels[2]],
        assignees: [],
        attachments: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    const sampleColumns = initialColumns.map(col => ({
      ...col,
      tasks: sampleTasks.filter(task => task.status === col.type)
    }));

    setColumns(sampleColumns);
  };

  const moveTask = (taskId: string, newStatus: Column['type']) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        // Remove task from all columns
        const filteredTasks = column.tasks.filter(task => task.id !== taskId);
        
        // Add task to the target column with updated status
        if (column.type === newStatus) {
          const taskToMove = prevColumns
            .flatMap(col => col.tasks)
            .find(task => task.id === taskId);
          
          if (taskToMove) {
            const updatedTask = {
              ...taskToMove,
              status: newStatus,
              updatedAt: new Date().toISOString()
            };
            return {
              ...column,
              tasks: [...filteredTasks, updatedTask]
            };
          }
        }
        
        return {
          ...column,
          tasks: filteredTasks
        };
      });
    });
  };

  const addTask = (taskData: { title: string }, columnType: Column['type']) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: '',
      status: columnType,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      labels: [],
      assignees: [],
      attachments: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.type === columnType
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  const updateTask = (updatedTask: Task) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === updatedTask.id 
            ? { ...updatedTask, updatedAt: new Date().toISOString() }
            : task
        )
      }))
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId)
      }))
    );
  };

  const handleDragStart = (task: Task) => {
    setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const newColumnType = over.id;

    if (newColumnType && ['backlog', 'todo', 'inProgress', 'review', 'done'].includes(newColumnType)) {
      moveTask(taskId, newColumnType as Column['type']);
    }

    setActiveTask(null);
  };

  const addColumn = (name: string, type: Column['type']) => {
    const newColumn: Column = {
      id: type,
      name,
      type,
      tasks: []
    };
    setColumns(prev => [...prev, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    setColumns(prev => prev.filter(col => col.id !== columnId));
  };

  return {
    columns,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    addColumn,
    deleteColumn,
    activeTask,
    handleDragStart,
    handleDragEnd,
    isLoaded
  };
}


// // hooks/kanban/use-kanban.ts
// 'use client';

// import { useState, useEffect } from 'react';
// import { Task, Column, Board } from '@/lib/types/kanban';

// const initialColumns: Column[] = [
//   {
//     id: 'backlog',
//     name: 'Backlog',
//     type: 'backlog',
//     tasks: []
//   },
//   {
//     id: 'todo',
//     name: 'To Do',
//     type: 'todo',
//     tasks: []
//   },
//   {
//     id: 'inProgress',
//     name: 'In Progress',
//     type: 'inProgress',
//     tasks: []
//   },
//   {
//     id: 'review',
//     name: 'Review',
//     type: 'review',
//     tasks: []
//   },
//   {
//     id: 'done',
//     name: 'Done',
//     type: 'done',
//     tasks: []
//   }
// ];

// const mockLabels = [
//   { id: '1', name: 'Design', color: '#8B5CF6', type: 'design' },
//   { id: '2', name: 'Writing', color: '#10B981', type: 'writing' },
//   { id: '3', name: 'Research', color: '#3B82F6', type: 'research' },
//   { id: '4', name: 'Documentation', color: '#6B7280', type: 'documentation' },
// ];

// const mockAssignees = [
//   { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' as const },
//   { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' as const },
// ];

// export function useKanban() {
//   const [columns, setColumns] = useState<Column[]>(initialColumns);
//   const [activeTask, setActiveTask] = useState<Task | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('kanban-data');
//     if (savedData) {
//       try {
//         const parsedData = JSON.parse(savedData);
//         setColumns(parsedData.columns || initialColumns);
//       } catch (error) {
//         console.error('Error loading saved data:', error);
//         // Initialize with sample data
//         initializeSampleData();
//       }
//     } else {
//       initializeSampleData();
//     }
//     setIsLoaded(true);
//   }, []);

//   // Save to localStorage whenever columns change
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('kanban-data', JSON.stringify({ columns }));
//     }
//   }, [columns, isLoaded]);

//   const initializeSampleData = () => {
//     const sampleTasks: Task[] = [
//       {
//         id: '1',
//         title: 'Create project documentation',
//         description: 'Write comprehensive documentation for the new project',
//         status: 'todo',
//         priority: 'high',
//         dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         labels: [mockLabels[0], mockLabels[3]],
//         assignees: [mockAssignees[0]],
//         attachments: 2,
//         comments: 3,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//       {
//         id: '2',
//         title: 'Design user interface mockups',
//         description: 'Create wireframes and mockups for the main dashboard',
//         status: 'inProgress',
//         priority: 'medium',
//         dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         labels: [mockLabels[0]],
//         assignees: [mockAssignees[1]],
//         attachments: 5,
//         comments: 1,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//       {
//         id: '3',
//         title: 'Research competitor products',
//         description: 'Analyze features and pricing of competitor products',
//         status: 'backlog',
//         priority: 'low',
//         dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         labels: [mockLabels[2]],
//         assignees: [],
//         attachments: 0,
//         comments: 0,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       }
//     ];

//     const sampleColumns = initialColumns.map(col => ({
//       ...col,
//       tasks: sampleTasks.filter(task => task.status === col.type)
//     }));

//     setColumns(sampleColumns);
//   };

//   const moveTask = (taskId: string, newStatus: Column['type']) => {
//     setColumns(prevColumns => {
//       return prevColumns.map(column => {
//         // Remove task from all columns
//         const filteredTasks = column.tasks.filter(task => task.id !== taskId);
        
//         // Add task to the target column with updated status
//         if (column.type === newStatus) {
//           const taskToMove = prevColumns
//             .flatMap(col => col.tasks)
//             .find(task => task.id === taskId);
          
//           if (taskToMove) {
//             const updatedTask = {
//               ...taskToMove,
//               status: newStatus,
//               updatedAt: new Date().toISOString()
//             };
//             return {
//               ...column,
//               tasks: [...filteredTasks, updatedTask]
//             };
//           }
//         }
        
//         return {
//           ...column,
//           tasks: filteredTasks
//         };
//       });
//     });
//   };

//   const addTask = (taskData: { title: string }, columnType: Column['type']) => {
//     const newTask: Task = {
//       id: Date.now().toString(),
//       title: taskData.title,
//       description: '',
//       status: columnType,
//       priority: 'medium',
//       dueDate: new Date().toISOString().split('T')[0],
//       labels: [],
//       assignees: [],
//       attachments: 0,
//       comments: 0,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     setColumns(prevColumns =>
//       prevColumns.map(column =>
//         column.type === columnType
//           ? { ...column, tasks: [...column.tasks, newTask] }
//           : column
//       )
//     );
//   };

//   const updateTask = (updatedTask: Task) => {
//     setColumns(prevColumns =>
//       prevColumns.map(column => ({
//         ...column,
//         tasks: column.tasks.map(task =>
//           task.id === updatedTask.id 
//             ? { ...updatedTask, updatedAt: new Date().toISOString() }
//             : task
//         )
//       }))
//     );
//   };

//   const deleteTask = (taskId: string) => {
//     setColumns(prevColumns =>
//       prevColumns.map(column => ({
//         ...column,
//         tasks: column.tasks.filter(task => task.id !== taskId)
//       }))
//     );
//   };

//   const handleDragStart = (task: Task) => {
//     setActiveTask(task);
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
    
//     if (!over) {
//       setActiveTask(null);
//       return;
//     }

//     const taskId = active.id;
//     const newColumnType = over.id;

//     if (newColumnType && ['backlog', 'todo', 'inProgress', 'review', 'done'].includes(newColumnType)) {
//       moveTask(taskId, newColumnType as Column['type']);
//     }

//     setActiveTask(null);
//   };

//   const addColumn = (name: string, type: Column['type']) => {
//     const newColumn: Column = {
//       id: type,
//       name,
//       type,
//       tasks: []
//     };
//     setColumns(prev => [...prev, newColumn]);
//   };

//   const deleteColumn = (columnId: string) => {
//     setColumns(prev => prev.filter(col => col.id !== columnId));
//   };

//   return {
//     columns,
//     moveTask,
//     addTask,
//     updateTask,
//     deleteTask,
//     addColumn,
//     deleteColumn,
//     activeTask,
//     handleDragStart,
//     handleDragEnd,
//     isLoaded
//   };
// }



