import { useState, useEffect, useCallback } from "react";
import type {
  Note,
  NoteCreate,
  NoteUpdate,
  PaginatedNotes,
} from "../types";
import * as noteService from "../services/noteService";

/**
 * Custom hook for managing notes.
 *
 * Responsibilities:
 * - Fetch notes
 * - Search notes
 * - Pagination
 * - Create, update and delete notes
 * - Loading and error state
 */
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [pagination, setPagination] = useState<
    Omit<PaginatedNotes, "items">
  >({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /**
   * Pure API function.
   *
   * Does NOT update React state.
   * It simply returns data from the backend.
   */
  /**
//      * Wrapped is useCallback to prevent infinite re-renders.
//      */
  const loadNotes = useCallback(
    async (
      page: number = 1,
      search?: string,
    ): Promise<PaginatedNotes> => {
      return await noteService.fetchNotes(
        page,
        pagination.limit,
        search,
      );
    },
    [pagination.limit],
  );

  /**
   * Fetch notes and update React state.
   */
  const fetchNotes = useCallback(
    async (
      page: number = 1,
      search?: string,
    ): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await loadNotes(page, search);

        setNotes(data.items);

        setPagination({
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
        });
      } catch (err) {
        console.error("Fetch notes error:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [loadNotes],
  );

  /**
   * Create a note.
   */
  const createNote = async (
    note: NoteCreate,
  ): Promise<void> => {
    try {
      await noteService.createNote(note);

      // Refresh first page
      await fetchNotes(1, searchQuery);
    } catch (err) {
      setError("Failed to create note.");
      throw err;
    }
  };

  /**
   * Update a note.
   */
  const updateNote = async (
    id: number,
    note: NoteUpdate,
  ): Promise<void> => {
    try {
      await noteService.updateNote(id, note);

      // Refresh current page
      await fetchNotes(pagination.page, searchQuery);
    } catch (err) {
      setError("Failed to update note.");
      throw err;
    }
  };

  /**
   * Delete a note.
   */
  const deleteNote = async (
    id: number,
  ): Promise<void> => {
    try {
      await noteService.deleteNote(id);

      const targetPage =
        notes.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;

      await fetchNotes(targetPage, searchQuery);
    } catch (err) {
      setError("Failed to delete note.");
      throw err;
    }
  };

  /**
   * Update search query.
   */
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  /**
   * Initial page load.
   */
  useEffect(() => {
    let cancelled = false;

    const initialise = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await loadNotes(1);

        if (cancelled) return;

        setNotes(data.items);

        setPagination({
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
        });
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to load notes.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void initialise();

    return () => {
      cancelled = true;
    };
  }, [loadNotes]);

  /**
   * Search with 300ms debounce.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchNotes(1, searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, fetchNotes]);

  return {
    notes,
    pagination,
    searchQuery,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    handleSearch,
  };
};