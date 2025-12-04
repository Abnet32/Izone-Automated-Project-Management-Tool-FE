'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface WorkspaceFormProps {
  onSubmit: (data: any) => Promise<void> | void;
  onCancel: () => void;
}

const colorOptions = [
  { value: '#0079bf', label: 'Blue' },
  { value: '#d29034', label: 'Orange' },
  { value: '#519839', label: 'Green' },
  { value: '#b04632', label: 'Red' },
  { value: '#89609e', label: 'Purple' },
  { value: '#00aECC', label: 'Teal' },
  { value: '#838C91', label: 'Gray' },
];

export const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#0079bf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        color,
        visibility: 'private', // Default to private
      });
      setName('');
      setDescription('');
      setColor('#0079bf');
    } catch (error) {
      console.error('Failed to submit workspace form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Create Workspace</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Marketing Team"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this workspace for?"
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label>Color Theme</Label>
        <div className="flex gap-2 mt-2">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setColor(option.value)}
              className={`w-8 h-8 rounded-full ${color === option.value ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
              style={{ backgroundColor: option.value }}
              title={option.label}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!name.trim() || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Workspace'}
        </Button>
      </div>
    </form>
  );
};