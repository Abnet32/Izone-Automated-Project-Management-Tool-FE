




// app/projects/[projectId]/page.tsx
'use client';

import { use } from 'react';
import { useProjects } from '@/hooks/useProject';
import { ListsContainer } from '@/components/board/ListsContainer';

export default function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const { projects, isLoading, error } = useProjects();
  const project = projects.find(p => p.id === projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-gray-300">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        background: project.background?.includes('gradient')
          ? `linear-gradient(135deg, ${getGradientColors(project.background)})`
          : getBackgroundColor(project.background)
      }}
    >
      {/* Project Header */}
      <div className="p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            {project.description && (
              <p className="text-white text-opacity-80 mt-1">{project.description}</p>
            )}
            <div className="flex gap-4 mt-2 text-sm text-white text-opacity-70">
              <span>Status: {project.status}</span>
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-sm hover:bg-opacity-30 transition-colors">
              Share
            </button>
            <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-sm hover:bg-opacity-30 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Project Content - Reuse your existing ListContainer */}
      <ListsContainer projectId={projectId} />
    </div>
  );
}

function getGradientColors(background: string = 'blue') {
  const gradients = {
    'gradient-blue': '#3b82f6, #1d4ed8',
    'gradient-green': '#10b981, #047857',
    'gradient-red': '#ef4444, #dc2626',
    'gradient-purple': '#8b5cf6, #7c3aed',
    'gradient-orange': '#f59e0b, #d97706',
    'gradient-pink': '#ec4899, #db2777',
  };
  return gradients[background as keyof typeof gradients] || '#3b82f6, #1d4ed8';
}

function getBackgroundColor(background: string = 'blue') {
  const colors = {
    'blue': '#3b82f6',
    'green': '#10b981',
    'red': '#ef4444',
    'purple': '#8b5cf6',
    'orange': '#f59e0b',
    'pink': '#ec4899',
  };
  return colors[background as keyof typeof colors] || '#3b82f6';
}