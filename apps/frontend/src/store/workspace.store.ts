import create from 'zustand';
import { Workspace } from '@/types/workspace';
import { WorkspaceMember } from '@/types/member';


interface WorkspaceState {
list: Workspace[];
selected?: Workspace | null;
members: Record<string, WorkspaceMember[]>;
loading: boolean;
error?: string | null;
setList: (w: Workspace[]) => void;
setSelected: (w?: Workspace | null) => void;
setMembers: (workspaceId: string, members: WorkspaceMember[]) => void;
setLoading: (v: boolean) => void;
setError: (e?: string | null) => void;
}


export const useWorkspaceStore = create<WorkspaceState>((set) => ({
list: [],
selected: null,
members: {},
loading: false,
error: null,
setList: (w) => set({ list: w }),
setSelected: (w) => set({ selected: w ?? null }),
setMembers: (workspaceId, members) =>
set((s) => ({ members: { ...s.members, [workspaceId]: members } })),
setLoading: (v) => set({ loading: v }),
setError: (e) => set({ error: e ?? null }),
}));