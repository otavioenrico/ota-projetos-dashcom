import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  Users,
  CreditCard
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Início</h1>
        <p className="text-muted-foreground">
          Visão geral do seu e-commerce em tempo real
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Faturamento do Mês"
          value="R$ 45.231,00"
          change={{ value: "12%", trend: "up" }}
          icon={DollarSign}
        />
        <MetricCard
          title="Contas a Receber"
          value="R$ 18.942,00"
          change={{ value: "8%", trend: "up" }}
          icon={TrendingUp}
        />
        <MetricCard
          title="Contas Vencendo"
          value="R$ 3.240,00"
          icon={AlertCircle}
        />
        <MetricCard
          title="Novos Clientes"
          value="23"
          change={{ value: "15%", trend: "up" }}
          icon={Users}
        />
      </div>

      {/* Gráficos e tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa - Últimos 7 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico do fluxo de caixa será implementado aqui
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Vencimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Fornecedor ABC</p>
                  <p className="text-sm text-muted-foreground">Vence em 2 dias</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-destructive">R$ 1.200,00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Aluguel da Loja</p>
                  <p className="text-sm text-muted-foreground">Vence em 5 dias</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-destructive">R$ 2.500,00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Pagamento recebido de Cliente XYZ</p>
                <p className="text-xs text-muted-foreground">Há 2 horas</p>
              </div>
              <div className="text-success font-medium">+R$ 850,00</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Pagamento efetuado para Fornecedor DEF</p>
                <p className="text-xs text-muted-foreground">Há 4 horas</p>
              </div>
              <div className="text-destructive font-medium">-R$ 1.200,00</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Nova conta cadastrada</p>
                <p className="text-xs text-muted-foreground">Há 6 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;