// src/pages/DashboardPage.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotes } from "../hooks/useNotes";
import { NoteForm } from "../components/notes/NoteForm";
import { NoteSearch } from "../components/notes/NoteSearch";
import { NoteList } from "../components/notes/NoteList";
import { Button } from "../components/ui/Button";

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    notes,
    pagination,
    isLoading,
    error,
    searchQuery,
    createNote,
    updateNote,
    deleteNote,
    handleSearch,
    fetchNotes,
  } = useNotes();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Notes</h1>
            {user && (
              <p className="text-sm text-gray-600">{user.email}</p>
            )}
          </div>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Create Note Form */}
        <NoteForm onSubmit={createNote} isLoading={isLoading} />

        {/* Search */}
        <NoteSearch value={searchQuery} onChange={handleSearch} />

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
            <button
              onClick={() => fetchNotes(pagination.page, searchQuery)}
              className="ml-2 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Notes List */}
        <NoteList
          notes={notes}
          pagination={pagination}
          onPageChange={(page) => fetchNotes(page, searchQuery)}
          onUpdate={updateNote}
          onDelete={deleteNote}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};