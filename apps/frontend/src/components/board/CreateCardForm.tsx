"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app.store";

interface CreateCardFormProps {
  listId: string;
  boardId: string;
}

export default function CreateCardForm({ listId, boardId }: CreateCardFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const createCard = useAppStore((state) => state.createCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createCard(boardId, listId, { title: title.trim() });
      setTitle("");
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2.5 rounded transition-colors duration-200 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add a card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for this card..."
        className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        rows={3}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex-1"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={() => {
            setIsCreating(false);
            setTitle("");
          }}
          className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}



// "use client";

// import { useState } from "react";
// import { useBoardStore } from "@/store/board.store";

// interface CreateCardFormProps {
//   listId: string;
//   boardId: string;
// }

// export default function CreateCardForm({ listId, boardId }: CreateCardFormProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [title, setTitle] = useState("");
//   const createCard = useBoardStore((state) => state.createCard);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       createCard(boardId, listId, title.trim());
//       setTitle("");
//       setIsCreating(false);
//     }
//   };

//   if (!isCreating) {
//     return (
//       <button
//         onClick={() => setIsCreating(true)}
//         className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2.5 rounded transition-colors duration-200 flex items-center gap-2"
//       >
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//         </svg>
//         Add a card
//       </button>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter a title for this card..."
//         className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//         rows={3}
//         autoFocus
//       />
//       <div className="flex gap-2">
//         <button
//           type="submit"
//           className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex-1"
//         >
//           Add card
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setIsCreating(false);
//             setTitle("");
//           }}
//           className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }