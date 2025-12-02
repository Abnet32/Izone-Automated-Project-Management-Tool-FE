"use client";

import Link from "next/link";
import { Board } from "@/lib/types";

type Props = { board: Board; workspaceId: string };

export default function BoardCard({ board, workspaceId }: Props) {
  return (
    <Link href={`/workspace/${workspaceId}/board/${board.id}`}>
      <div className="p-4 bg-gray-100 rounded hover:shadow cursor-pointer">
        <h3 className="font-bold">{board.name}</h3>
        <p className="text-sm text-gray-600">{board.privacy}</p>
      </div>
    </Link>
  );
}
