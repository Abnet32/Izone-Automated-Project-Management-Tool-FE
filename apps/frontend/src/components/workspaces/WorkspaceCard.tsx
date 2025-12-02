"use client";

import { Workspace } from "@/types";
import { useState } from "react";

interface WorkspaceCardProps {
  workspace: Workspace;
  onClick: () => void;
}

export default function WorkspaceCard({ workspace, onClick }: WorkspaceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVisibilityIcon = () => {
    switch (workspace.visibility) {
      case 'private':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'public':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  const getInitial = () => {
    return workspace.name.charAt(0).toUpperCase();
  };

  const getGradient = () => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-orange-500 to-orange-600',
      'from-teal-500 to-teal-600',
    ];
    const index = workspace.name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
    >
      <div className={`bg-gradient-to-br ${getGradient()} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-48 relative`}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="h-full p-5 flex flex-col justify-end relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{getInitial()}</span>
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
              {getVisibilityIcon()}
              <span className="capitalize">{workspace.visibility}</span>
            </div>
          </div>
          
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
            {workspace.name}
          </h3>
          
          {workspace.description && (
            <p className="text-white/80 text-sm line-clamp-2 mb-4">
              {workspace.description}
            </p>
          )}
          
          {/* Stats */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a4.5 4.5 0 01-6.364 0" />
              </svg>
              <span>{workspace.members.length} members</span>
            </div>
            <div className="text-white/60 text-sm">
              {new Date(workspace.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        {/* Hover effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
}


// 'use client';
// import React from 'react';
// import { Workspace } from '@/types/workspace';
// import Link from 'next/link';


// export default function WorkspaceCard({ workspace }: { workspace: Workspace }) {
// return (
// <div className="border rounded p-3">
// <h3 className="font-semibold text-lg">{workspace.name}</h3>
// <p className="text-sm text-muted">{workspace.description}</p>
// <div className="mt-2">
// <Link href={`/workspaces/${workspace.id}`} className="text-blue-600 underline">
// Open
// </Link>
// </div>
// </div>
// );
// }