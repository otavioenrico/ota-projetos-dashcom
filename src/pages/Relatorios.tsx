import { useState } from "react";
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

const dadosReceitas = [
  { mes: "Jan", receitas: 45000, despesas: 32000, lucro: 13000 },
  { mes: "Fev", receitas: 52000, despesas: 35000, lucro: 17000 },
  { mes: "Mar", receitas: 48000, despesas: 31000, lucro: 17000 },
  { mes: "Abr", receitas: 61000, despesas: 42000, lucro: 19000 },
  { mes: "Mai", receitas: 55000, despesas: 38000, lucro: 17000 },
  { mes: "Jun", receitas: 67000, despesas: 45000, lucro: 22000 },
];

const dadosComparativos = [
  { categoria: "Vendas Online", atual: 45000, anterior: 38000 },
  { categoria: "Vendas Físicas", atual: 32000, anterior: 35000 },
  { categoria: "Serviços", atual: 18000, anterior: 15000 },
  { categoria: "Produtos", atual: 52000, anterior: 48000 },
];

export default function Relatorios() {
  const [periodo, setPeriodo] = useState("mes");

  const getPeriodoLabel = (periodo: string) => {
    const labels = {
      semana: "Última Semana",
      quinze: "Últimos 15 dias",
      mes: "Último Mês",
      trimestre: "Últimos 3 meses",
      semestre: "Últimos 6 meses",
      ano: "Último Ano"
    };
    return labels[periodo as keyof typeof labels] || "Período";
  };

  const calcularVariacao = (atual: number, anterior: number) => {
    const variacao = ((atual - anterior) / anterior) * 100;
    return {
      valor: Math.abs(variacao).toFixed(1),
      positiva: variacao > 0
    };
  };

  const totalReceitas = dadosReceitas.reduce((acc, item) => acc + item.receitas, 0);
  const totalDespesas = dadosReceitas.reduce((acc, item) => acc + item.despesas, 0);
  const lucroTotal = totalReceitas - totalDespesas;
  const margemLucro = ((lucroTotal / totalReceitas) * 100).toFixed(1);

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
            <SelectItem value="semana">Última Semana</SelectItem>
            <SelectItem value="quinze">Últimos 15 dias</SelectItem>
            <SelectItem value="mes">Último Mês</SelectItem>
            <SelectItem value="trimestre">Últimos 3 meses</SelectItem>
            <SelectItem value="semestre">Últimos 6 meses</SelectItem>
            <SelectItem value="ano">Último Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalReceitas.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalDespesas.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              +8.2% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {lucroTotal.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +18.1% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{margemLucro}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.3% vs período anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receitas vs Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas vs Despesas - {getPeriodoLabel(periodo)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dadosReceitas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [
                  `R$ ${value.toLocaleString()}`,
                  ''
                ]}
              />
              <Area
                type="monotone"
                dataKey="receitas"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                name="Receitas"
              />
              <Area
                type="monotone"
                dataKey="despesas"
                stackId="2"
                stroke="hsl(var(--destructive))"
                fill="hsl(var(--destructive))"
                name="Despesas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Lucro */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosReceitas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString()}`,
                    'Lucro'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="lucro"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparativo por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosComparativos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString()}`,
                    ''
                  ]}
                />
                <Bar
                  dataKey="anterior"
                  fill="hsl(var(--muted))"
                  name="Período Anterior"
                />
                <Bar
                  dataKey="atual"
                  fill="hsl(var(--primary))"
                  name="Período Atual"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Performance por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dadosComparativos.map((item) => {
              const variacao = calcularVariacao(item.atual, item.anterior);
              return (
                <div key={item.categoria} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.categoria}</h4>
                    <p className="text-sm text-muted-foreground">
                      Período anterior: R$ {item.anterior.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">R$ {item.atual.toLocaleString()}</div>
                    <div className={`flex items-center text-sm ${
                      variacao.positiva ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {variacao.positiva ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {variacao.positiva ? '+' : '-'}{variacao.valor}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}