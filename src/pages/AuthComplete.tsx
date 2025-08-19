import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthComplete() {
  const navigate = useNavigate();
  const { user, orgId, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // No user found, redirect to login
        navigate('/login', { replace: true });
      } else if (orgId) {
        // User has org, go to dashboard
        navigate('/dashboard', { replace: true });
      }
      // If user exists but no orgId, the AuthContext will handle org creation
    }
  }, [user, orgId, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <h2 className="text-lg font-semibold">Configurando sua conta...</h2>
        <p className="text-muted-foreground">
          Aguarde enquanto preparamos tudo para você.
        </p>
      </div>
    </div>
  );
}