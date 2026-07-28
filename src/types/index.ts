// index.ts => TYPESCRIPT INTERFACES


// Interfaces vs Types: In TypeScript, interface is preferred for object shapes because it supports declaration merging and provides better error messages
/**
 * User entity as returned by the API
 */
export interface User {
    id: number;
    email: string;
    created_at: string;  // ISO 8601 date string from API, ISO 8601 dates: The API returns dates as strings like "2026-07-23T18:20:00.000Z". We keep them as strings and format them in components.
}

/**
 * Note entity as returned by the API
 */
export interface Note {
    id: number;
    title: string;
    user_id: number;
    content: string;
    created_at: string;
    updated_at: string | null;
}

/**
 * Data required to create a new note
 */
export interface NoteCreate {
    title: string;
    content: string;
}

/**
 * Data for updating a note (all fields optional for partial updates)
 */
export interface NoteUpdate {
    title?: string; // Optional fields: title?: string means the field can be present or undefined. Used for partial updates
    content?: string;
}

/**
 * Paginated response from the API
 */
export interface PaginatedNotes {
    items: Note[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}

/**
 * login/register form data
 */
export interface AuthCredentials {
    email: string;
    password: string;
}

/**
 * API response after successful login
 */
export interface LoginResponse {
    access_token: string;
    token_type: string;
}

/**
 * API error response structure
 */
export interface ApiError {
    detail: string;
}