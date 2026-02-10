import api from '@/lib/axios';
import { Attachment } from '@/types/attachment';

// MOCK: Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const attachmentService = {
    // 1. Upload File
    async upload(file: File, onProgress?: (progress: number) => void): Promise<Attachment> {
        // --- REAL IMPLEMENTATION (Commented Out) ---
        // const formData = new FormData();
        // formData.append('file', file);
        // const { data } = await api.post('/attachments/upload', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     onUploadProgress: (progressEvent) => {
        //         const progress = progressEvent.total 
        //             ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //             : 0;
        //         onProgress?.(progress);
        //     }
        // });
        // return data;

        // --- MOCK IMPLEMENTATION ---
        await delay(1000); // Simulate start
        onProgress?.(30);
        await delay(500);
        onProgress?.(70);
        await delay(500);
        onProgress?.(100);

        return {
            id: crypto.randomUUID(),
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            url: URL.createObjectURL(file), // Create a temporary local URL for preview
            createdAt: new Date().toISOString(),
            uploadStatus: 'completed'
        };
    },

    // 2. Delete File
    async delete(id: string): Promise<void> {
        // await api.delete(`/attachments/${id}`);
        await delay(500); // Mock delay
        console.log(`Deleted attachment ${id}`);
    }
};
