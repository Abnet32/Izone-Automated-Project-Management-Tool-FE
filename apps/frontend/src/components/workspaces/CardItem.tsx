"use client";

import { useState } from "react";
import { Card as CardType } from "@/types/board";
import { useBoardStore } from "@/store/board.store";
import CardModal from "./CardModal";

interface CardItemProps {
  card: CardType;
  boardId: string;
  listId: string;
}

export default function CardItem({ card, boardId, listId }: CardItemProps) {
  const [showModal, setShowModal] = useState(false);
  const deleteCard = useBoardStore((state) => state.deleteCard);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(boardId, listId, card.id);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white p-3 rounded shadow-sm hover:shadow-md cursor-pointer group border border-gray-200 hover:border-blue-300 transition-all duration-200"
      >
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium text-gray-800 mb-1 flex-1">{card.title}</h4>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-all duration-200"
            title="Delete card"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {card.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mt-1">{card.description}</p>
        )}
        
        {card.dueDate && (
          <div className="mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Due: {new Date(card.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {card.labels && card.labels.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {card.labels.map((label, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Modal */}
      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          boardId={boardId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}