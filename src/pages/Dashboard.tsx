import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Calendar,
  Users,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { orgId } = useAuth();
  const { toast } = useToast();
  const [kpis, setKpis] = useState({
    month: null as Date | null,
    revenue: 0,
    expenses: 0,
    net: 0,
    prev_revenue: 0,
    prev_expenses: 0,
    prev_net: 0
  });
  const [cashflowData, setCashflowData] = useState<any[]>([]);
  const [upcomingBills, setUpcomingBills] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartDays, setChartDays] = useState(7);

  useEffect(() => {
    if (!orgId) return;

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Use RPC functions for efficient data loading
        const [kpisResult, cashflowResult, billsResult, activitiesResult] = await Promise.all([
          supabase.rpc('kpis_monthly' as any, { p_org: orgId }),
          supabase.rpc('cashflow_timeseries' as any, { p_org: orgId, p_days: chartDays }),
          supabase.rpc('upcoming_bills' as any, { p_org: orgId, p_days: 7 }),
          supabase
            .from('activity_logs')
            .select('*')
            .eq('org_id', orgId)
            .order('created_at', { ascending: false })
            .limit(10)
        ]);

        if (kpisResult.data && Array.isArray(kpisResult.data) && kpisResult.data.length > 0) {
          setKpis(kpisResult.data[0]);
        }

        if (cashflowResult.data && Array.isArray(cashflowResult.data)) {
          setCashflowData(cashflowResult.data);
        }

        if (billsResult.data && Array.isArray(billsResult.data)) {
          setUpcomingBills(billsResult.data);
        }

        if (activitiesResult.data) {
          setRecentActivities(activitiesResult.data);
        }

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do dashboard.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [orgId, chartDays, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Carregando Dashboard</h2>
          <p className="text-muted-foreground">
            Aguarde enquanto carregamos os dados...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-spacing">
      <div className="dashboard-card p-6">
        <h1 className="text-3xl font-semibold">Início</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do seu e-commerce em tempo real
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {kpis.revenue.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </div>
            <p className={`text-xs ${
              ((kpis.revenue - kpis.prev_revenue) / (kpis.prev_revenue || 1)) >= 0 
                ? 'text-success' : 'text-destructive'
            }`}>
              {kpis.prev_revenue > 0 
                ? `${((kpis.revenue - kpis.prev_revenue) / kpis.prev_revenue * 100).toFixed(1)}%`
                : '+100%'
              } em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {kpis.expenses.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </div>
            <p className={`text-xs ${
              ((kpis.expenses - kpis.prev_expenses) / (kpis.prev_expenses || 1)) <= 0 
                ? 'text-success' : 'text-destructive'
            }`}>
              {kpis.prev_expenses > 0 
                ? `${((kpis.expenses - kpis.prev_expenses) / kpis.prev_expenses * 100).toFixed(1)}%`
                : '+100%'
              } em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resultado Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              kpis.net >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {kpis.net.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </div>
            <p className={`text-xs ${
              ((kpis.net - kpis.prev_net) / (Math.abs(kpis.prev_net) || 1)) >= 0 
                ? 'text-success' : 'text-destructive'
            }`}>
              {kpis.prev_net !== 0 
                ? `${((kpis.net - kpis.prev_net) / Math.abs(kpis.prev_net) * 100).toFixed(1)}%`
                : kpis.net >= 0 ? '+100%' : '-100%'
              } em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Fluxo de Caixa
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={chartDays === 7 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChartDays(7)}
                >
                  7 dias
                </Button>
                <Button 
                  variant={chartDays === 30 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChartDays(30)}
                >
                  30 dias
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {cashflowData.length > 0 ? (
                <div className="space-y-2">
                  {cashflowData.slice(-7).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{format(new Date(item.d), 'dd/MM', { locale: ptBR })}</span>
                      <div className="flex gap-4">
                        <span className="text-success text-sm">
                          +{Number(item.inflow).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <span className="text-destructive text-sm">
                          -{Number(item.outflow).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Nenhuma movimentação no período
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Vencimentos em 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBills.length > 0 ? (
                upcomingBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{bill.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Vence em {format(new Date(bill.due_date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <Badge variant={bill.status === 'overdue' ? 'destructive' : 'outline'}>
                      {Number(bill.total_amount).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum vencimento nos próximos 7 dias
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.kind === 'inflow' ? 'bg-success' : 'bg-destructive'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(activity.created_at), 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  {activity.amount && (
                    <Badge variant="outline">
                      {Number(activity.amount).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma atividade recente
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}