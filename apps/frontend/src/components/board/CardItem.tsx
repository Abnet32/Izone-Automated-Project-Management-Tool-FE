"use client";

import { useState } from "react";
import { Card as CardType } from "@/types";
import { useBoardStore } from "@/app/store/boardStore";
import CardModal from "./CardModal";

interface CardItemProps {
  card: CardType;
  listId: string;
  boardId: string;
}

export default function CardItem({ card, listId, boardId }: CardItemProps) {
  const [showModal, setShowModal] = useState(false);
  const { deleteCard } = useAppStore((state) => state.deleteCard);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(boardId, listId, card.id);
    }
  };

  // Count checklist progress
  const checklistProgress = card.checklists.reduce(
    (acc, checklist) => {
      const completed = checklist.items.filter(item => item.completed).length;
      return {
        total: acc.total + checklist.items.length,
        completed: acc.completed + completed,
      };
    },
    { total: 0, completed: 0 }
  );

  const hasDueDate = card.dueDate && new Date(card.dueDate) > new Date();
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white p-3 rounded shadow-sm hover:shadow-md cursor-pointer group border border-gray-200 hover:border-blue-300 transition-all duration-200"
      >
        {/* Cover image */}
        {card.coverImage && (
          <div className="mb-2 -mx-3 -mt-3">
            <div 
              className="h-20 bg-cover bg-center rounded-t"
              style={{ backgroundImage: `url(${card.coverImage})` }}
            />
          </div>
        )}

        {/* Labels */}
        {card.labels.length > 0 && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {card.labels.map((label) => (
              <span
                key={label.id}
                className="text-xs px-2 py-0.5 rounded"
                style={{ 
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  border: `1px solid ${label.color}40`
                }}
              >
                {label.text}
              </span>
            ))}
          </div>
        )}

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
        
        {/* Card details */}
        <div className="mt-3 flex flex-wrap gap-2">
          {/* Due date */}
          {card.dueDate && (
            <div className={`text-xs px-2 py-1 rounded inline-flex items-center gap-1 ${
              isOverdue 
                ? "bg-red-100 text-red-800" 
                : hasDueDate 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-gray-100 text-gray-600"
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isOverdue ? "Overdue" : "Due"} {new Date(card.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {/* Checklist progress */}
          {checklistProgress.total > 0 && (
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              {checklistProgress.completed}/{checklistProgress.total}
            </div>
          )}
          
          {/* Comments */}
          {card.comments.length > 0 && (
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {card.comments.length}
            </div>
          )}
          
          {/* Attachments */}
          {card.attachments.length > 0 && (
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              {card.attachments.length}
            </div>
          )}
        </div>
        
        {/* Members */}
        {card.members.length > 0 && (
          <div className="mt-2 flex -space-x-1">
            {card.members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-blue-800"
                title={`Member ${index + 1}`}
              >
                {member.charAt(0).toUpperCase()}
              </div>
            ))}
            {card.members.length > 3 && (
              <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                +{card.members.length - 3}
              </div>
            )}
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




// "use client";

// import { useState } from "react";
// import { Card as CardType } from "@/types/board";
// import { useBoardStore } from "@/store/board.store";
// import CardModal from "./CardModal";

// interface CardItemProps {
//   card: CardType;
//   listId: string;
//   boardId: string;
// }

// export default function CardItem({ card, listId, boardId }: CardItemProps) {
//   const [showModal, setShowModal] = useState(false);
//   const { deleteCard } = useBoardStore((state) => state.deleteCard);

//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (confirm("Are you sure you want to delete this card?")) {
//       deleteCard(boardId, listId, card.id);
//     }
//   };

//   return (
//     <>
//       <div
//         onClick={() => setShowModal(true)}
//         className="bg-white p-3 rounded shadow-sm hover:shadow-md cursor-pointer group border border-gray-200 hover:border-blue-300 transition-all duration-200"
//       >
//         <div className="flex justify-between items-start">
//           <h4 className="text-sm font-medium text-gray-800 mb-1">{card.title}</h4>
//           <button
//             onClick={handleDelete}
//             className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-all duration-200"
//             title="Delete card"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {card.description && (
//           <p className="text-xs text-gray-600 line-clamp-2 mt-1">{card.description}</p>
//         )}
        
//         {card.dueDate && (
//           <div className="mt-2">
//             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-flex items-center gap-1">
//               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Due: {new Date(card.dueDate).toLocaleDateString()}
//             </span>
//           </div>
//         )}
        
//         {card.labels && card.labels.length > 0 && (
//           <div className="flex gap-1 mt-2 flex-wrap">
//             {card.labels.map((label, index) => (
//               <span
//                 key={index}
//                 className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
//               >
//                 {label}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <CardModal
//           card={card}
//           listId={listId}
//           boardId={boardId}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// }