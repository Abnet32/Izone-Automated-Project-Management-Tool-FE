import { useState, useEffect } from 'react';

export interface Project {
    id: string;
    title: string;
    description?: string;
    background?: string;
    status: string;
    createdAt: string;
    isArchived: boolean;
    lists?: any[];
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('projects');
            if (saved) {
                setProjects(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to parse projects', e);
            setError(e instanceof Error ? e : new Error('Unknown error'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveProjects = (newProjects: Project[]) => {
        setProjects(newProjects);
        localStorage.setItem('projects', JSON.stringify(newProjects));
    };

    const createProject = (projectData: Partial<Project>) => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: projectData.title || 'Untitled',
            description: projectData.description,
            background: projectData.background,
            status: 'active',
            createdAt: new Date().toISOString(),
            isArchived: false,
            ...projectData
        };
        saveProjects([...projects, newProject]);
        return newProject;
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        const updated = projects.map(proj =>
            proj.id === id ? { ...proj, ...updates } : proj
        );
        saveProjects(updated);
    };

    const archiveProject = (id: string) => {
        updateProject(id, { isArchived: true });
    };

    const restoreProject = (id: string) => {
        updateProject(id, { isArchived: false });
    };

    return {
        projects,
        isLoading,
        error,
        createProject,
        updateProject,
        archiveProject,
        restoreProject
    };
};







