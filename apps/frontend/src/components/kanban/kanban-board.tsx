'use client';

import { useState, useEffect } from 'react';
import { ClientKanbanBoard } from './client-kanban-board';
import { OnboardingWizard } from '../onboarding/onboarding-wizard';
import { Rocket } from 'lucide-react';
import { useWorkspace } from '@/hooks/kanban/use-workspace';

export function KanbanBoard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { currentBoard, isLoading } = useWorkspace();

  // Show onboarding if no board exists
  useEffect(() => {
    if (!isLoading && !currentBoard) {
      setShowOnboarding(true);
    }
  }, [isLoading, currentBoard]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleReopenOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <>
      {showOnboarding && (
        <OnboardingWizard 
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      )}
      
      <ClientKanbanBoard />
      
      {/* Floating help button to reopen onboarding */}
      {!showOnboarding && currentBoard && (
        <button
          onClick={handleReopenOnboarding}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
          title="Open tutorial"
        >
          <Rocket className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

export default KanbanBoard;

// 'use client';

// import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

// // Dynamically import the Kanban board with SSR disabled
// const ClientKanbanBoard = dynamic(() => import('./client-kanban-board'), {
//   ssr: false,
//   loading: () => <KanbanBoardSkeleton />,
// });

// // Skeleton loader component
// function KanbanBoardSkeleton() {
//   return (
//     <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//       {/* Skeleton Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
//           <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
//           <div className="flex -space-x-2">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Skeleton Columns */}
//       <div className="flex gap-6 overflow-x-auto pb-6">
//         {[1, 2, 3, 4, 5].map(i => (
//           <div key={i} className="flex-shrink-0 w-80">
//             <div className="bg-gray-200 p-4 rounded-t-lg animate-pulse h-12"></div>
//             <div className="bg-gray-100 rounded-b-lg min-h-96 p-3 space-y-3">
//               {[1, 2, 3].map(j => (
//                 <div key={j} className="bg-white rounded-lg p-3 h-20 animate-pulse"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function KanbanBoard() {
//   return (
//     <Suspense fallback={<KanbanBoardSkeleton />}>
//       <ClientKanbanBoard />
//     </Suspense>
//   );
// }

// export default KanbanBoard;

