// src/components/auth/RegisterForm.tsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const RegisterForm: React.FC = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // e.preventDefault(): Prevents the browser's default form submission (page reload).
    clearError();
    setFormError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setFormError("All fields are required");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }
    if (password != confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    try {
      await register({ email, password });
      // Navigation happens automatically via route guard in App.tsx
    } catch {
      // Error is handled by auth context, displayed below
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>

      {(error || formError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error || formError}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Sign Up
      </Button>
    </form>
  );
};
