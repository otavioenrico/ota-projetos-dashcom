import { supabase } from './supabaseClient';
import { startOfMonth, endOfMonth, subMonths, subDays, format } from 'date-fns';

// KPI calculation functions for DashComm

export const getMonthlyRevenue = async (orgId: string, month?: Date): Promise<number> => {
  const targetMonth = month || new Date();
  const startDate = startOfMonth(targetMonth);
  const endDate = endOfMonth(targetMonth);

  const { data } = await supabase
    .from('transactions')
    .select('amount_net')
    .eq('org_id', orgId)
    .eq('kind', 'inflow')
    .in('status', ['paid', 'received'])
    .gte('date', format(startDate, 'yyyy-MM-dd'))
    .lte('date', format(endDate, 'yyyy-MM-dd'));

  return data?.reduce((sum, t) => sum + Number(t.amount_net), 0) || 0;
};

export const getMonthlyExpenses = async (orgId: string, month?: Date): Promise<number> => {
  const targetMonth = month || new Date();
  const startDate = startOfMonth(targetMonth);
  const endDate = endOfMonth(targetMonth);

  const { data } = await supabase
    .from('transactions')
    .select('amount_net')
    .eq('org_id', orgId)
    .eq('kind', 'outflow')
    .in('status', ['paid'])
    .gte('date', format(startDate, 'yyyy-MM-dd'))
    .lte('date', format(endDate, 'yyyy-MM-dd'));

  return data?.reduce((sum, t) => sum + Number(t.amount_net), 0) || 0;
};

export const getDeltaVsPrevMonth = async (
  metric: 'revenue' | 'expenses',
  orgId: string
): Promise<number> => {
  const currentMonth = new Date();
  const previousMonth = subMonths(currentMonth, 1);

  const getCurrentValue = metric === 'revenue' ? getMonthlyRevenue : getMonthlyExpenses;
  
  const [current, previous] = await Promise.all([
    getCurrentValue(orgId, currentMonth),
    getCurrentValue(orgId, previousMonth)
  ]);

  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const getAccountsReceivable = async (orgId: string): Promise<number> => {
  const { data } = await supabase
    .from('bills')
    .select('total_amount')
    .eq('org_id', orgId)
    .eq('board', 'receivables')
    .eq('status', 'pending');

  return data?.reduce((sum, b) => sum + Number(b.total_amount), 0) || 0;
};

export const getAccountsPayable = async (orgId: string): Promise<number> => {
  const { data } = await supabase
    .from('bills')
    .select('total_amount')
    .eq('org_id', orgId)
    .eq('board', 'payables')
    .eq('status', 'pending');

  return data?.reduce((sum, b) => sum + Number(b.total_amount), 0) || 0;
};

export const getUpcomingBills = async (orgId: string, days: number = 7) => {
  const endDate = subDays(new Date(), -days);

  const { data } = await supabase
    .from('bills')
    .select(`
      *,
      contact:contacts(name),
      category:categories(name)
    `)
    .eq('org_id', orgId)
    .eq('status', 'pending')
    .lte('due_date', format(endDate, 'yyyy-MM-dd'))
    .order('due_date', { ascending: true });

  return data || [];
};

export const getRecentActivities = async (orgId: string, limit: number = 10) => {
  const { data } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data || [];
};

export const getNewCustomersThisMonth = async (orgId: string): Promise<number> => {
  const startDate = startOfMonth(new Date());

  const { data } = await supabase
    .from('contacts')
    .select('id')
    .eq('org_id', orgId)
    .eq('type', 'customer')
    .gte('created_at', startDate.toISOString());

  return data?.length || 0;
};

export const getTransactionsForChart = async (
  orgId: string, 
  days: number = 7
) => {
  const startDate = subDays(new Date(), days - 1);

  const { data } = await supabase
    .from('transactions')
    .select('date, kind, amount_net')
    .eq('org_id', orgId)
    .in('status', ['paid', 'received'])
    .gte('date', format(startDate, 'yyyy-MM-dd'))
    .order('date', { ascending: true });

  // Group by date and kind
  const groupedData: Record<string, { inflow: number; outflow: number }> = {};
  
  data?.forEach(transaction => {
    const date = transaction.date;
    if (!groupedData[date]) {
      groupedData[date] = { inflow: 0, outflow: 0 };
    }
    groupedData[date][transaction.kind as 'inflow' | 'outflow'] += Number(transaction.amount_net);
  });

  return Object.entries(groupedData).map(([date, values]) => ({
    date,
    entradas: values.inflow,
    saidas: values.outflow
  }));
};