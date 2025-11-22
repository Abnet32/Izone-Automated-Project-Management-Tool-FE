'use client';

import { useState } from 'react';
import { ListWithCards } from '@/types';
import { Card } from '@/components/board/Card';
import { useCard } from '@/hooks/useCards';

interface ListProps {
  list: ListWithCards;
  onRefresh?: () => Promise<void> | void;
}

export function ListComponent({ list, onRefresh }: ListProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const { createCard, isLoading } = useCard();

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      await createCard({
        title: newCardTitle.trim(),
        listId: list.id,
        position: list.cards.length,
      });
      setNewCardTitle('');
      setIsAddingCard(false);
      if (onRefresh) {
        try { await onRefresh(); } catch (e) { /* ignore */ }
      }
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  return (
    <div className="w-72 bg-gray-100 rounded-lg flex-shrink-0">
      <div className="p-2">
        <h3 className="font-semibold text-gray-800 px-2 py-1">{list.title}</h3>
      </div>
      
      <div className="p-2 space-y-2 max-h-[70vh] overflow-y-auto">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        
        {isAddingCard && (
          <div className="bg-white rounded p-2 shadow-sm">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter a title for this card..."
              className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddCard}
                disabled={isLoading}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Add Card
              </button>
              <button
                onClick={() => setIsAddingCard(false)}
                className="text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-2">
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full text-gray-600 hover:bg-gray-200 rounded p-2 text-left transition"
        >
          + Add a card
        </button>
      </div>
    </div>
  );
}