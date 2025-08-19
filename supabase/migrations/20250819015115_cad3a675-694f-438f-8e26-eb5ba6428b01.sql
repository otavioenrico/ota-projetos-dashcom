-- Fix critical security vulnerability in profiles table
-- Create security definer function to check if users are in the same organization

CREATE OR REPLACE FUNCTION public.users_in_same_org(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM memberships m1 
    JOIN memberships m2 ON m1.org_id = m2.org_id
    WHERE m1.user_id = auth.uid() 
    AND m2.user_id = target_user_id
  );
$$;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policy that only allows viewing profiles within the same organization
CREATE POLICY "Users can view profiles in their organization" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR public.users_in_same_org(user_id)
  );

-- Ensure users can still view their own profile even if not in an org yet
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());