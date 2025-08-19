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

-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create secure policy that restricts profile viewing to same organization
CREATE POLICY "profiles_select_same_org" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR public.users_in_same_org(user_id)
  );

-- Recreate update policy
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Recreate insert policy  
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());