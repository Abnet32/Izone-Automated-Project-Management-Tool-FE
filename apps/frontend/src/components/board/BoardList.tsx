'use client';

import { useBoards } from '@/hooks/useBoards';
import CreateBoardButton from './CreateBoardButton';
import { Trello, Users, CheckSquare } from 'lucide-react';

export default function BoardsList() {
  const boards = useBoards();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Workspace</h1>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {boards.map((board) => (
          <div
            key={board.id}
            className="h-40 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            style={{ backgroundColor: board.color }}
            onClick={() => {
              // Navigate to board page
              // router.push(`/board/${board.id}`);
            }}
          >
            <div className="h-full flex flex-col justify-between text-white">
              <div>
                <h3 className="font-bold text-lg mb-2">{board.name}</h3>
                {board.description && (
                  <p className="text-sm opacity-90">{board.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{board.memberCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckSquare size={16} />
                  <span>{board.taskCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create Board Card */}
        <div className="h-40 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <CreateBoardButton />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trello size={20} />
          How to create a new board
        </h2>
        <ol className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
              1
            </span>
            <span>Go to your Workspace in Trello</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
              2
            </span>
            <span>Click "Create new board" button</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
              3
            </span>
            <span>OR click the plus (+) button at the top beside your name</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
              4
            </span>
            <span>Select "Create Board" and fill in the details</span>
          </li>
        </ol>
      </div>
    </div>
  );
}







// "use client";

// import { useState } from "react";
// import { List } from "@/types/board";
// import { useBoardStore } from "@/store/board.store";
// import CardItem from "./CardItem";

// interface BoardListProps {
//   boardId: string;
//   list: List;
// }

// export default function BoardList({ boardId, list }: BoardListProps) {
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [cardTitle, setCardTitle] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [listTitle, setListTitle] = useState(list.title);
  
//   const addCard = useBoardStore((state) => state.addCard);
//   const updateList = useBoardStore((state) => state.updateList);
//   const deleteList = useBoardStore((state) => state.deleteList);

//   const handleAddCard = () => {
//     if (cardTitle.trim()) {
//       addCard(boardId, list.id, cardTitle.trim());
//       setCardTitle("");
//       setIsAddingCard(false);
//     }
//   };

//   const handleUpdateList = () => {
//     if (listTitle.trim() && listTitle !== list.title) {
//       updateList(boardId, list.id, { title: listTitle.trim() });
//     }
//     setIsEditing(false);
//   };

//   const handleDeleteList = () => {
//     if (confirm("Are you sure you want to delete this list?")) {
//       deleteList(boardId, list.id);
//     }
//   };

//   return (
//     <div className="w-80 bg-gray-50 rounded-lg shadow-sm flex-shrink-0 h-fit flex flex-col border border-gray-200">
//       {/* List Header */}
//       <div className="p-4 border-b border-gray-200 bg-white/50">
//         <div className="flex items-center justify-between">
//           <div className="flex-1 min-w-0">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={listTitle}
//                 onChange={(e) => setListTitle(e.target.value)}
//                 onBlur={handleUpdateList}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleUpdateList();
//                   if (e.key === "Escape") {
//                     setListTitle(list.title);
//                     setIsEditing(false);
//                   }
//                 }}
//                 className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 autoFocus
//               />
//             ) : (
//               <h3
//                 className="text-sm font-semibold text-gray-800 cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded transition-colors duration-200 truncate"
//                 onClick={() => setIsEditing(true)}
//                 title="Click to edit"
//               >
//                 {list.title}
//               </h3>
//             )}
//           </div>
          
//           <div className="flex items-center gap-1">
//             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//               {list.cards.length}
//             </span>
//             <button
//               onClick={handleDeleteList}
//               className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded transition-colors duration-200"
//               title="Delete list"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cards Container */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[40px] max-h-[calc(100vh-300px)]">
//         {list.cards.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="w-12 h-12 mx-auto mb-3 text-gray-300">
//               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//             </div>
//             <p className="text-gray-400 text-sm">No cards yet</p>
//             <p className="text-gray-300 text-xs mt-1">Add a card to get started</p>
//           </div>
//         ) : (
//           list.cards.map((card) => (
//             <CardItem
//               key={card.id}
//               card={card}
//               boardId={boardId}
//               listId={list.id}
//             />
//           ))
//         )}
//       </div>

//       {/* Add Card Form */}
//       <div className="p-3 border-t border-gray-200 bg-white/30">
//         {isAddingCard ? (
//           <div className="space-y-2">
//             <textarea
//               value={cardTitle}
//               onChange={(e) => setCardTitle(e.target.value)}
//               placeholder="Enter a title for this card..."
//               className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//               rows={2}
//               autoFocus
//             />
//             <div className="flex gap-2">
//               <button
//                 onClick={handleAddCard}
//                 className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Add card
//               </button>
//               <button
//                 onClick={() => {
//                   setIsAddingCard(false);
//                   setCardTitle("");
//                 }}
//                 className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-sm rounded transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsAddingCard(true)}
//             className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center gap-2 text-sm"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             Add a card
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



// // components/Board/BoardList.jsx
// import { useState } from 'react';
// import BoardCard from './BoardCard';

// const BoardList = ({ list, onAddCard, onUpdateCard, onLabelToggle }) => {
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [newCardTitle, setNewCardTitle] = useState('');

//   const handleAddCard = () => {
//     if (newCardTitle.trim()) {
//       onAddCard(list.id, {
//         title: newCardTitle.trim(),
//         description: ''
//       });
//       setNewCardTitle('');
//       setIsAddingCard(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 rounded-lg p-3 w-64 flex-shrink-0">
//       <h3 className="font-semibold text-gray-800 mb-3">{list.name}</h3>
      
//       {/* Cards */}
//       <div className="space-y-2">
//         {list.cards.map(card => (
//           <BoardCard
//             key={card.id}
//             card={card}
//             onCardClick={(card) => onUpdateCard(list.id, card)}
//             onLabelToggle={(cardId, label) => onLabelToggle(list.id, cardId, label)}
//           />
//         ))}
//       </div>

//       {/* Add Card */}
//       {isAddingCard ? (
//         <div className="mt-3">
//           <textarea
//             value={newCardTitle}
//             onChange={(e) => setNewCardTitle(e.target.value)}
//             placeholder="Enter a title for this card..."
//             className="w-full p-2 border rounded text-sm resize-none"
//             rows={3}
//             autoFocus
//           />
//           <div className="flex gap-2 mt-2">
//             <button
//               onClick={handleAddCard}
//               className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//             >
//               Add Card
//             </button>
//             <button
//               onClick={() => setIsAddingCard(false)}
//               className="text-gray-500 px-3 py-1 rounded text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsAddingCard(true)}
//           className="w-full mt-3 text-gray-600 hover:bg-gray-200 py-2 rounded text-sm text-left px-2"
//         >
//           + Add a card
//         </button>
//       )}
//     </div>
//   );
// };

// export default BoardList;


// // import { BoardCard } from "./BoardCard";
// // import { Board } from "@/types/board";

// // interface Props { boards: Board[] }

// // export function BoardList({ boards }: Props) {
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //       {boards.map((b) => (
// //         <BoardCard key={b.id} board={b} />
// //       ))}
// //     </div>
// //   );
// // }
