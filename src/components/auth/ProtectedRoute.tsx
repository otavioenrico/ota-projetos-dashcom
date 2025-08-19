import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, orgId, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redireciona para login mas salva a localização atual
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!orgId) {
    // User exists but no org yet, redirect to auth complete for setup
    return <Navigate to="/auth/complete" replace />;
  }

  return <>{children}</>;
}