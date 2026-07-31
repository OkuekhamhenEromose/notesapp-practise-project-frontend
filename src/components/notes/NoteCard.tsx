// src/components/notes/NoteCard.tsx
import React, { useState } from "react";
import type { Note, NoteCreate } from "../../types";
import { NoteForm } from "./NoteForm";
import { Button } from "../ui/Button";
// import { updateNote } from "../../services/noteService";

interface NoteCardProps {
  note: Note;
  onUpdate: (
    id: number,
    note: { title: string; content: string },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdate = async (updateNote: NoteCreate) => {
    await onUpdate(note.id, updateNote);
    setIsEditing(false);
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await onDelete(note.id);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (isEditing) {
    return (
      <NoteForm
        initialNote={note}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        isLoading={isLoading}
      />
    );
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="text-sm px-2 py-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isLoading}
            className="text-sm px-2 py-1"
          >
            Delete
          </Button>
        </div>
      </div>

      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{note.content}</p>

      <div className="text-xs text-gray-500">
        <span>Created: {formatDate(note.created_at)}</span>
        {note.updated_at && (
          <span className="ml-4">Updated: {formatDate(note.updated_at)}</span>
        )}
      </div>
    </div>
  );
};
