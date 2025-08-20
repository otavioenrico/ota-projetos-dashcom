
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  orgId: string | null;
  setOrgId: (orgId: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle auth state changes
        if (event === 'SIGNED_OUT') {
          setOrgId(null);
          // If user is on a protected route, redirect to homepage
          const currentPath = window.location.pathname;
          if (currentPath.startsWith('/app') || currentPath.startsWith('/dashboard')) {
            window.location.href = '/';
          }
        } else if (event === 'SIGNED_IN') {
          // Redirect to auth complete for organization setup
          const currentPath = window.location.pathname;
          const publicRoutes = ['/', '/login', '/registrar', '/produto', '/planos'];
          if (publicRoutes.includes(currentPath)) {
            window.location.href = '/auth/complete';
          }
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login", 
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }

      toast({
        title: "Cadastro realizado",
        description: "Verifique seu email para confirmar a conta.",
      });

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setOrgId(null);
  };

  const contextValue: AuthContextType = {
    user,
    session,
    orgId,
    setOrgId,
    login,
    signUp,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
