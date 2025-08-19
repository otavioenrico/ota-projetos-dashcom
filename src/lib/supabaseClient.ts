import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

// Helper functions for session and user management
export const getSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper functions for organization management
export const getActiveOrgId = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data: memberships } = await supabase
    .from('memberships')
    .select('org_id')
    .eq('user_id', user.id)
    .limit(1);

  return memberships?.[0]?.org_id || null;
};

// Helper function to add org filter to queries
export const withOrgFilter = <T>(query: T, orgId: string): T => {
  if (!orgId) {
    throw new Error('Organização não encontrada. Selecione/Crie sua organização.');
  }
  return (query as any).eq('org_id', orgId);
};

// Create organization and membership for new user
export const createUserOrganization = async (userId: string, orgName: string) => {
  // Create organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert([{ name: orgName }])
    .select()
    .single();

  if (orgError) throw orgError;

  // Create membership
  const { error: membershipError } = await supabase
    .from('memberships')
    .insert([{ 
      org_id: org.id, 
      user_id: userId, 
      role: 'owner' 
    }]);

  if (membershipError) throw membershipError;

  return org.id;
};

// Check if user has organization
export const hasOrganization = async (userId: string): Promise<boolean> => {
  const { data: memberships } = await supabase
    .from('memberships')
    .select('org_id')
    .eq('user_id', userId)
    .limit(1);

  return (memberships?.length || 0) > 0;
};

export { supabase };