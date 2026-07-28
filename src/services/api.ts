// api.ts => AXIOS INSTANCE WITH INTERCEPTORS

import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig} from "axios";

//  Base API URL - matches our FastAPI backend
const API_BASE_URL = "http://localhost:8000";

/**
 * Axios instance with default configuration.
 * All API requests go through this instance
 */
export const api = axios.create({ // Creates a pre-configured Axios instance. All requests use this base URL automatically
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Request interceptor: Automatically attach JWT token to every request.
 * Runs BEFORE each request is sent.
 */
api.interceptors.request.use( // Request Interceptor: Runs before EVERY request. Automatically attaches the JWT token from localStorage. This means you never manually set headers in individual API calls
    (config: InternalAxiosRequestConfig) => { // InternalAxiosRequestConfig: TypeScript type for Axios request config (includes headers).
        // Get token from localStorage
        const token = localStorage.getItem("access_token");

        // if token exists, add Authentication header
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) =>{
        // Request setup failed (rare)
        return Promise.reject(error)
    }
);

/**
 * Response interceptor: Handle common errors globally.
 * Runs AFTER each response is received
 */
api.interceptors.response.use( // Response Interceptor: Runs after EVERY response. Handles 401 (unauthorized) globally by clearing the token and redirecting to login
    (response) =>{
        // Successful response - pass it through
        return response;
    },
    (error: AxiosError) =>{
        // Handle specific error status codes
        if (error.response?.status === 401){
            // Token expired or invalid - clear auth and reload
            localStorage.removeItem("access_token");
            window.location.href = "/login"
        }
        // Reject so individual callers can handle it too
        return Promise.reject(error)
    }
)