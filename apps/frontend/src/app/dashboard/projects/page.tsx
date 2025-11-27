'use client';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProject'; 
import { ProjectList } from '@/components/projects/ProjectList';
import { ProjectForm } from '@/components/projects/ProjectForm'; 
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation'; 

export default function ProjectsPage() {
  const router = useRouter();
  const workspaceId = '1';
  const { projects, loading, error, createProject, updateProject, archiveProject } = useProjects(workspaceId);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreateProject = async (data) => {
    try {
      await createProject({ ...data, workspaceId });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleUpdateProject = async (data) => {
    try {
      await updateProject(editingProject.id, data);
      setEditingProject(null);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleArchiveProject = async (projectId: string) => {
    if (confirm('Are you sure you want to archive this project?')) {
      try {
        await archiveProject(projectId);
      } catch (error) {
        console.error('Failed to archive project:', error);
      }
    }
  };

  const handleSelectProject = (project) => {
    // Navigate to project detail page
    router.push(`/projects/${project.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-600">Manage your projects and tasks</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <ProjectList
        projects={projects}
        onEditProject={setEditingProject}
        onArchiveProject={handleArchiveProject}
        onSelectProject={handleSelectProject}
      />

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        {editingProject && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
          />
        )}
      </Modal>
    </div>
  );
}