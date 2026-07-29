import { useState, useEffect, useCallback} from "react";
import {Note, NoteCreate, NoteUpdate, PaginatedNotes} from "../types";
import * noteService from "../services/noteService";

/**
 * Custom hook for managing notes data.
 * Handles fetching, creating, updating, deleting, pagination, and search.
 */
export const useNotes = ()=>{
    const [notes, setNotes] = useState<Note[]>([]);
    const [pagination, setPagination] = useState<Omit
}