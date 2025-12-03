// src/components/workspace/WorkspaceCard.tsx
'use client';

import Link from 'next/link';
import { Workspace } from '@/stores/app.store';

interface WorkspaceCardProps {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Link
      href={`/workspace/${workspace.id}`}
      className="block group"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: workspace.color }}
            >
              <span className="text-white font-semibold">
                {workspace.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                {workspace.name}
              </h3>
              {workspace.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {workspace.description}
                </p>
              )}
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Created {new Date(workspace.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}