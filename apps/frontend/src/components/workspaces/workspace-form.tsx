'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


interface Props {
initial?: { name?: string; description?: string };
onSubmit: (payload: { name: string; description?: string }) => Promise<void> | void;
}


export default function WorkspaceForm({ initial, onSubmit }: Props) {
const [name, setName] = useState(initial?.name || '');
const [description, setDescription] = useState(initial?.description || '');
const [submitting, setSubmitting] = useState(false);


async function handle(e: React.FormEvent) {
e.preventDefault();
setSubmitting(true);
try {
await onSubmit({ name, description });
setName('');
setDescription('');
} finally {
setSubmitting(false);
}
}


return (
<form onSubmit={handle} className="flex flex-col gap-3">
<Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
<label className="flex flex-col gap-1">
<span className="text-sm">Description</span>
<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border px-2 py-1 rounded" />
</label>
<div className="flex gap-2">
<Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</Button>
</div>
</form>
);
}




// 'use client';

// import { useState } from 'react';
// import { Workspace, Member } from '@/lib/types/workspace';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { X, Plus, Search } from 'lucide-react';

// interface WorkspaceFormProps {
//   workspace?: Workspace;
//   onSubmit: (workspaceData: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt' | 'boards'>) => void;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// // Mock users for demo - replace with actual user search
// const mockUsers: Member[] = [
//   { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '', role: 'member' },
//   { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '', role: 'member' },
//   { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '', role: 'member' },
//   { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '', role: 'member' },
// ];

// const EMOJIS = ['🚀', '🔥', '💼', '🌟', '🎯', '📊', '👥', '💻', '📈', '🎨'];
// const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

// export function WorkspaceForm({ workspace, onSubmit, onCancel, isLoading = false }: WorkspaceFormProps) {
//   const [formData, setFormData] = useState({
//     name: workspace?.name || '',
//     description: workspace?.description || '',
//     emoji: workspace?.emoji || '🚀',
//     color: workspace?.color || '#3B82F6',
//   });
  
//   const [members, setMembers] = useState<Member[]>(workspace?.members || []);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showUserSearch, setShowUserSearch] = useState(false);

//   const filteredUsers = mockUsers.filter(user => 
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   ).filter(user => !members.find(m => m.id === user.id));

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       members,
//     });
//   };

//   const addMember = (user: Member) => {
//     setMembers(prev => [...prev, user]);
//     setSearchQuery('');
//     setShowUserSearch(false);
//   };

//   const removeMember = (memberId: string) => {
//     setMembers(prev => prev.filter(m => m.id !== memberId));
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle>
//           {workspace ? 'Edit Workspace' : 'Create New Workspace'}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Emoji & Color Selection */}
//           <div className="flex gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="emoji">Emoji</Label>
//               <div className="flex gap-2 flex-wrap">
//                 {EMOJIS.map(emoji => (
//                   <button
//                     key={emoji}
//                     type="button"
//                     className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center border-2 transition-colors ${
//                       formData.emoji === emoji 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                     onClick={() => setFormData(prev => ({ ...prev, emoji }))}
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="color">Color</Label>
//               <div className="flex gap-2 flex-wrap">
//                 {COLORS.map(color => (
//                   <button
//                     key={color}
//                     type="button"
//                     className={`w-10 h-10 rounded-lg border-2 transition-colors ${
//                       formData.color === color 
//                         ? 'border-blue-500' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                     style={{ backgroundColor: color }}
//                     onClick={() => setFormData(prev => ({ ...prev, color }))}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Name & Description */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Workspace Name</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                 placeholder="Enter workspace name"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                 placeholder="Describe what this workspace is for"
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Members Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Team Members</Label>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowUserSearch(true)}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Member
//               </Button>
//             </div>

//             {/* Selected Members */}
//             {members.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {members.map(member => (
//                   <Badge key={member.id} variant="secondary" className="flex items-center gap-2 py-1">
//                     <Avatar className="w-4 h-4">
//                       <AvatarImage src={member.avatar} />
//                       <AvatarFallback className="text-xs">
//                         {member.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
//                     {member.name}
//                     <button
//                       type="button"
//                       onClick={() => removeMember(member.id)}
//                       className="hover:text-destructive"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             )}

//             {/* User Search */}
//             {showUserSearch && (
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <Search className="w-4 h-4 text-gray-500" />
//                       <Input
//                         placeholder="Search users by name or email..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="flex-1"
//                       />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => {
//                           setShowUserSearch(false);
//                           setSearchQuery('');
//                         }}
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>

//                     {filteredUsers.length > 0 ? (
//                       <div className="space-y-2 max-h-32 overflow-y-auto">
//                         {filteredUsers.map(user => (
//                           <div
//                             key={user.id}
//                             className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                             onClick={() => addMember(user)}
//                           >
//                             <div className="flex items-center gap-3">
//                               <Avatar className="w-8 h-8">
//                                 <AvatarImage src={user.avatar} />
//                                 <AvatarFallback className="text-sm">
//                                   {user.name.split(' ').map(n => n[0]).join('')}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <div className="font-medium text-sm">{user.name}</div>
//                                 <div className="text-xs text-gray-500">{user.email}</div>
//                               </div>
//                             </div>
//                             <Plus className="w-4 h-4 text-gray-400" />
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center text-sm text-gray-500 py-4">
//                         No users found
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-3 justify-end pt-4 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? 'Creating...' : workspace ? 'Update Workspace' : 'Create Workspace'}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }