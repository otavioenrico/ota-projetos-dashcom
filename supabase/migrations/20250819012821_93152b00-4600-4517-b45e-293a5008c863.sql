-- DashComm Database Schema
-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create memberships table (user-organization relationship)
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(org_id, user_id)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create accounts table (bank accounts, wallets, etc.)
CREATE TABLE public.accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank', 'wallet', 'gateway')),
  current_balance DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table (customers and vendors)
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('customer', 'vendor')),
  name TEXT NOT NULL,
  cnpj TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  external_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('income', 'expense')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('inflow', 'outflow')),
  description TEXT NOT NULL,
  amount_gross DECIMAL(15,2) NOT NULL,
  fees DECIMAL(15,2) DEFAULT 0,
  amount_net DECIMAL(15,2) GENERATED ALWAYS AS (amount_gross - COALESCE(fees, 0)) STORED,
  status TEXT NOT NULL CHECK (status IN ('planned', 'paid', 'received', 'partial')),
  account_id UUID REFERENCES public.accounts(id),
  contact_id UUID REFERENCES public.contacts(id),
  platform TEXT,
  category_id UUID REFERENCES public.categories(id),
  external_ref TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bills table (accounts payable/receivable)
CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  board TEXT NOT NULL CHECK (board IN ('payables', 'receivables')),
  description TEXT NOT NULL,
  contact_id UUID REFERENCES public.contacts(id),
  total_amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  installments INTEGER DEFAULT 1,
  category_id UUID REFERENCES public.categories(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
  notes TEXT,
  file_url TEXT,
  external_ref TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calendar_events table
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('meeting', 'payment', 'receivable')),
  link_transaction UUID REFERENCES public.transactions(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('in', 'out', 'info')),
  amount DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create integrations table
CREATE TABLE public.integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('connected', 'connected_stub', 'disconnected', 'error')),
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(org_id, provider)
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for organizations
CREATE POLICY "Users can view their organizations" ON public.organizations
  FOR SELECT TO authenticated
  USING (id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update their organizations" ON public.organizations
  FOR UPDATE TO authenticated
  USING (id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- Create RLS policies for memberships
CREATE POLICY "Users can view their memberships" ON public.memberships
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own membership" ON public.memberships
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create RLS policies for org-based tables
CREATE POLICY "Users can view their org accounts" ON public.accounts
  FOR SELECT TO authenticated
  USING (org_id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert accounts in their org" ON public.accounts
  FOR INSERT TO authenticated
  WITH CHECK (org_id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update accounts in their org" ON public.accounts
  FOR UPDATE TO authenticated
  USING (org_id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete accounts in their org" ON public.accounts
  FOR DELETE TO authenticated
  USING (org_id IN (
    SELECT org_id FROM public.memberships WHERE user_id = auth.uid()
  ));

-- Apply same pattern to other org-based tables
CREATE POLICY "Users can view their org contacts" ON public.contacts FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert contacts in their org" ON public.contacts FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update contacts in their org" ON public.contacts FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete contacts in their org" ON public.contacts FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org categories" ON public.categories FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert categories in their org" ON public.categories FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update categories in their org" ON public.categories FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete categories in their org" ON public.categories FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org transactions" ON public.transactions FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert transactions in their org" ON public.transactions FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update transactions in their org" ON public.transactions FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete transactions in their org" ON public.transactions FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org bills" ON public.bills FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert bills in their org" ON public.bills FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update bills in their org" ON public.bills FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete bills in their org" ON public.bills FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org calendar events" ON public.calendar_events FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert calendar events in their org" ON public.calendar_events FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update calendar events in their org" ON public.calendar_events FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete calendar events in their org" ON public.calendar_events FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org activity logs" ON public.activity_logs FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert activity logs in their org" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their org integrations" ON public.integrations FOR SELECT TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert integrations in their org" ON public.integrations FOR INSERT TO authenticated WITH CHECK (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can update integrations in their org" ON public.integrations FOR UPDATE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete integrations in their org" ON public.integrations FOR DELETE TO authenticated USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at columns where needed
ALTER TABLE public.organizations ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.accounts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.contacts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.categories ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.transactions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.bills ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON public.bills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_memberships_user_id ON public.memberships(user_id);
CREATE INDEX idx_memberships_org_id ON public.memberships(org_id);
CREATE INDEX idx_accounts_org_id ON public.accounts(org_id);
CREATE INDEX idx_contacts_org_id ON public.contacts(org_id);
CREATE INDEX idx_categories_org_id ON public.categories(org_id);
CREATE INDEX idx_transactions_org_id ON public.transactions(org_id);
CREATE INDEX idx_transactions_date ON public.transactions(date);
CREATE INDEX idx_bills_org_id ON public.bills(org_id);
CREATE INDEX idx_bills_due_date ON public.bills(due_date);
CREATE INDEX idx_calendar_events_org_id ON public.calendar_events(org_id);
CREATE INDEX idx_calendar_events_datetime ON public.calendar_events(datetime);
CREATE INDEX idx_activity_logs_org_id ON public.activity_logs(org_id);
CREATE INDEX idx_integrations_org_id ON public.integrations(org_id);