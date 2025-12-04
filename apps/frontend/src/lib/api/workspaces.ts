import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '@/types/workspace';

const mockWorkspaces: Workspace[] = [
//   {
//     id: '1',
//     name: 'Product Development',
//     description: 'All product-related boards and tasks',
//     visibility: 'team',
//     color: '#0079bf',
//     createdBy: 'user1',
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date('2024-01-20'),
//     memberCount: 12,
//     boardCount: 5,
//   },
//   {
//     id: '2',
//     name: 'Marketing Campaigns',
//     description: 'Marketing initiatives and campaigns',
//     visibility: 'public',
//     color: '#d29034',
//     createdBy: 'user1',
//     createdAt: new Date('2024-02-01'),
//     updatedAt: new Date('2024-02-10'),
//     memberCount: 8,
//     boardCount: 3,
//   },
];

class WorkspaceAPI {
  private workspaces: Workspace[] = [...mockWorkspaces];
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getAllWorkspaces(): Promise<Workspace[]> {
    await this.delay(300);
    return [...this.workspaces];
  }

  async getWorkspaceById(id: string): Promise<Workspace | null> {
    await this.delay(200);
    const workspace = this.workspaces.find(w => w.id === id);
    return workspace || null;
  }

  async createWorkspace(data: CreateWorkspaceData): Promise<Workspace> {
    await this.delay(400);
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      ...data,
      createdBy: 'current-user',
      createdAt: new Date(),
      updatedAt: new Date(),
      memberCount: 1,
      boardCount: 0,
    };
    this.workspaces.push(newWorkspace);
    return newWorkspace;
  }

  async updateWorkspace(id: string, data: UpdateWorkspaceData): Promise<Workspace> {
    await this.delay(400);
    const index = this.workspaces.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Workspace not found');
    const updatedWorkspace = {
      ...this.workspaces[index],
      ...data,
      updatedAt: new Date(),
    };
    this.workspaces[index] = updatedWorkspace;
    return updatedWorkspace;
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.delay(400);
    this.workspaces = this.workspaces.filter(w => w.id !== id);
  }
}

export const workspaceAPI = new WorkspaceAPI();