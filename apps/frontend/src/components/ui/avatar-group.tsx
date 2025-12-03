'use client';

import { cn } from '@/lib/utils';

interface AvatarGroupProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

export function AvatarGroup({ children, className, max }: AvatarGroupProps) {
  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {children}
    </div>
  );
}