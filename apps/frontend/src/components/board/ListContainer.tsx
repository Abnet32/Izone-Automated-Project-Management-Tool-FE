"use client";

import { useState } from "react";
import { List as ListType } from "@/types";
import { useAppStore } from "@/store/app.store";
import CardItem from "./CardItem";
import CreateCardForm from "./CreateCardForm";

interface ListContainerProps {
  list: ListType;
  boardId: string;
}

export default function ListContainer({ list, boardId }: ListContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  
  const updateList = useAppStore((state) => state.updateList);
  const deleteList = useAppStore((state) => state.deleteList);

  const handleUpdateTitle = () => {
    if (title.trim() && title !== list.title) {
      updateList(boardId, list.id, { title: title.trim() });
    }
    setIsEditing(false);
  };

  const handleDeleteList = () => {
    if (confirm("Are you sure you want to delete this list?")) {
      deleteList(boardId, list.id);
    }
  };

  return (
    <div className="w-80 bg-gray-50 rounded-lg shadow-sm flex-shrink-0 h-fit flex flex-col border border-gray-200">
      {/* List Header */}
      <div className="p-4 border-b border-gray-200 bg-white/50">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdateTitle();
                  if (e.key === "Escape") {
                    setTitle(list.title);
                    setIsEditing(false);
                  }
                }}
                className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            ) : (
              <h3
                className="text-sm font-semibold text-gray-800 cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded transition-colors duration-200 truncate"
                onClick={() => setIsEditing(true)}
                title="Click to edit"
              >
                {list.title}
              </h3>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {list.cards.length}
            </span>
            <button
              onClick={handleDeleteList}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded transition-colors duration-200"
              title="Delete list"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[40px] max-h-[calc(100vh-300px)]">
        {list.cards.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No cards yet</p>
            <p className="text-gray-300 text-xs mt-1">Add a card to get started</p>
          </div>
        ) : (
          list.cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              listId={list.id}
              boardId={boardId}
            />
          ))
        )}
      </div>

      {/* Create Card Form */}
      <div className="p-3 border-t border-gray-200 bg-white/30">
        <CreateCardForm listId={list.id} boardId={boardId} />
      </div>
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import List from './List';
// import CardModal from './CardModal';

// interface ListContainerProps {
//   board: {
//     id: string;
//     name: string;
//     lists?: any[];
//   };
//   onAddList?: (boardId: string, listData: { name: string }) => void;
//   onAddCard?: (boardId: string, listId: string, cardData: any) => void;
//   onUpdateCard?: (boardId: string, listId: string, cardId: string, updates: any) => void;
//   onLabelToggle?: (boardId: string, listId: string, cardId: string, label: string) => void;
// }

// export default function ListContainer({ 
//   board, 
//   onAddList, 
//   onAddCard, 
//   onUpdateCard, 
//   onLabelToggle 
// }: ListContainerProps) {
//   const [isAddingList, setIsAddingList] = useState(false);
//   const [newListName, setNewListName] = useState('');
//   const [selectedCard, setSelectedCard] = useState<any>(null);

//   const handleAddList = () => {
//     if (newListName.trim() && onAddList) {
//       onAddList(board.id, { name: newListName.trim() });
//       setNewListName('');
//       setIsAddingList(false);
//     } else if (!onAddList) {
//       console.error('onAddList function is not provided');
//     }
//   };

//   const handleCardUpdate = (listId: string, card: any) => {
//     setSelectedCard({ ...card, listId });
//   };

//   const handleSaveCard = (updates: any) => {
//     if (selectedCard && onUpdateCard) {
//       onUpdateCard(board.id, selectedCard.listId, selectedCard.id, updates);
//       setSelectedCard(null);
//     }
//   };

//   const handleLabelToggle = (label: string) => {
//     if (selectedCard && onLabelToggle) {
//       onLabelToggle(board.id, selectedCard.listId, selectedCard.id, label);
//       // Update local state for immediate UI feedback
//       setSelectedCard(prev => ({
//         ...prev,
//         labels: prev.labels.includes(label)
//           ? prev.labels.filter((l: string) => l !== label)
//           : [...prev.labels, label]
//       }));
//     }
//   };

//   // Ensure board.lists is always an array
//   const lists = board.lists || [];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <header className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">{board.name}</h1>
//         {board.description && (
//           <p className="text-gray-600 mt-2">{board.description}</p>
//         )}
//       </header>

//       {/* Lists */}
//       <div className="flex gap-4 overflow-x-auto pb-4">
//         {lists.map(list => (
//           <List
//             key={list.id}
//             list={list}
//             onAddCard={(listId, cardData) => {
//               if (onAddCard) {
//                 onAddCard(board.id, listId, cardData);
//               }
//             }}
//             onUpdateCard={handleCardUpdate}
//             onLabelToggle={(listId, cardId, label) => {
//               if (onLabelToggle) {
//                 onLabelToggle(board.id, listId, cardId, label);
//               }
//             }}
//           />
//         ))}

//         {/* Add List */}
//         {isAddingList ? (
//           <div className="bg-gray-100 rounded-lg p-3 w-64 flex-shrink-0">
//             <input
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//               placeholder="Enter list title..."
//               className="w-full p-2 border border-gray-300 rounded text-sm mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               autoFocus
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleAddList();
//                 if (e.key === 'Escape') setIsAddingList(false);
//               }}
//             />
//             <div className="flex gap-2">
//               <button
//                 onClick={handleAddList}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//               >
//                 Add List
//               </button>
//               <button
//                 onClick={() => setIsAddingList(false)}
//                 className="text-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsAddingList(true)}
//             className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 w-64 flex-shrink-0 h-fit transition-colors whitespace-nowrap"
//           >
//             + Add another list
//           </button>
//         )}
//       </div>

//       {/* Card Modal */}
//       {selectedCard && (
//         <CardModal
//           card={selectedCard}
//           onClose={() => setSelectedCard(null)}
//           onSave={handleSaveCard}
//           onLabelToggle={handleLabelToggle}
//         />
//       )}
//     </div>
//   );
// }








