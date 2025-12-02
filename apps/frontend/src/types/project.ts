// types/project.ts
export interface Project {
  id: string;
  title: string;
  description?: string;
  workspaceId: string;
  background?: string;
  status: 'active' | 'archived' | 'completed';
  startDate?: Date;
  endDate?: Date;
  members: string[]; // user IDs
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  title: string;
  description?: string;
  background?: string;
  workspaceId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  background?: string;
  status?: 'active' | 'archived' | 'completed';
  startDate?: Date;
  endDate?: Date;
}




// export interface Project {
//   id: string;
//   name: string;
//   description?: string;
//   workspaceId: string;
//   status: "active" | "archived";
//   createdAt: string;
//   updatedAt: string;
//   color?: string;
//   members: string[];
// }

// export interface CreateProjectData {
//   name: string;
//   description?: string;
//   workspaceId: string;
//   color?: string;
// }

// export interface UpdateProjectData {
//   name?: string;
//   description?: string;
//   color?: string;
// }