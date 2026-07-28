// src/services/authService.ts => AUTH API CALLS
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
  const formData = new URLSearchParams(); // URLSearchParams: Creates application/x-www-form-urlencoded data. Our FastAPI backend expects this format for OAuth2 login (standard OAuth2 requirement).
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);
  
  const response = await api.post<LoginResponse>( // api.post<User>("/auth/register", ...) tells TypeScript that the response data will match the User interface
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
export const logout = (): void => { // No logout API call: JWT is stateless. The server doesn't track active tokens. "Logging out" just means deleting the token from the client
  localStorage.removeItem("access_token");
};