export type Role = 'admin' | 'member';


export interface WorkspaceMember {
id: string;
user_id: string;
workspace_id: string;
role: Role;
user?: import('./user').User;
}