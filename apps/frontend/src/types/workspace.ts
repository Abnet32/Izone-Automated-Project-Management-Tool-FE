export interface Workspace {
id: string;
name: string;
description?: string | null;
owner_id: string;
created_at?: string;
updated_at?: string;
}


// export interface Workspace {
//   id: string;
//   name: string;
//   description?: string;
//   ownerId: string;
//   members: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface WorkspaceWithBoards extends Workspace {
//   boards: Board[];
// }

// export interface CreateWorkspaceData {
//   name: string;
//   description?: string;
// }

// export interface UpdateWorkspaceData {
//   name?: string;
//   description?: string;
//   members?: string[];
// }