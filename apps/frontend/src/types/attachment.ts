export interface Attachment {
    id: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string; // The URL to view/download the file
    createdAt: string;
    // Optional: Add upload progress for local state tracking
    uploadStatus?: 'uploading' | 'completed' | 'error';
    progress?: number;
}
