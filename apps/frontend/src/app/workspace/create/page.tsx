'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function CreateWorkspacePage() {
  const router = useRouter();
  const { createWorkspace } = useWorkspace();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);

    try {
      const newWorkspace = await createWorkspace({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      router.push(`/workspace/${newWorkspace.id}`);
    } catch (error) {
      console.error('Failed to create workspace:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Workspace</h1>
          <p className="text-gray-600 mt-2">
            A workspace is where you'll organize your boards and collaborate with your team.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Marketing Team, Web Development, Company Projects"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>

            {/* Workspace Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this workspace..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!name.trim() || isLoading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create Workspace'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function CreateWorkspacePage() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) return;

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       // In a real app, you would create the workspace via API
//       const newWorkspaceId = `ws-${Date.now()}`;
//       router.push(`/workspace/${newWorkspaceId}`);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <Link 
//             href="/dashboard"
//             className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Dashboard
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Create New Workspace</h1>
//           <p className="text-gray-600 mt-2">
//             A workspace is where you'll organize your boards and collaborate with your team.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Workspace Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                 Workspace Name *
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="e.g., Marketing Team, Web Development, Company Projects"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 required
//                 autoFocus
//               />
//             </div>

//             {/* Workspace Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-gray-500">(optional)</span>
//               </label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe the purpose of this workspace..."
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
//               />
//             </div>

//             {/* Features */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-900 mb-2">Workspace Features</h3>
//               <ul className="text-blue-800 text-sm space-y-1">
//                 <li className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Organize multiple boards in one place
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Collaborate with team members
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Set different permissions and access levels
//                 </li>
//               </ul>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-4">
//               <Link
//                 href="/dashboard"
//                 className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center"
//               >
//                 Cancel
//               </Link>
//               <button
//                 type="submit"
//                 disabled={!name.trim() || isLoading}
//                 className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 {isLoading ? 'Creating...' : 'Create Workspace'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }