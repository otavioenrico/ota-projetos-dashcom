-- Fix policy conflict by combining into a single, secure policy
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create a single comprehensive policy that handles both cases
CREATE POLICY "Users can view own profile or profiles in same organization" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR public.users_in_same_org(user_id)
  );