import { useState, useMemo } from 'react';
import { Column, Task } from '@/lib/types/kanban';

// EXACT DATA FROM YOUR IMAGE
const sampleTasks: Task[] = [
  // Backlog tasks
  {
    id: '1',
    title: 'Create styleguide foundation',
    status: 'backlog',
    priority: 'high',
    dueDate: '2021-08-20',
    labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 2,
    comments: 3,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-15',
  },
  {
    id: '2',
    title: 'Copywriting Content',
    status: 'backlog',
    priority: 'medium',
    dueDate: '2021-09-20',
    labels: [{ id: '2', name: 'Writing', color: '#10B981', type: 'writing' }],
    assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
    attachments: 1,
    comments: 1,
    createdAt: '2021-08-05',
    updatedAt: '2021-08-18',
  },

  // To Do tasks
  {
    id: '3',
    title: 'Updating information architecture',
    status: 'todo',
    priority: 'high',
    dueDate: '2021-08-20',
    labels: [{ id: '3', name: 'Research', color: '#3B82F6', type: 'research' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 0,
    comments: 2,
    createdAt: '2021-08-10',
    updatedAt: '2021-08-12',
  },
  {
    id: '4',
    title: 'Update support documentation',
    status: 'todo',
    priority: 'medium',
    dueDate: '2021-08-20',
    labels: [{ id: '4', name: 'Documentation', color: '#6B7280', type: 'documentation' }],
    assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
    attachments: 3,
    comments: 0,
    createdAt: '2021-08-08',
    updatedAt: '2021-08-14',
  },

  // In Progress tasks
  {
    id: '5',
    title: 'Lifting deliverable checklist',
    status: 'inProgress',
    priority: 'high',
    dueDate: '2021-08-20',
    labels: [{ id: '5', name: 'Planning', color: '#EC4899', type: 'planning' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 1,
    comments: 5,
    createdAt: '2021-08-03',
    updatedAt: '2021-08-16',
  },
  {
    id: '6',
    title: 'Qualitative research planning',
    status: 'inProgress',
    priority: 'medium',
    dueDate: '2021-09-20',
    labels: [{ id: '3', name: 'Research', color: '#3B82F6', type: 'research' }],
    assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
    attachments: 2,
    comments: 3,
    createdAt: '2021-08-07',
    updatedAt: '2021-08-17',
  },
  {
    id: '7',
    title: 'Copywriting Content',
    status: 'inProgress',
    priority: 'medium',
    dueDate: '2021-09-20',
    labels: [{ id: '2', name: 'Writing', color: '#10B981', type: 'writing' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 1,
    comments: 2,
    createdAt: '2021-08-09',
    updatedAt: '2021-08-13',
  },

  // Review tasks (first column)
  {
    id: '8',
    title: 'High fidelity UI Desktop',
    status: 'review',
    priority: 'high',
    dueDate: '2021-08-20',
    labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 4,
    comments: 7,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-19',
  },
  {
    id: '9',
    title: 'Linking deliverables checklist',
    status: 'review',
    priority: 'medium',
    dueDate: '2021-08-20',
    labels: [{ id: '6', name: 'Content', color: '#F59E0B', type: 'content' }],
    assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
    attachments: 1,
    comments: 2,
    createdAt: '2021-08-09',
    updatedAt: '2021-08-13',
  },

  // Review tasks (second column - same as first review)
  {
    id: '10',
    title: 'High fidelity UI Desktop',
    status: 'review',
    priority: 'high',
    dueDate: '2021-08-20',
    labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
    assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
    attachments: 4,
    comments: 7,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-19',
  },
  {
    id: '11',
    title: 'Linking deliverables checklist',
    status: 'review',
    priority: 'medium',
    dueDate: '2021-08-20',
    labels: [{ id: '6', name: 'Content', color: '#F59E0B', type: 'content' }],
    assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
    attachments: 1,
    comments: 2,
    createdAt: '2021-08-09',
    updatedAt: '2021-08-13',
  },
];

const columnsData: Column[] = [
  { id: '1', name: 'Backlog', type: 'backlog', position: 0, tasks: [] },
  { id: '2', name: 'To Do', type: 'todo', position: 1, tasks: [] },
  { id: '3', name: 'In Progress', type: 'inProgress', position: 2, tasks: [] },
  { id: '4', name: 'Review', type: 'review', position: 3, tasks: [] },
  { id: '5', name: 'Review', type: 'review', position: 4, tasks: [] },
];

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columns = useMemo(() => {
    return columnsData.map(column => ({
      ...column,
      tasks: tasks.filter(task => {
        if (column.type === 'review' && column.position === 4) {
          return task.status === 'review' && ['10', '11'].includes(task.id);
        }
        return task.status === column.type;
      })
    }));
  }, [tasks]);

  // Move task between columns
  const moveTask = (taskId: string, newStatus: Column['type']) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Drag & Drop functions
  const handleDragStart = (task: Task) => {
    setActiveTask(task);
  };

  const handleDragEnd = (result: any) => {
    setActiveTask(null);
    
    const { active, over } = result;
    if (!over) return;

    const taskId = active.id;
    const newColumnType = over.id as Column['type'];

    // Don't do anything if dropping in same column
    const currentTask = tasks.find(t => t.id === taskId);
    if (currentTask?.status === newColumnType) return;

    moveTask(taskId, newColumnType);
  };

  // Add new task
  const addTask = (taskData: { title: string }, columnType: Column['type']) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: '',
      status: columnType,
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: [],
      assignees: [],
      attachments: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [...prev, newTask]);
  };

  // Update existing task
  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id 
        ? { 
            ...updatedTask, 
            updatedAt: new Date().toISOString(),
            // Preserve other properties if not provided
            description: updatedTask.description || task.description,
            dueDate: updatedTask.dueDate || task.dueDate,
            labels: updatedTask.labels || task.labels,
            assignees: updatedTask.assignees || task.assignees,
            attachments: updatedTask.attachments ?? task.attachments,
            comments: updatedTask.comments ?? task.comments,
          } 
        : task
    ));
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    columns,
    tasks,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    // Drag & Drop
    activeTask,
    handleDragStart,
    handleDragEnd,
  };
}

