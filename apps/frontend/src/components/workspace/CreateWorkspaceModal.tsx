// src/components/workspace/CreateWorkspaceModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import {useAppStore} from '@/store/useAppStore';
import WorkspaceForm from './WorkspaceForm';

interface CreateWorkspaceModalProps {
  onClose: () => void;
}

export default function CreateWorkspaceModal({ onClose }: CreateWorkspaceModalProps) {
  const router = useRouter();
  const createWorkspace = useAppStore((state) => state.createWorkspace);

  const handleSubmit = (workspaceData: any) => {
    const newWorkspace = createWorkspace(workspaceData);
    onClose();
    router.push(`/workspace/${newWorkspace.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Workspace
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <WorkspaceForm onSubmit={handleSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}