// src/components/notes/NoteList.tsx

import React from "react";
import type { Note } from "../../types";
import { NoteCard } from "./NoteCard";
import { Button } from "../ui/Button";

interface NoteListProps {
  notes: Note[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
  onUpdate: (
    id: number,
    note: { title: string; content: string },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading: boolean;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  pagination, // Pagination UI: Only shows if there's more than one page. Disables Previous on page 1, Next on last page
  onPageChange,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No notes found</p>
        <p className="text-sm mt-1">Create your first note above!</p>
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-4 mb-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id} // key={note.id}: React requires unique keys when rendering lists. Using the note ID (stable) instead of array index (changes on reorder)
            note={note}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || isLoading}
            className="text-sm"
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages} ({pagination.total}{" "}
            total)
          </span>

          <Button
            variant="secondary"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages || isLoading}
            className="text-sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
