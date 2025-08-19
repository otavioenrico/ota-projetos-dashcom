
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getActiveOrgId, hasOrganization, createUserOrganization } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  orgId: string | null;
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
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer org setup with setTimeout to prevent deadlocks
          setTimeout(async () => {
            try {
              const hasOrg = await hasOrganization(session.user.id);
              if (!hasOrg) {
                // Create organization for new user - but handle errors gracefully
                try {
                  const newOrgId = await createUserOrganization(
                    session.user.id, 
                    `Empresa de ${session.user.email}`
                  );
                  setOrgId(newOrgId);
                  console.log('Organization created:', newOrgId);
                } catch (orgError) {
                  console.error('Error creating organization:', orgError);
                  // Set a default org ID to prevent infinite loading
                  setOrgId('default-org');
                }
              } else {
                try {
                  const currentOrgId = await getActiveOrgId();
                  setOrgId(currentOrgId);
                  console.log('Organization found:', currentOrgId);
                } catch (orgError) {
                  console.error('Error getting organization:', orgError);
                  setOrgId('default-org');
                }
              }
              setIsLoading(false);
            } catch (error) {
              console.error('Error setting up organization:', error);
              // Set a default org ID to prevent infinite loading
              setOrgId('default-org');
              setIsLoading(false);
            }
          }, 0);
        } else {
          setOrgId(null);
          setIsLoading(false);
        }
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
