// src/components/note/NoteForm.tsx
import React, { useState } from "react";
import type { Note, NoteCreate } from "../../types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface NoteFormProps {
  initialNote?: Note;
  onSubmit: (note: NoteCreate) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  initialNote, // Reusable for create and edit: If initialNote is provided, it's edit mode. Otherwise, create mode
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [title, setTitle] = useState(() => initialNote?.title ?? "");
  const [content, setContent] = useState(() => initialNote?.content ?? "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("You have not filled in all fields");
      return;
    }
    

    try {
      await onSubmit({title, content});
      if (!initialNote) {
        // Clear form after successful creation
        setTitle("");
        setContent("");
      }
    } catch {
      setError("Failed to save note, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {initialNote ? "Edit Note" : "Create New Note"}
      </h3>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          maxLength={200}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Content
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" isLoading={isLoading}>
            {initialNote ? "Update Note" : "Create Note"}
          </Button>

          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );

  
};
