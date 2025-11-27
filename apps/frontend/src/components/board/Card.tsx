'use client';

import { useState } from 'react';
import { Card as CardType } from '@/types';
import { CardModal } from './CardModal';

interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getLabelColor = (label: string) => {
    const colors: { [key: string]: string } = {
      'high-priority': 'bg-red-500',
      'medium-priority': 'bg-yellow-500',
      'low-priority': 'bg-green-500',
      'design': 'bg-purple-500',
      'development': 'bg-blue-500',
      'bug': 'bg-red-600',
      'feature': 'bg-green-600',
    };
    return colors[label] || 'bg-gray-500';
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', card.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => setIsModalOpen(true)}
        className={`
          bg-white rounded-md shadow-xs border border-gray-300 p-3 mb-0 cursor-pointer 
          hover:bg-gray-50 hover:shadow-sm transition-all duration-200
          ${isDragging ? 'opacity-50 rotate-1 scale-105 shadow-md' : ''}
        `}
      >
        {/* Card Labels - Only show if labels exist */}
        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs font-medium text-white ${getLabelColor(label)}`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Card Title */}
        <p className="text-gray-800 text-sm leading-snug font-normal">{card.title}</p>

        {/* Card Footer - Only show if due date or attachments exist */}
        {(card.dueDate || card.attachments.length > 0) && (
          <div className="flex items-center justify-between mt-3 text-gray-500 text-xs">
            {card.dueDate && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(card.dueDate).toLocaleDateString()}</span>
              </div>
            )}

            {card.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>{card.attachments.length}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <CardModal
        card={card}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}