// import { useState, useMemo } from 'react';
// import { Column, Task } from '@/lib/types/kanban';

// // EXACT DATA FROM YOUR IMAGE
// const sampleTasks: Task[] = [
//   // Backlog tasks
//   {
//     id: '1',
//     title: 'Create styleguide foundation',
//     status: 'backlog',
//     priority: 'high',
//     dueDate: '2021-08-20',
//     labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 2,
//     comments: 3,
//     createdAt: '2021-08-01',
//     updatedAt: '2021-08-15',
//   },
//   {
//     id: '2',
//     title: 'Copywriting Content',
//     status: 'backlog',
//     priority: 'medium',
//     dueDate: '2021-09-20',
//     labels: [{ id: '2', name: 'Writing', color: '#10B981', type: 'writing' }],
//     assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
//     attachments: 1,
//     comments: 1,
//     createdAt: '2021-08-05',
//     updatedAt: '2021-08-18',
//   },

//   // To Do tasks
//   {
//     id: '3',
//     title: 'Updating information architecture',
//     status: 'todo',
//     priority: 'high',
//     dueDate: '2021-08-20',
//     labels: [{ id: '3', name: 'Research', color: '#3B82F6', type: 'research' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 0,
//     comments: 2,
//     createdAt: '2021-08-10',
//     updatedAt: '2021-08-12',
//   },
//   {
//     id: '4',
//     title: 'Update support documentation',
//     status: 'todo',
//     priority: 'medium',
//     dueDate: '2021-08-20',
//     labels: [{ id: '4', name: 'Documentation', color: '#6B7280', type: 'documentation' }],
//     assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
//     attachments: 3,
//     comments: 0,
//     createdAt: '2021-08-08',
//     updatedAt: '2021-08-14',
//   },

//   // In Progress tasks
//   {
//     id: '5',
//     title: 'Lifting deliverable checklist',
//     status: 'inProgress',
//     priority: 'high',
//     dueDate: '2021-08-20',
//     labels: [{ id: '5', name: 'Planning', color: '#EC4899', type: 'planning' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 1,
//     comments: 5,
//     createdAt: '2021-08-03',
//     updatedAt: '2021-08-16',
//   },
//   {
//     id: '6',
//     title: 'Qualitative research planning',
//     status: 'inProgress',
//     priority: 'medium',
//     dueDate: '2021-09-20',
//     labels: [{ id: '3', name: 'Research', color: '#3B82F6', type: 'research' }],
//     assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
//     attachments: 2,
//     comments: 3,
//     createdAt: '2021-08-07',
//     updatedAt: '2021-08-17',
//   },
//   {
//     id: '7',
//     title: 'Copywriting Content',
//     status: 'inProgress',
//     priority: 'medium',
//     dueDate: '2021-09-20',
//     labels: [{ id: '2', name: 'Writing', color: '#10B981', type: 'writing' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 1,
//     comments: 2,
//     createdAt: '2021-08-09',
//     updatedAt: '2021-08-13',
//   },

