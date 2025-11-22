'use client';

import { useState } from 'react';
import { BoardWithDetails } from '@/types';
import { ListComponent } from './List';
import { useList } from '@/hooks/useLists';
import { AddList } from './AddList';

interface ListContainerProps {
  board: BoardWithDetails;
  onRefresh?: () => Promise<void> | void;
}

export function ListContainer({ board, onRefresh }: ListContainerProps) {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  // Start by hiding lists (so only the AddList pill is visible for new boards).
  // After the user creates a list we switch to the full lists view.
  const [showLists, setShowLists] = useState<boolean>(false);
  const { createList, isLoading } = useList();
  const visibleLists = board.lists ? board.lists.filter(l => !l.isDefault) : [];

  const handleAddList = async () => {
    if (!newListTitle.trim()) return;

    try {
      await createList({
        title: newListTitle.trim(),
        boardId: board.id,
        position: board.lists.length,
      });
      setNewListTitle('');
      setIsAddingList(false);
      setShowLists(true);
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };

  return (
    // Make the lists area span the available space and allow horizontal scrolling
    // so the background image can show full-bleed behind it.
    <div className="flex-1 overflow-x-auto">
      <div className="flex items-start gap-4 px-6 py-6 min-h-[calc(100vh-6rem)]">
        {/* Always show the AddList pill as the first column (left-most) */}
        <div className="shrink-0">
          <AddList
            fullWidth={!showLists}
            onCreateList={async (title: string) => {
              try {
                await createList({
                  title,
                  boardId: board.id,
                  position: visibleLists.length,
                });
                // After creating, switch to full lists view and refresh
                setShowLists(true);
                if (onRefresh) {
                  try { await onRefresh(); } catch (e) { /* ignore */ }
                }
              } catch (err) {
                console.error('Failed to create list from AddList component', err);
              }
            }}
          />
        </div>

        {/* Render existing lists (full board view) when enabled */}
        {showLists && (
          <>
            {visibleLists.map((list) => (
              <ListComponent key={list.id} list={list} onRefresh={onRefresh} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}



