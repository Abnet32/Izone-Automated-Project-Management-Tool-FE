
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/hooks/useWorkspace';
import { ArrowLeft, Globe, Lock, Users, Palette } from 'lucide-react';
import Link from 'next/link';

const colorOptions = [
  { value: '#0079bf', label: 'Blue' },
  { value: '#d29034', label: 'Orange' },
  { value: '#519839', label: 'Green' },
  { value: '#b04632', label: 'Red' },
  { value: '#89609e', label: 'Purple' },
  { value: '#00aECC', label: 'Teal' },
  { value: '#838C91', label: 'Gray' },
  { value: '#ff78cb', label: 'Pink' },
];

export default function CreateWorkspacePage() {
  const router = useRouter();
  const { addWorkspace, loadWorkspaces } = useWorkspace();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'team'>('private');
  const [color, setColor] = useState('#0079bf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const newWorkspace = await addWorkspace({
        name: name.trim(),
        description: description.trim() || undefined,
        visibility,
        color,
      });

      // Refresh workspaces list
      await loadWorkspaces();

      // Redirect to the new workspace
      router.push(`/workspace/${newWorkspace.id}`);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/workspace" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to workspaces
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Workspace</h1>
          <p className="text-gray-600 text-sm">Organize your boards and collaborate with your team</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Workspace Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  Workspace name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="e.g., Marketing Team, Product Development"
                required
                autoFocus
              />
              <p className="text-sm text-gray-500 mt-2">
                This is the name of your company, team, or project.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Description <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="What's this workspace for? Describe the purpose or goals."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-2">
                Let team members know what this workspace is about.
              </p>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Workspace visibility
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setVisibility('private')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    visibility === 'private'
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      visibility === 'private' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Lock className={`w-5 h-5 ${
                        visibility === 'private' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      visibility === 'private' ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      Private
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Only you and invited members can access
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibility('team')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    visibility === 'team'
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      visibility === 'team' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Users className={`w-5 h-5 ${
                        visibility === 'team' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      visibility === 'team' ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      Team
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Only invited team members can access
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibility('public')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    visibility === 'public'
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      visibility === 'public' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Globe className={`w-5 h-5 ${
                        visibility === 'public' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      visibility === 'public' ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      Public
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Anyone can find and view this workspace
                  </p>
                </button>
              </div>
            </div>

            {/* Color Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color Theme
                </span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setColor(option.value)}
                    className={`relative w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                      color === option.value 
                        ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' 
                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                    }`}
                    style={{ backgroundColor: option.value }}
                    title={option.label}
                  >
                    {color === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full opacity-90" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Choose a color that represents your workspace
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/workspace"
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[140px] flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Workspace'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Workspaces are free to create. You can invite unlimited members and create unlimited boards.
          </p>
        </div>
      </main>
    </div>
  );
}


