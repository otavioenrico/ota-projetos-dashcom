import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AuthComplete() {
  const navigate = useNavigate();
  const { user, session, orgId, setOrgId, isLoading } = useAuth();
  const { toast } = useToast();
  const [isSettingUpOrg, setIsSettingUpOrg] = useState(false);

  useEffect(() => {
    const setupOrganization = async () => {
      if (isLoading || isSettingUpOrg) return;
      
      if (!user || !session) {
        navigate('/login', { replace: true });
        return;
      }

      if (orgId) {
        navigate('/dashboard', { replace: true });
        return;
      }

      // Setup organization
      setIsSettingUpOrg(true);
      try {
        const { data: activeOrgId, error } = await supabase.rpc('create_org_with_owner', {
          p_name: 'Minha Loja'
        });

        if (error) throw error;

        setOrgId(activeOrgId!);
        
        toast({
          title: "Bem-vindo!",
          description: "Sua organização foi configurada com sucesso.",
        });

        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error setting up organization:', error);
        toast({
          title: "Erro ao configurar organização",
          description: "Tente recarregar a página.",
          variant: "destructive"
        });
      } finally {
        setIsSettingUpOrg(false);
      }
    };

    setupOrganization();
  }, [user, session, orgId, isLoading, isSettingUpOrg, setOrgId, navigate, toast]);

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