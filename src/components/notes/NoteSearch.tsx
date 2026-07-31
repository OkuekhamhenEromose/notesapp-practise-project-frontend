// src/components/note/NoteSearch.tsx

import React from "react";
import {Input} from "../ui/Input";

interface NoteSearchProps {
    value: string;
    onChange: (value: string) => void; 
}

export const NoteSearch: React.FC<NoteSearchProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search notes by title or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}