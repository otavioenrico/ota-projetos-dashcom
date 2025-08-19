import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Calendar,
  Users
} from "lucide-react";
import { 
  getMonthlyRevenue, 
  getAccountsReceivable, 
  getAccountsPayable,
  getNewCustomersThisMonth,
  getDeltaVsPrevMonth,
  getUpcomingBills,
  getRecentActivities,
  getTransactionsForChart
} from "@/lib/kpis";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { orgId } = useAuth();
  const { toast } = useToast();
  const [kpis, setKpis] = useState({
    monthlyRevenue: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    newCustomers: 0,
    revenueDelta: 0,
    expensesDelta: 0
  });
  const [upcomingBills, setUpcomingBills] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        const [
          monthlyRevenue,
          accountsReceivable, 
          accountsPayable,
          newCustomers,
          revenueDelta,
          expensesDelta,
          bills,
          activities
        ] = await Promise.all([
          getMonthlyRevenue(orgId),
          getAccountsReceivable(orgId),
          getAccountsPayable(orgId),
          getNewCustomersThisMonth(orgId),
          getDeltaVsPrevMonth('revenue', orgId),
          getDeltaVsPrevMonth('expenses', orgId),
          getUpcomingBills(orgId, 7),
          getRecentActivities(orgId, 10)
        ]);

        setKpis({
          monthlyRevenue,
          accountsReceivable,
          accountsPayable,
          newCustomers,
          revenueDelta,
          expensesDelta
        });
        setUpcomingBills(bills);
        setRecentActivities(activities);
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
  }, [orgId, toast]);

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Início</h1>
        <p className="text-muted-foreground">
          Visão geral do seu e-commerce em tempo real
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              0,00% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              0,00% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas a Pagar</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              0,00% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              0,00% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Fluxo de Caixa (últimos 7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico do fluxo de caixa será implementado aqui
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Vencimentos em 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Nenhum vencimento nos próximos 7 dias
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma atividade recente
          </div>
        </CardContent>
      </Card>
    </div>
  );
}