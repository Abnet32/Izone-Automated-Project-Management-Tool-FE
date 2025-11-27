export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  color?: string;
  members: string[];
}

export interface CreateProjectData {
  name: string;
  description?: string;
  workspaceId: string;
  color?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  color?: string;
}