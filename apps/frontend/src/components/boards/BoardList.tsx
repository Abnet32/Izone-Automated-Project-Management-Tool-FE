// src/components/boards/BoardList.tsx
'use client';

import { useBoardStore } from "@/store/boardStore";
import { AddList } from "./AddList";
import { CardItem } from "./CardItem";
import { Plus } from "lucide-react";

export const BoardList = ({ boardId }: { boardId: string }) => {
  const board = useBoardStore((state) => 
    state.boards.find(b => b.id === boardId)
  );
  
  if (!board) return null;

  return (
    <div className="p-4">
      <div className="flex gap-4 overflow-x-auto min-h-[calc(100vh-200px)] pb-4">
        {board.lists.map(list => (
          <div 
            key={list.id} 
            className="min-w-72 bg-gray-50 rounded-lg shadow-sm flex flex-col h-fit"
          >
            {/* List Header */}
            <div className="p-3 bg-gray-100 rounded-t-lg">
              <h3 className="font-medium text-gray-800">{list.title}</h3>
            </div>
            
            {/* Cards */}
            <div className="p-2 flex-1 min-h-[100px] space-y-2">
              {list.cards.map(card => (
                <CardItem 
                  key={card.id} 
                  boardId={boardId} 
                  listId={list.id} 
                  card={card} 
                />
              ))}
            </div>
            
            {/* Add Card Button */}
            <div className="p-2">
              <button
                onClick={() => {
                  const cardTitle = prompt("Enter card title:");
                  if (cardTitle?.trim()) {
                    // We'll implement this later
                    console.log("Add card:", cardTitle);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm"
              >
                <Plus className="w-4 h-4" />
                Add a card
              </button>
            </div>
          </div>
        ))}
        
        {/* Add List Component */}
        <AddList boardId={boardId} />
      </div>
    </div>
  );
};