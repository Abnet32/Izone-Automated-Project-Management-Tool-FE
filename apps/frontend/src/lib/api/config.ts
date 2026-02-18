// Centralized API Configuration
// This ensures all API calls use the same base URL, avoiding mixed localhost/127.0.0.1 issues

// Use 127.0.0.1 to match the backend binding and avoid IPv6 resolution issues with localhost
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Shared helper to get token
export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
}

// Shared helper for headers
export function getHeaders(isMultipart = false): HeadersInit {
    const token = getToken();
    const headers: HeadersInit = isMultipart ? {} : { "Content-Type": "application/json" };

    if (token) {
        (headers as any)["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}
