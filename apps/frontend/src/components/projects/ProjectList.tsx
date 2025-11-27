import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onArchiveProject: (projectId: string) => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectList({ 
  projects, 
  onEditProject, 
  onArchiveProject, 
  onSelectProject 
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No projects found</div>
        <div className="text-sm text-gray-400 mt-1">
          Create your first project to get started
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEditProject}
          onArchive={onArchiveProject}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}