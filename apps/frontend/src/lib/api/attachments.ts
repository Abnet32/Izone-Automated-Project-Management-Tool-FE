const API_BASE_URL = "/api/backend";

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
}

function headers(isMultipart = false): HeadersInit {
    const token = getToken();
    const headers: HeadersInit = isMultipart ? {} : { "Content-Type": "application/json" };

    if (token) {
        (headers as any)["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

export interface Attachment {
    id: string;
    file_path: string;
    card_id: string;
    uploaded_at: string;
    filename?: string;
}

export const attachmentsAPI = {
    async uploadAttachment(cardId: string, file: File): Promise<Attachment> {
        const formData = new FormData();
        formData.append("file", file);

        const url = `${API_BASE_URL}/attachments/card/${cardId}`;
        console.log(`[AttachmentsAPI] Uploading to: ${url}`);
        const res = await fetch(url, {
            method: "POST",
            headers: headers(true),
            body: formData,
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json();
    },

    async getAttachments(cardId: string): Promise<Attachment[]> {
        const url = `${API_BASE_URL}/attachments/card/${cardId}`;
        console.log(`[AttachmentsAPI] Fetching from: ${url}`);
        const res = await fetch(url, {
            headers: headers(),
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json();
    },

    async deleteAttachment(attachmentId: string): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/attachments/${attachmentId}`, {
            method: "DELETE",
            headers: headers(),
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }
    }
};
