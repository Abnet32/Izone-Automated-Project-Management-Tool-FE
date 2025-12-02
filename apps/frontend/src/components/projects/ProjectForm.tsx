// components/Project/ProjectForm.jsx
import { useState } from 'react';

const ProjectForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({
        name: name.trim(),
        description: description.trim()
      });
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          rows={3}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Project
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;




// 'use client';
// import { useState } from 'react';
// import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface ProjectFormProps {
//   project?: Project;
//   onSubmit: (data: CreateProjectData | UpdateProjectData) => void;
//   onCancel: () => void;
//   loading?: boolean;
// }

// const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

// export function ProjectForm({ project, onSubmit, onCancel, loading }: ProjectFormProps) {
//   const [formData, setFormData] = useState({
//     name: project?.name || '',
//     description: project?.description || '',
//     color: project?.color || colors[0]
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium mb-2">Project Name</label>
//         <Input
//           value={formData.name}
//           onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//           placeholder="Enter project name"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Description</label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//           placeholder="Project description"
//           rows={3}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Color</label>
//         <div className="flex gap-2">
//           {colors.map(color => (
//             <button
//               key={color}
//               type="button"
//               className={`w-8 h-8 rounded-full border-2 ${
//                 formData.color === color ? 'border-gray-900' : 'border-transparent'
//               }`}
//               style={{ backgroundColor: color }}
//               onClick={() => setFormData(prev => ({ ...prev, color }))}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2 justify-end pt-4">
//         <Button 
//           type="button" 
//           variant="outline" 
//           onClick={onCancel}
//           disabled={loading}
//         >
//           Cancel
//         </Button>
//         <Button 
//           type="submit" 
//           disabled={loading}
//         >
//           {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
//         </Button>
//       </div>
//     </form>
//   );
// }