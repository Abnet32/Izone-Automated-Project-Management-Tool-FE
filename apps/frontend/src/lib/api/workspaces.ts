import { API_BASE_URL, getHeaders } from '@/lib/api/config';

// lib/api/workspaces.ts

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
}

export const workspaceAPI = {
  // Get all workspaces (list endpoint)
  async getAll(): Promise<Workspace[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/workspaces`, {
        headers: getHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("auth_token");
        throw new Error("Session expired. Please login again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to load workspaces: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      throw error;
    }
  },

  // Create workspace
  async create(payload: CreateWorkspacePayload): Promise<Workspace> {
    try {
      const res = await fetch(`${API_BASE_URL}/workspaces`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        localStorage.removeItem("auth_token");
        throw new Error("Session expired. Please login again.");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to create workspace: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error creating workspace:", error);
      throw error;
    }
  },

  async getById(workspaceId: string): Promise<Workspace | null> {
    try {
      // First get all workspaces
      const workspaces = await this.getAll();

      // Then find the specific workspace
      const workspace = workspaces.find(ws => ws.id === workspaceId);

      if (!workspace) {
        throw new Error(`Workspace with ID ${workspaceId} not found`);
      }

      return workspace;
    } catch (error) {
      console.error("Error fetching workspace by ID:", error);
      throw error;
    }
  },

  async addMember(workspaceId: string, payload: { email: string; role: string }): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/invite`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        localStorage.removeItem("auth_token");
        throw new Error("Session expired. Please login again.");
      }

      if (!res.ok) {
        let errorMessage = "Failed to add member";
        try {
          const errorData = await res.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return res.json();
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  }
};
