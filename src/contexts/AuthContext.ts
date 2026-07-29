import { createContext } from "react";
import type { User, AuthCredentials } from "../types";

/**
 * Shape of the authentication context.
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

/**
 * Create the context with undefined initial value.
 * The exclamation mark tells TypeScript we'll provide a value later.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
); // createContext: Creates a global state container that any component can access without prop drilling