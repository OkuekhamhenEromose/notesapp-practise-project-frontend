// src/pages/LoginPage.tsx
import React from "react";
import {Link} from "react-router-dom";
import {LoginForm} from "../components/auth/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your notes</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <LoginForm />
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};