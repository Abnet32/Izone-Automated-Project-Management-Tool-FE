'use client';
import React from 'react';


interface Props {
isOpen: boolean;
onClose: () => void;
children: React.ReactNode;
}


export default function Modal({ isOpen, onClose, children }: Props) {
if (!isOpen) return null;
return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
<div className="absolute inset-0 bg-black/40" onClick={onClose} />
<div className="bg-white p-4 rounded shadow z-10 w-full max-w-md">{children}</div>
</div>
);
}


// 'use client';
// import { useEffect } from 'react';
// import { X } from 'lucide-react';
// import { Button } from './button';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
// }

// export function Modal({ isOpen, onClose, title, children }: ModalProps) {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onClose}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
        
//         {/* Content */}
//         <div className="p-4">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }