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

  if (!orgId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Configuração Necessária</h2>
          <p className="text-muted-foreground">
            Aguarde enquanto configuramos sua organização...
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
        <MetricCard
          title="Faturamento do Mês"
          value={`R$ ${kpis.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={{ value: `${Math.abs(kpis.revenueDelta).toFixed(1)}%`, trend: kpis.revenueDelta >= 0 ? "up" : "down" }}
          icon={DollarSign}
        />
        <MetricCard
          title="Contas a Receber"
          value={`R$ ${kpis.accountsReceivable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={CreditCard}
        />
        <MetricCard
          title="Contas a Pagar"
          value={`R$ ${kpis.accountsPayable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={{ value: `${Math.abs(kpis.expensesDelta).toFixed(1)}%`, trend: kpis.expensesDelta >= 0 ? "up" : "down" }}
          icon={CreditCard}
        />
        <MetricCard
          title="Novos Clientes"
          value={kpis.newCustomers.toString()}
          icon={Users}
        />
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
              {isLoading ? "Carregando gráfico..." : "Gráfico do fluxo de caixa será implementado aqui"}
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
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-muted-foreground">Carregando...</div>
              ) : upcomingBills.length > 0 ? (
                upcomingBills.map((bill: any) => (
                  <div key={bill.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{bill.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Vence em {format(new Date(bill.due_date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                    <Badge variant={bill.board === 'receivables' ? 'default' : 'secondary'}>
                      R$ {Number(bill.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  Nenhum vencimento nos próximos 7 dias
                </div>
              )}
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
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-muted-foreground">Carregando atividades...</div>
            ) : recentActivities.length > 0 ? (
              recentActivities.map((activity: any) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.kind === 'in' ? 'bg-green-100 text-green-600' :
                    activity.kind === 'out' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.kind === 'in' ? <TrendingUp className="w-4 h-4" /> :
                     activity.kind === 'out' ? <TrendingDown className="w-4 h-4" /> :
                     <Users className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(activity.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                  {activity.amount && (
                    <div className={`text-sm font-medium ${
                      activity.kind === 'in' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.kind === 'in' ? '+' : '-'}R$ {Number(activity.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-center py-4">
                Nenhuma atividade recente
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}