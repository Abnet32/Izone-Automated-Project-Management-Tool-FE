// src/components/boards/BoardHeader.tsx
'use client';

import { Board } from "@/lib/types";
import { Lock, Globe, Users, Star, MoreVertical } from "lucide-react";

export const BoardHeader = ({ board }: { board: Board }) => {
  const getPrivacyIcon = () => {
    switch (board.privacy) {
      case "private":
        return <Lock className="w-5 h-5" />;
      case "workspace":
        return <Users className="w-5 h-5" />;
      case "public":
        return <Globe className="w-5 h-5" />;
    }
  };

  const getPrivacyText = () => {
    switch (board.privacy) {
      case "private": return "Private";
      case "workspace": return "Workspace";
      case "public": return "Public";
    }
  };

  return (
    <div 
      className="text-white p-6 rounded-t-xl"
      style={{ backgroundColor: board.background }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{board.name}</h1>
            <button className="p-1 hover:bg-white/20 rounded">
              <Star className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {getPrivacyIcon()}
              <span className="text-sm">{getPrivacyText()}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-white/90">
              <span>{board.lists.length} lists</span>
              <span>
                {board.lists.reduce((total, list) => total + list.cards.length, 0)} cards
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};