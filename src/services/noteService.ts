// noteService.ts => NOTES API CALLS
import { api } from "./api";
import type { Note, NoteCreate, NoteUpdate, PaginatedNotes } from "../types";

/**
 * Fetch paginated notes with optional search
 */
export const fetchNotes = async (
    page: number = 1,
    limit: number = 20,
    search?: string
): Promise<PaginatedNotes> => {
    const params: Record<string, string | number> = { page, limit }; // params object: Axios converts this to query string automatically: ?page=1&limit=20&search=hello
    if (search) {
        params.search = search;
    }
    const response = await api.get<PaginatedNotes>("/notes/", { params });
    return response.data
}

/**
 * Create a note
 */
export const createNote = async (
    note: NoteCreate
): Promise<Note> => {
    const response = await api.post<Note>("/notes/", note);
    return response.data
}

/**
 * Update as existing note.
 */
export const updateNote = async (id: number, note: NoteUpdate): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, note);
    return response.data;
}

/**
 * Delete a note
 */
export const deleteNote = async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
}