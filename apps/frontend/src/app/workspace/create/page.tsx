// src/app/workspace/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function CreateWorkspacePage() {
  const router = useRouter();
  const createWorkspace = useAppStore((state) => state.createWorkspace);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const workspace = createWorkspace({
      name: name.trim(),
      description: '',
      color: '#3B82F6',
      userId: 'user-1',
    });
    
    router.push(`/workspace/${workspace.id}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Workspace</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Workspace Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="My Workspace"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Create Workspace
          </button>
        </form>
      </div>
    </div>
  );
}





