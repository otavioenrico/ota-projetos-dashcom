import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calendar,
  Clock,
  MapPin,
  Users
} from "lucide-react";

const eventos = [
  {
    id: 1,
    titulo: "Reunião com Fornecedor ABC",
    data: "2024-01-16",
    hora: "14:00",
    tipo: "reuniao",
    local: "Escritório",
    descricao: "Negociar preços para próximo trimestre"
  },
  {
    id: 2,
    titulo: "Pagamento - Fornecedor XYZ",
    data: "2024-01-17",
    hora: "09:00",
    tipo: "pagamento",
    valor: "R$ 2.500,00",
    descricao: "Vencimento da fatura mensal"
  },
  {
    id: 3,
    titulo: "Análise de Vendas Semanal",
    data: "2024-01-18",
    hora: "10:30",
    tipo: "analise",
    descricao: "Revisar performance da semana"
  },
  {
    id: 4,
    titulo: "Recebimento - Cliente Premium",
    data: "2024-01-19",
    hora: "15:00",
    tipo: "recebimento",
    valor: "R$ 3.200,00",
    descricao: "Pagamento de pedido especial"
  }
];

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "reuniao": return "bg-primary";
    case "pagamento": return "bg-destructive";
    case "recebimento": return "bg-success";
    case "analise": return "bg-warning";
    default: return "bg-muted";
  }
};

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case "reuniao": return "Reunião";
    case "pagamento": return "Pagamento";
    case "recebimento": return "Recebimento";
    case "analise": return "Análise";
    default: return "Evento";
  }
};

const Agenda = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">
            Organize seus compromissos e lembretes financeiros
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      {/* Visão geral do dia */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Compromissos agendados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reuniões</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recebimentos</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Previstos</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendário simples (mockup) */}
      <Card>
        <CardHeader>
          <CardTitle>Janeiro 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
              <div key={dia} className="p-2 font-medium text-muted-foreground">
                {dia}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const dia = i - 6;
              const hasEvent = [16, 17, 18, 19].includes(dia);
              return (
                <div 
                  key={i} 
                  className={`p-2 h-10 flex items-center justify-center rounded ${
                    dia > 0 && dia <= 31 
                      ? hasEvent 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted cursor-pointer"
                      : "text-muted-foreground"
                  }`}
                >
                  {dia > 0 && dia <= 31 ? dia : ""}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de eventos próximos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div key={evento.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-3 h-3 rounded-full mt-2 ${getTipoColor(evento.tipo)}`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{evento.titulo}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {getTipoLabel(evento.tipo)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {evento.data}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {evento.hora}
                    </div>
                    {evento.local && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {evento.local}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                  {evento.valor && (
                    <p className={`text-sm font-medium mt-1 ${
                      evento.tipo === "recebimento" ? "text-success" : "text-destructive"
                    }`}>
                      {evento.valor}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agenda;