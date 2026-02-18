import { Attachment } from '@/types/attachment';

import { API_BASE_URL, getHeaders } from '@/lib/api/config';

export const attachmentService = {
    uploadAttachment: async (cardId: string, file: File): Promise<Attachment> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('card_id', cardId);

        const url = `${API_BASE_URL}/attachments/`;
        console.log('[AttachmentService] Uploading to:', url);
        console.log('[AttachmentService] Headers:', getHeaders(true));

        const res = await fetch(url, {
            method: 'POST',
            headers: getHeaders(true),
            body: formData,
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json();
    },

    getTaskAttachments: async (cardId: string): Promise<Attachment[]> => {
        const res = await fetch(`${API_BASE_URL}/attachments/task/${cardId}`, {
            headers: getHeaders(),
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json();
    },

    deleteAttachment: async (attachmentId: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/attachments/${attachmentId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }
    },
};
