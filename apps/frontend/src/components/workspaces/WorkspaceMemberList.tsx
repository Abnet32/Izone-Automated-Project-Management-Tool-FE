'use client';
import React from 'react';
import { WorkspaceMember } from '@/types/member';


export default function WorkspaceMemberList({ members, onRemove }:{ members: WorkspaceMember[]; onRemove?: (userId: string)=>void }){
return (
<div className="flex flex-col gap-2">
{members.map(m => (
<div key={m.id} className="flex items-center justify-between border rounded p-2">
<div>
<div className="font-medium">{m.user?.full_name ?? m.user_id}</div>
<div className="text-sm text-muted">{m.role}</div>
</div>
{onRemove && (
<button onClick={()=>onRemove(m.user_id)} className="text-sm text-red-600">Remove</button>
)}
</div>
))}
</div>
);
}