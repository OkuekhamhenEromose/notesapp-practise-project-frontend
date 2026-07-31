// src/components/auth/LoginForm.tsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // e.preventDefault(): Prevents the browser's default form submission (page reload).
    clearError();
    setFormError("");

    // Client-side validation
    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required");
      return;
    }
    try {
      await login({ email, password });
      // Navigation happens automatically via route guard in App.tsx
    } catch {
      // Error is handled by auth context, displayed below
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900">Login</h2>

      {(error || formError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error || formError}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Controlled inputs: The input value is controlled by React state (value={email} + onChange). This allows validation and ensures the UI reflects the state
        placeholder="you@example.com"
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Sign In
      </Button>
    </form>
  );
};
