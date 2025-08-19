-- Fix RLS policy for organizations table to allow authenticated users to create organizations
DROP POLICY IF EXISTS "Users can insert organizations" ON public.organizations;

CREATE POLICY "Users can insert organizations" 
ON public.organizations 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create RPC function for organization creation with proper membership
CREATE OR REPLACE FUNCTION public.create_org_with_owner(p_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id uuid;
  current_user_id uuid;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;
  
  -- Create organization
  INSERT INTO organizations (name)
  VALUES (p_name)
  RETURNING id INTO new_org_id;
  
  -- Create membership for the user as owner
  INSERT INTO memberships (org_id, user_id, role)
  VALUES (new_org_id, current_user_id, 'owner');
  
  RETURN new_org_id;
END;
$$;