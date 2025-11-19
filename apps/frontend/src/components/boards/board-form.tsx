'use client';

import { useState } from 'react';
import { Board, Member, Workspace } from '@/lib/types/workspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus } from 'lucide-react';

interface BoardFormProps {
  workspace: Workspace;
  board?: Board;
  onSubmit: (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'columns'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BOARD_TEMPLATES = [
  {
    id: 'basic',
    name: 'Basic Kanban',
    columns: ['To Do', 'In Progress', 'Done'],
    description: 'Simple 3-column workflow'
  },
  {
    id: 'development',
    name: 'Development',
    columns: ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'],
    description: 'Software development workflow'
  },
  {
    id: 'project',
    name: 'Project Management',
    columns: ['Backlog', 'Planning', 'In Progress', 'Review', 'Done'],
    description: 'General project management'
  },
  {
    id: 'custom',
    name: 'Custom',
    columns: [],
    description: 'Start from scratch'
  }
];

export function BoardForm({ workspace, board, onSubmit, onCancel, isLoading = false }: BoardFormProps) {
  const [formData, setFormData] = useState({
    name: board?.name || '',
    description: board?.description || '',
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState(board ? 'custom' : 'basic');
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(board?.members || workspace.members);
  const [customColumns, setCustomColumns] = useState<string[]>(['To Do', 'In Progress', 'Done']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const template = BOARD_TEMPLATES.find(t => t.id === selectedTemplate);
    const columns = selectedTemplate === 'custom' ? customColumns : (template?.columns || []);
    
    onSubmit({
      ...formData,
      workspaceId: workspace.id,
      members: selectedMembers,
    });
  };

  const toggleMember = (member: Member) => {
    setSelectedMembers(prev => 
      prev.find(m => m.id === member.id)
        ? prev.filter(m => m.id !== member.id)
        : [...prev, member]
    );
  };

  const addCustomColumn = () => {
    setCustomColumns(prev => [...prev, 'New Column']);
  };

  const updateCustomColumn = (index: number, value: string) => {
    setCustomColumns(prev => prev.map((col, i) => i === index ? value : col));
  };

  const removeCustomColumn = (index: number) => {
    setCustomColumns(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {board ? 'Edit Board' : 'Create New Board'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Board Name & Description */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Board Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter board name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this board is for"
                rows={2}
              />
            </div>
          </div>

          {/* Template Selection */}
          {!board && (
            <div className="space-y-4">
              <Label>Choose a Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BOARD_TEMPLATES.map(template => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {template.description}
                      </div>
                      {template.columns.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {template.columns.map(column => (
                            <Badge key={column} variant="outline" className="text-xs">
                              {column}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Custom Columns Editor */}
          {selectedTemplate === 'custom' && !board && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Board Columns</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCustomColumn}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Column
                </Button>
              </div>
              
              <div className="space-y-2">
                {customColumns.map((column, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={column}
                      onChange={(e) => updateCustomColumn(index, e.target.value)}
                      placeholder="Column name"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomColumn(index)}
                      disabled={customColumns.length <= 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members Selection */}
          <div className="space-y-4">
            <Label>Team Members</Label>
            <div className="space-y-2">
              {workspace.members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                  <Checkbox
                    checked={!!selectedMembers.find(m => m.id === member.id)}
                    onCheckedChange={() => toggleMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : board ? 'Update Board' : 'Create Board'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}