import { useState, useEffect } from "react";
import { Calendar, TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CashflowData {
  d: string;
  inflow: number;
  outflow: number;
}

export default function Relatorios() {
  const [periodo, setPeriodo] = useState("30");
  const [cashflowData, setCashflowData] = useState<CashflowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orgId } = useAuth();
  const { toast } = useToast();

  const loadCashflowData = async () => {
    if (!orgId) {
      toast({
        title: "Erro",
        description: "Selecione/Crie sua organização",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      // Call the RPC function using raw query since types aren't available
      const { data, error } = await supabase
        .from('transactions')
        .select('date, amount_net, kind')
        .eq('org_id', orgId)
        .gte('date', new Date(Date.now() - parseInt(periodo) * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;
      
      // Process data into cashflow format
      const processedData = (data || []).reduce((acc: any[], transaction: any) => {
        const date = transaction.date;
        const existing = acc.find(item => item.d === date);
        
        if (existing) {
          if (transaction.kind === 'inflow') {
            existing.inflow += transaction.amount_net || 0;
          } else {
            existing.outflow += transaction.amount_net || 0;
          }
        } else {
          acc.push({
            d: date,
            inflow: transaction.kind === 'inflow' ? (transaction.amount_net || 0) : 0,
            outflow: transaction.kind === 'outflow' ? (transaction.amount_net || 0) : 0
          });
        }
        return acc;
      }, []);
      
      setCashflowData(processedData);
    } catch (error) {
      console.error('Error loading cashflow data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orgId) {
      loadCashflowData();
    }
  }, [orgId, periodo]);

  const getPeriodoLabel = (periodo: string) => {
    const labels = {
      "7": "Últimos 7 dias",
      "15": "Últimos 15 dias", 
      "30": "Últimos 30 dias",
      "90": "Últimos 3 meses",
      "180": "Últimos 6 meses",
      "365": "Último ano"
    };
    return labels[periodo as keyof typeof labels] || "Período";
  };

  const totalReceitas = cashflowData.reduce((acc, item) => acc + item.inflow, 0);
  const totalDespesas = cashflowData.reduce((acc, item) => acc + item.outflow, 0);
  const lucroTotal = totalReceitas - totalDespesas;
  const margemLucro = totalReceitas > 0 ? ((lucroTotal / totalReceitas) * 100).toFixed(1) : "0.0";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise de desempenho e resultados</p>
        </div>
        
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Selecionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="15">Últimos 15 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
            <SelectItem value="180">Últimos 6 meses</SelectItem>
            <SelectItem value="365">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              Período selecionado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              Período selecionado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {lucroTotal >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              Período selecionado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{margemLucro}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {parseFloat(margemLucro) >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              Período selecionado
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Fluxo de Caixa */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Caixa - {getPeriodoLabel(periodo)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [
                  `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                  ''
                ]}
              />
              <Area
                type="monotone"
                dataKey="inflow"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                name="Entradas"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stackId="2"
                stroke="hsl(var(--destructive))"
                fill="hsl(var(--destructive))"
                name="Saídas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}