// src/components/boards/BoardCard.tsx
'use client';

import { Board } from "@/lib/types";
import { Lock, Globe, Users } from "lucide-react";
import Link from "next/link";

export const BoardCard = ({ board }: { board: Board }) => {
  const getPrivacyIcon = () => {
    switch (board.privacy) {
      case "private":
        return <Lock className="w-4 h-4" />;
      case "workspace":
        return <Users className="w-4 h-4" />;
      case "public":
        return <Globe className="w-4 h-4" />;
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
    <Link href={`/workspace/1/board/${board.id}`}>
      <div
        className="relative group rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-40 cursor-pointer"
        style={{ backgroundColor: board.background }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white drop-shadow-md">
              {board.name}
            </h3>
            <div className="flex items-center gap-1 mt-2">
              {getPrivacyIcon()}
              <span className="text-xs text-white/90">{getPrivacyText()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">
              {board.lists.length} lists
            </span>
            <span className="text-xs text-white/80">
              {board.lists.reduce((total, list) => total + list.cards.length, 0)} cards
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};