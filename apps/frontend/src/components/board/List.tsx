'use client';

import { useState } from 'react';
import Card from './Card';

interface ListProps {
  list: {
    id: string;
    name: string;
    cards: any[];
  };
  onAddCard: (listId: string, cardData: { title: string; description?: string }) => void;
  onUpdateCard: (listId: string, card: any) => void;
  onLabelToggle: (listId: string, cardId: string, label: string) => void;
}

export default function List({ list, onAddCard, onUpdateCard, onLabelToggle }: ListProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(list.id, {
        title: newCardTitle.trim(),
        description: ''
      });
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleCancel = () => {
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 w-64 flex-shrink-0">
      <h3 className="font-semibold text-gray-800 mb-3">{list.name}</h3>
      
      {/* Cards */}
      <div className="space-y-2 min-h-[20px]">
        {list.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onCardClick={(card) => onUpdateCard(list.id, card)}
            onLabelToggle={(cardId, label) => onLabelToggle(list.id, cardId, label)}
          />
        ))}
      </div>

      {/* Add Card */}
      {isAddingCard ? (
        <div className="mt-3">
          <textarea
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter a title for this card..."
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              }
            }}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddCard}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Add Card
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full mt-3 text-gray-600 hover:bg-gray-200 py-2 rounded text-sm text-left px-2 transition-colors"
        >
          + Add a card
        </button>
      )}
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { ListWithCards } from '@/types';
// import { Card } from '@/components/board/Card';
// import { useCard } from '@/hooks/useCards';

// interface ListProps {
//   list: ListWithCards;
//   onRefresh?: () => Promise<void> | void;
// }

// export function ListComponent({ list, onRefresh }: ListProps) {
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [newCardTitle, setNewCardTitle] = useState('');
//   const { createCard, isLoading } = useCard();

//   const handleAddCard = async () => {
//     if (!newCardTitle.trim()) return;

//     try {
//       await createCard({
//         title: newCardTitle.trim(),
//         listId: list.id,
//         position: list.cards.length,
//       });
//       setNewCardTitle('');
//       setIsAddingCard(false);
//       if (onRefresh) {
//         try { await onRefresh(); } catch (e) { /* ignore */ }
//       }
//     } catch (error) {
//       console.error('Failed to create card:', error);
//     }
//   };

//   return (
//     <div className="w-72 bg-gray-100 rounded-lg flex-shrink-0">
//       <div className="p-2">
//         <h3 className="font-semibold text-gray-800 px-2 py-1">{list.title}</h3>
//       </div>
      
//       <div className="p-2 space-y-2 max-h-[70vh] overflow-y-auto">
//         {list.cards.map((card) => (
//           <Card key={card.id} card={card} />
//         ))}
        
//         {isAddingCard && (
//           <div className="bg-white rounded p-2 shadow-sm">
//             <textarea
//               value={newCardTitle}
//               onChange={(e) => setNewCardTitle(e.target.value)}
//               placeholder="Enter a title for this card..."
//               className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
//               rows={3}
//               autoFocus
//             />
//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={handleAddCard}
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
//               >
//                 Add Card
//               </button>
//               <button
//                 onClick={() => setIsAddingCard(false)}
//                 className="text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div className="p-2">
//         <button
//           onClick={() => setIsAddingCard(true)}
//           className="w-full text-gray-600 hover:bg-gray-200 rounded p-2 text-left transition"
//         >
//           + Add a card
//         </button>
//       </div>
//     </div>
//   );
// }