// "use client";

// import { useState } from "react";
// import { Button } from "../ui/button";

// interface Props {
//   initialName?: string;
//   onSubmit: (name: string) => void;
// }

// export function BoardForm({ initialName = "", onSubmit }: Props) {
//   const [name, setName] = useState(initialName);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name) return;
//     onSubmit(name);
//     setName("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Board name"
//         className="p-2 border rounded"
//       />
//       <Button type="submit">Save</Button>
//     </form>
//   );
// }
