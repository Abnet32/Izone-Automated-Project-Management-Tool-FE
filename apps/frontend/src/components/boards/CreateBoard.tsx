"use client";

import { useState } from "react";
import { Privacy } from "@/lib/types";

type Props = {
  onCreate: (data: { name: string; privacy: Privacy }) => void;
};

export default function CreateBoard({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<Privacy>("workspace");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onCreate({ name, privacy });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-white rounded shadow">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Board name"
        className="border p-2 rounded"
      />
      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value as Privacy)}
        className="border p-2 rounded"
      >
        <option value="workspace">Workspace</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Board
      </button>
    </form>
  );
}