//   // Review tasks (first column)
//   {
//     id: '8',
//     title: 'High fidelity UI Desktop',
//     status: 'review',
//     priority: 'high',
//     dueDate: '2021-08-20',
//     labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 4,
//     comments: 7,
//     createdAt: '2021-08-01',
//     updatedAt: '2021-08-19',
//   },
//   {
//     id: '9',
//     title: 'Linking deliverables checklist',
//     status: 'review',
//     priority: 'medium',
//     dueDate: '2021-08-20',
//     labels: [{ id: '6', name: 'Content', color: '#F59E0B', type: 'content' }],
//     assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
//     attachments: 1,
//     comments: 2,
//     createdAt: '2021-08-09',
//     updatedAt: '2021-08-13',
//   },

//   // Review tasks (second column - same as first review)
//   {
//     id: '10',
//     title: 'High fidelity UI Desktop',
//     status: 'review',
//     priority: 'high',
//     dueDate: '2021-08-20',
//     labels: [{ id: '1', name: 'Design', color: '#8B5CF6', type: 'design' }],
//     assignees: [{ id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'admin' }],
//     attachments: 4,
//     comments: 7,
//     createdAt: '2021-08-01',
//     updatedAt: '2021-08-19',
//   },
//   {
//     id: '11',
//     title: 'Linking deliverables checklist',
//     status: 'review',
//     priority: 'medium',
//     dueDate: '2021-08-20',
//     labels: [{ id: '6', name: 'Content', color: '#F59E0B', type: 'content' }],
//     assignees: [{ id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' }],
//     attachments: 1,
//     comments: 2,
//     createdAt: '2021-08-09',
//     updatedAt: '2021-08-13',
//   },
// ];

// const columnsData: Column[] = [
//   { id: '1', name: 'Backlog', type: 'backlog', position: 0, tasks: [] },
//   { id: '2', name: 'To Do', type: 'todo', position: 1, tasks: [] },
//   { id: '3', name: 'In Progress', type: 'inProgress', position: 2, tasks: [] },
//   { id: '4', name: 'Review', type: 'review', position: 3, tasks: [] },
//   { id: '5', name: 'Review', type: 'review', position: 4, tasks: [] },
// ];

// export function useKanban() {
//   const [tasks, setTasks] = useState<Task[]>(sampleTasks);

//   const columns = useMemo(() => {
//     return columnsData.map(column => ({
//       ...column,
//       tasks: tasks.filter(task => {
//         if (column.type === 'review' && column.position === 4) {
//           return task.status === 'review' && ['10', '11'].includes(task.id);
//         }
//         return task.status === column.type;
//       })
//     }));
//   }, [tasks]);

//   const moveTask = (taskId: string, newStatus: Column['type']) => {
//     setTasks(prev => prev.map(task =>
//       task.id === taskId ? { ...task, status: newStatus } : task
//     ));
//   };

//   // Add new task
//   const addTask = (taskData: { title: string }, columnType: Column['type']) => {
//     const newTask: Task = {
//       id: Date.now().toString(),
//       title: taskData.title,
//       description: '',
//       status: columnType,
//       priority: 'medium',
//       dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       labels: [],
//       assignees: [],
//       attachments: 0,
//       comments: 0,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     setTasks(prev => [...prev, newTask]);
//   };

//   // Update existing task
//   const updateTask = (updatedTask: Task) => {
//     setTasks(prev => prev.map(task =>
//       task.id === updatedTask.id 
//         ? { 
//             ...updatedTask, 
//             updatedAt: new Date().toISOString(),
//             // Preserve other properties if not provided
//             description: updatedTask.description || task.description,
//             dueDate: updatedTask.dueDate || task.dueDate,
//             labels: updatedTask.labels || task.labels,
//             assignees: updatedTask.assignees || task.assignees,
//             attachments: updatedTask.attachments ?? task.attachments,
//             comments: updatedTask.comments ?? task.comments,
//           } 
//         : task
//     ));
//   };

//   // Delete task
//   const deleteTask = (taskId: string) => {
//     setTasks(prev => prev.filter(task => task.id !== taskId));
//   };

//   return {
//     columns,
//     tasks,
//     moveTask,
//     addTask,
//     updateTask,
//     deleteTask, // ✅ Added deleteTask function
//   };
// }