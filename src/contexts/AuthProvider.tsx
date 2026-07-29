import { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import type { User, AuthCredentials } from "../types";
import * as authService from "../services/authService";

/**
 * Props for the AuthProvider component.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider: Wraps the app and provides auth state to all children.
 */

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // React hook for managing local state. useState<User | null>(null) means the state can be a User object or null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * on mount: Check if there's a stored token.
   * if yes, the user is considered logged in (token validation happens on API calls).
   */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        setUser(user);
      } catch {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login: Authentication and store token.
   */
  const login = async (credentials: AuthCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      localStorage.setItem("access_token", response.access_token);
      const user = await authService.getCurrentUser();
      setUser(user)
    } catch (err) {
      setError("Invalid email or password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register: Create account and auto-login.
   */
  const register = async (credentials: AuthCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(credentials);
      // Auto-login after successful regristration
      await login(credentials);
    } catch (err) {
      setError("Registration failed. Email may already exist.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout: Clear auth state and token.
   */
  const logout = (): void => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  /**
   * Clear any displayed error message.
   */
  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
