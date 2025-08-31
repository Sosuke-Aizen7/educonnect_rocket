import React from 'react';
        import { Navigate, useLocation } from 'react-router-dom';
        import { useAuth } from '../contexts/AuthContext';

        const ProtectedRoute = ({ children }) => {
          const { user, loading } = useAuth()
          const location = useLocation()

          // Show loading spinner while authentication state is being determined
          if (loading) {
            return (
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )
          }

          // Redirect to login if not authenticated
          if (!user) {
            return <Navigate to="/login" state={{ from: location }} replace />
          }

          return children
        }

        export default ProtectedRoute