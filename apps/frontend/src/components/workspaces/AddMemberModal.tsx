"use client";

import { useState } from "react";

interface CreateWorkspaceModalProps {
  onSubmit: (data: { name: string; description?: string; visibility: string }) => void;
  onClose: () => void;
}

export default function CreateWorkspaceModal({ onSubmit, onClose }: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"workspace" | "private" | "public">("workspace");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Please enter a workspace name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        visibility,
      });
    } catch (error) {
      console.error("Failed to create workspace:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create Workspace</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              disabled={isSubmitting}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workspace Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Marketing Team"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  autoFocus
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this workspace about?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Visibility
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "workspace", label: "Workspace", icon: "🏢", desc: "Visible to workspace members" },
                    { value: "private", label: "Private", icon: "🔒", desc: "Only invited members" },
                    { value: "public", label: "Public", icon: "🌐", desc: "Visible to everyone" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setVisibility(option.value as any)}
                      className={`p-4 border rounded-lg text-center transition-all duration-200 ${
                        visibility === option.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isSubmitting}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Workspace"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// 'use client';
// import React, { useState } from 'react';
// import Modal from '@/components/ui/modal';