'use client';

import { useState } from 'react';
import { X, Palette, Image, Check } from 'lucide-react';
import { CreateBoardData } from '@/types/board';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateBoardData) => void;
  initialData?: Partial<CreateBoardData>;
}

const BOARD_COLORS = [
  '#0079BF', // Blue
  '#D29034', // Orange
  '#519839', // Green
  '#B04632', // Red
  '#89609E', // Purple
  '#CD5A91', // Pink
  '#4BBF6B', // Light Green
  '#00AECC', // Cyan
  '#838C91', // Gray
  '#FF991F', // Bright Orange
  '#7BC86C', // Light Green 2
  '#EF7564', // Coral
];

const BOARD_PHOTOS = [
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w-400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop',
];

export default function CreateBoardModal({
  isOpen,
  onClose,
  onCreate,
  initialData,
}: CreateBoardModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialData?.color || BOARD_COLORS[0]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [tab, setTab] = useState<'colors' | 'photos'>('colors');
  const [formData, setFormData] = useState<CreateBoardData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    color: initialData?.color || BOARD_COLORS[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a board name');
      return;
    }

    setIsCreating(true);
    
    try {
      const boardData: CreateBoardData = {
        ...formData,
        color: selectedColor,
      };
      
      if (selectedPhoto) {
        // If using photo, we might want to handle it differently
        // For now, we'll just use color
      }
      
      await onCreate(boardData);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        color: BOARD_COLORS[0],
      });
      setSelectedColor(BOARD_COLORS[0]);
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedPhoto(null); // Deselect photo when choosing color
  };

  const handlePhotoSelect = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    setSelectedColor(''); // Deselect color when choosing photo
  };

  const handleCustomColor = () => {
    const color = prompt('Enter hex color code (e.g., #FF5733):', selectedColor || '#0079BF');
    if (color && /^#[0-9A-F]{6}$/i.test(color)) {
      setSelectedColor(color);
      setSelectedPhoto(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Create board</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
            disabled={isCreating}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Board Preview */}
          <div className="mb-6">
            <div
              className="h-40 rounded-lg mb-2 flex items-center justify-center transition-all relative overflow-hidden"
              style={{
                backgroundColor: selectedColor || 'transparent',
                backgroundImage: selectedPhoto ? `url(${selectedPhoto})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!selectedPhoto && !selectedColor && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
              
              {formData.name ? (
                <span className="text-white font-bold text-xl bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {formData.name}
                </span>
              ) : (
                <span className="text-white/80 text-sm bg-black/30 px-3 py-1.5 rounded backdrop-blur-sm">
                  Board preview
                </span>
              )}
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              This is how your board will look
            </p>
          </div>

          {/* Background Selection Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setTab('colors')}
                className={`flex-1 py-2 font-medium text-sm ${
                  tab === 'colors'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Palette size={16} className="inline mr-2" />
                Colors
              </button>
              <button
                type="button"
                onClick={() => setTab('photos')}
                className={`flex-1 py-2 font-medium text-sm ${
                  tab === 'photos'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Image size={16} className="inline mr-2" />
                Photos
              </button>
            </div>

            {/* Colors Tab */}
            {tab === 'colors' && (
              <div>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {BOARD_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorSelect(color)}
                      className={`relative aspect-square rounded-lg transition-transform hover:scale-105 ${
                        selectedColor === color && !selectedPhoto
                          ? 'ring-2 ring-offset-2 ring-blue-500'
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                      disabled={isCreating}
                    >
                      {selectedColor === color && !selectedPhoto && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check size={20} className="text-white drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleCustomColor}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  disabled={isCreating}
                >
                  Custom color...
                </button>
              </div>
            )}

            {/* Photos Tab */}
            {tab === 'photos' && (
              <div>
                <div className="grid grid-cols-3 gap-2">
                  {BOARD_PHOTOS.map((photo) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => handlePhotoSelect(photo)}
                      className={`relative aspect-video rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                        selectedPhoto === photo
                          ? 'ring-2 ring-offset-2 ring-blue-500'
                          : ''
                      }`}
                      disabled={isCreating}
                    >
                      <img
                        src={photo}
                        alt="Board background"
                        className="w-full h-full object-cover"
                      />
                      {selectedPhoto === photo && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Check size={20} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Photos from Unsplash
                </p>
              </div>
            )}
          </div>

          {/* Board Name */}
          <div className="mb-4">
            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-2">
              Board title *
            </label>
            <input
              id="board-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., 'Project Alpha', 'Marketing Campaign'"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
              required
              autoFocus
              disabled={isCreating}
            />
          </div>

          {/* Board Description */}
          <div className="mb-6">
            <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="board-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What's this board about?"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
              disabled={isCreating}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium disabled:opacity-50"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !formData.name.trim()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm hover:shadow-md"
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                'Create board'
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500">
            Tip: You can always change the background and settings later from the board menu.
          </p>
        </div>
      </div>
    </div>
  );
}





// 'use client';

// import { useState } from 'react';
// import { 
//   X, 
//   Users, 
//   Calendar, 
//   Settings, 
//   Archive, 
//   Edit, 
//   Trash2,
//   Clock,
//   CheckSquare,
//   BarChart3,
//   MessageSquare,
//   Paperclip,
//   Share2,
//   MoreVertical,
//   EyeOff,
//   RotateCcw
// } from 'lucide-react';
// import { format } from 'date-fns';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Board } from '@/types/board';
// import { useBoardStore } from '@/store/board.store';
// import { Button } from '@/components/ui/button';
// import { UpdateBoardModal } from './UpdateBoardModal';
// import { useRouter } from 'next/navigation';

// interface BoardCardModalProps {
//   board: Board;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function BoardCardModal({ board, isOpen, onClose }: BoardCardModalProps) {
//   const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
//   const archiveBoard = useBoardStore((state) => state.archiveBoard);
//   const restoreBoard = useBoardStore((state) => state.restoreBoard);
//   const deleteBoard = useBoardStore((state) => state.deleteBoard);
//   const router = useRouter();

//   const handleOpenBoard = () => {
//     router.push(`/boards/${board.id}`);
//     onClose();
//   };

//   const handleArchive = () => {
//     if (confirm(`Archive "${board.name}"? It will be moved to archived boards.`)) {
//       archiveBoard(board.id);
//       onClose();
//     }
//   };

//   const handleRestore = () => {
//     restoreBoard(board.id);
//     onClose();
//   };

//   const handleDelete = () => {
//     if (confirm(`Permanently delete "${board.name}"? This action cannot be undone.`)) {
//       deleteBoard(board.id);
//       onClose();
//     }
//   };

//   const handleShare = () => {
//     // In real app, this would generate a shareable link
//     const shareUrl = `${window.location.origin}/boards/${board.id}`;
//     navigator.clipboard.writeText(shareUrl);
//     alert('Board link copied to clipboard!');
//   };

//   return (
//     <>
//       <Dialog.Root open={isOpen} onOpenChange={onClose}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
          
//           <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl data-[state=open]:animate-contentShow overflow-hidden">
            
//             {/* Header with color accent */}
//             <div 
//               className="h-2 w-full"
//               style={{ backgroundColor: board.color }}
//             />

//             <div className="p-6">
//               {/* Modal Header */}
//               <div className="flex items-start justify-between mb-6">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div 
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: board.color }}
//                     />
//                     <Dialog.Title className="text-2xl font-bold text-gray-900">
//                       {board.name}
//                     </Dialog.Title>
//                     {board.status === 'archived' && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
//                         <EyeOff className="h-3 w-3 mr-1" />
//                         Archived
//                       </span>
//                     )}
//                   </div>
                  
//                   {board.description && (
//                     <p className="text-gray-600">{board.description}</p>
//                   )}

//                   <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Created {format(board.createdAt, 'MMM d, yyyy')}
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-2" />
//                       Updated {format(board.updatedAt, 'MMM d, yyyy')}
//                     </div>
//                   </div>
//                 </div>

//                 <Dialog.Close asChild>
//                   <button className="text-gray-400 hover:text-gray-600 transition-colors ml-4">
//                     <X className="h-6 w-6" />
//                   </button>
//                 </Dialog.Close>
//               </div>

//               {/* Tabs */}
//               <div className="border-b mb-6">
//                 <nav className="flex space-x-8">
//                   {['overview', 'activity', 'settings'].map((tab) => (
//                     <button
//                       key={tab}
//                       className={`
//                         pb-3 px-1 font-medium capitalize border-b-2 transition-colors
//                         ${activeTab === tab
//                           ? 'border-blue-500 text-blue-600'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                         }
//                       `}
//                       onClick={() => setActiveTab(tab as any)}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               {/* Content Area */}
//               <div className="flex gap-8">
//                 {/* Main Content */}
//                 <div className="flex-1">
//                   {activeTab === 'overview' && (
//                     <div className="space-y-6">
//                       {/* Stats Grid */}
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="bg-blue-50 rounded-lg p-4">
//                           <div className="flex items-center mb-2">
//                             <CheckSquare className="h-5 w-5 text-blue-600 mr-2" />
//                             <span className="text-sm font-medium text-gray-600">Tasks</span>
//                           </div>
//                           <div className="text-2xl font-bold text-gray-900">{board.taskCount}</div>
//                         </div>

//                         <div className="bg-purple-50 rounded-lg p-4">
//                           <div className="flex items-center mb-2">
//                             <Users className="h-5 w-5 text-purple-600 mr-2" />
//                             <span className="text-sm font-medium text-gray-600">Members</span>
//                           </div>
//                           <div className="text-2xl font-bold text-gray-900">{board.memberCount}</div>
//                         </div>

//                         <div className="bg-green-50 rounded-lg p-4">
//                           <div className="flex items-center mb-2">
//                             <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
//                             <span className="text-sm font-medium text-gray-600">Completed</span>
//                           </div>
//                           <div className="text-2xl font-bold text-gray-900">
//                             {Math.floor(board.taskCount * 0.3)} {/* Mock data */}
//                           </div>
//                         </div>

//                         <div className="bg-yellow-50 rounded-lg p-4">
//                           <div className="flex items-center mb-2">
//                             <Clock className="h-5 w-5 text-yellow-600 mr-2" />
//                             <span className="text-sm font-medium text-gray-600">Active</span>
//                           </div>
//                           <div className="text-2xl font-bold text-gray-900">
//                             {Math.floor(board.taskCount * 0.5)} {/* Mock data */}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Quick Actions */}
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
//                         <div className="flex flex-wrap gap-3">
//                           <Button
//                             onClick={handleOpenBoard}
//                             className="bg-blue-600 hover:bg-blue-700"
//                           >
//                             Open Board
//                           </Button>
//                           <Button
//                             onClick={() => setIsUpdateModalOpen(true)}
//                             variant="outline"
//                           >
//                             <Edit className="h-4 w-4 mr-2" />
//                             Edit Details
//                           </Button>
//                           <Button
//                             onClick={handleShare}
//                             variant="outline"
//                           >
//                             <Share2 className="h-4 w-4 mr-2" />
//                             Share Board
//                           </Button>
//                           {board.status === 'archived' ? (
//                             <Button
//                               onClick={handleRestore}
//                               variant="outline"
//                               className="text-green-600 border-green-200 hover:bg-green-50"
//                             >
//                               <RotateCcw className="h-4 w-4 mr-2" />
//                               Restore Board
//                             </Button>
//                           ) : (
//                             <Button
//                               onClick={handleArchive}
//                               variant="outline"
//                               className="text-gray-600 hover:bg-gray-100"
//                             >
//                               <Archive className="h-4 w-4 mr-2" />
//                               Archive Board
//                             </Button>
//                           )}
//                         </div>
//                       </div>

//                       {/* Recent Activity (Mock) */}
//                       <div>
//                         <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
//                         <div className="space-y-3">
//                           {[1, 2, 3].map((i) => (
//                             <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
//                               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                                 <MessageSquare className="h-4 w-4 text-blue-600" />
//                               </div>
//                               <div>
//                                 <p className="text-sm text-gray-900">
//                                   <span className="font-medium">John Doe</span> added a comment
//                                 </p>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   2 hours ago • On task "Design Homepage"
//                                 </p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === 'activity' && (
//                     <div className="space-y-4">
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <p className="text-gray-600">Activity feed for this board will appear here.</p>
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === 'settings' && (
//                     <div className="space-y-6">
//                       <div>
//                         <h4 className="font-medium text-gray-900 mb-3">Board Settings</h4>
//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                             <div>
//                               <p className="font-medium">Allow guest comments</p>
//                               <p className="text-sm text-gray-600">Allow non-members to comment on tasks</p>
//                             </div>
//                             <label className="relative inline-flex items-center cursor-pointer">
//                               <input type="checkbox" className="sr-only peer" defaultChecked />
//                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                             </label>
//                           </div>

//                           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                             <div>
//                               <p className="font-medium">Show completed tasks</p>
//                               <p className="text-sm text-gray-600">Display completed tasks in the board</p>
//                             </div>
//                             <label className="relative inline-flex items-center cursor-pointer">
//                               <input type="checkbox" className="sr-only peer" defaultChecked />
//                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                             </label>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="border-t pt-6">
//                         <h4 className="font-medium text-gray-900 mb-3 text-red-600">Danger Zone</h4>
//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
//                             <div>
//                               <p className="font-medium text-red-800">
//                                 {board.status === 'archived' ? 'Delete Board' : 'Archive Board'}
//                               </p>
//                               <p className="text-sm text-red-600">
//                                 {board.status === 'archived' 
//                                   ? 'Permanently delete this board and all its content'
//                                   : 'Move this board to archived boards'}
//                               </p>
//                             </div>
//                             <Button
//                               onClick={board.status === 'archived' ? handleDelete : handleArchive}
//                               variant="destructive"
//                             >
//                               {board.status === 'archived' ? (
//                                 <>
//                                   <Trash2 className="h-4 w-4 mr-2" />
//                                   Delete Permanently
//                                 </>
//                               ) : (
//                                 <>
//                                   <Archive className="h-4 w-4 mr-2" />
//                                   Archive Board
//                                 </>
//                               )}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Sidebar */}
//                 <div className="w-64 border-l pl-6">
//                   <h4 className="font-medium text-gray-900 mb-4">Board Info</h4>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
//                       <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
//                         board.status === 'active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {board.status === 'active' ? 'Active' : 'Archived'}
//                       </div>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-1">Created By</p>
//                       <p className="text-gray-900">You</p>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
//                       <p className="text-gray-900">{format(board.updatedAt, 'MMM d, yyyy h:mm a')}</p>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-2">Color</p>
//                       <div className="flex items-center gap-2">
//                         <div 
//                           className="w-6 h-6 rounded"
//                           style={{ backgroundColor: board.color }}
//                         />
//                         <span className="text-gray-900">{board.color}</span>
//                       </div>
//                     </div>

//                     <div className="pt-4 border-t">
//                       <p className="text-sm font-medium text-gray-500 mb-3">Quick Links</p>
//                       <div className="space-y-2">
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start text-gray-700 hover:bg-gray-100"
//                           onClick={() => setIsUpdateModalOpen(true)}
//                         >
//                           <Settings className="h-4 w-4 mr-2" />
//                           Board Settings
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start text-gray-700 hover:bg-gray-100"
//                           onClick={handleShare}
//                         >
//                           <Share2 className="h-4 w-4 mr-2" />
//                           Share Board
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start text-gray-700 hover:bg-gray-100"
//                           onClick={handleOpenBoard}
//                         >
//                           <CheckSquare className="h-4 w-4 mr-2" />
//                           Open Tasks
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>

//       {/* Update Board Modal */}
//       <UpdateBoardModal
//         board={board}
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//       />
//     </>
//   );
// }