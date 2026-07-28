// src/services/authService.ts
import { api } from "./api";
import type { AuthCredentials, LoginResponse, User } from "../types";

/**
 * Register a new user.
 * Returns the created user object.
 */
export const register = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>("/auth/register", credentials);
  return response.data;
};

/**
 * Login with email and password.
 * Returns the JWT token response.
 */
export const login = async (credentials: AuthCredentials): Promise<LoginResponse> => {
  // OAuth2 login expects form data, not JSON
  const formData = new URLSearchParams();
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);
  
  const response = await api.post<LoginResponse>(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

/**
 * Logout: Clear stored token.
 * (No API call needed for JWT logout - just delete the token)
 */
export const logout = (): void => {
  localStorage.removeItem("access_token");
};