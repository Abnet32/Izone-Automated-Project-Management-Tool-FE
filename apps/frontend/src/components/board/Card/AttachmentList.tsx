'use client';

import { Attachment } from '@/types/attachment';
import { File, Image, FileText, X, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AttachmentListProps {
    attachments: Attachment[];
    onDelete: (id: string) => Promise<void>;
    isDeleting?: boolean;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({
    attachments,
    onDelete,
    isDeleting = false,
}) => {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />;
        if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
        return <File className="w-5 h-5 text-gray-500" />;
    };

    const handleDelete = async (id: string, fileName: string) => {
        try {
            await onDelete(id);
            toast.success(`Deleted ${fileName}`);
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete file');
        }
    };

    if (attachments.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500 text-sm">
                No attachments yet
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {attachments.map((attachment) => (
                <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors group"
                >
                    {/* File Icon or Image Preview */}
                    {attachment.mimeType.startsWith('image/') ? (
                        <img
                            src={attachment.url}
                            alt={attachment.originalName}
                            className="w-12 h-12 object-cover rounded"
                        />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                            {getFileIcon(attachment.mimeType)}
                        </div>
                    )}

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {attachment.originalName}
                        </p>
                        <p className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                            href={attachment.url}
                            download={attachment.originalName}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Download"
                        >
                            <Download className="w-4 h-4 text-gray-600" />
                        </a>
                        <button
                            onClick={() => handleDelete(attachment.id, attachment.originalName)}
                            disabled={isDeleting}
                            className="p-1 hover:bg-red-100 rounded disabled:opacity-50"
                            title="Delete"
                        >
                            <X className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
