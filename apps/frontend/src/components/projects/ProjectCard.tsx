import { Project } from '@/types/project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Settings, Users } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onArchive: (projectId: string) => void;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onArchive, onSelect }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div 
            className="flex-1"
            onClick={() => onSelect(project)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: project.color }}
              />
              <h3 className="font-semibold text-lg">{project.name}</h3>
            </div>
            {project.description && (
              <p className="text-gray-600 text-sm">{project.description}</p>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(project)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onArchive(project.id)}
            >
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.members.length} members</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}