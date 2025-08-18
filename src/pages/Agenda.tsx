import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, Plus, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const eventos = [
  {
    id: 1,
    titulo: "Reunião com Fornecedor ABC",
    data: "2024-01-16",
    hora: "14:00",
    tipo: "reuniao",
    local: "Escritório",
    descricao: "Negociar preços para próximo trimestre",
    valor: undefined
  },
  {
    id: 2,
    titulo: "Pagamento - Fornecedor XYZ",
    data: "2024-01-17",
    hora: "09:00",
    tipo: "pagamento",
    valor: 2500,
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
    valor: 3200,
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

export default function Agenda() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventosState, setEventosState] = useState(eventos);
  const [novoEvento, setNovoEvento] = useState({
    titulo: "",
    data: "",
    hora: "",
    tipo: "",
    local: "",
    descricao: "",
    valor: ""
  });
  const { toast } = useToast();

  const handleCriarEvento = () => {
    if (!novoEvento.titulo || !novoEvento.data || !novoEvento.hora) {
      toast({
        title: "Campos obrigatórios",
        description: "Título, data e hora são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const evento = {
      id: eventosState.length + 1,
      titulo: novoEvento.titulo,
      data: novoEvento.data,
      hora: novoEvento.hora,
      tipo: novoEvento.tipo || "reuniao",
      local: novoEvento.local,
      descricao: novoEvento.descricao,
      valor: novoEvento.valor ? parseFloat(novoEvento.valor) : undefined
    };

    setEventosState(prev => [...prev, evento]);
    setNovoEvento({
      titulo: "", data: "", hora: "", tipo: "", local: "", descricao: "", valor: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Evento criado!",
      description: "Novo compromisso foi adicionado à sua agenda.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Organize seus compromissos e lembretes</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Compromisso
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Compromisso</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={novoEvento.titulo}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Título do compromisso"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data *</Label>
                    <Input
                      id="data"
                      type="date"
                      value={novoEvento.data}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, data: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora *</Label>
                    <Input
                      id="hora"
                      type="time"
                      value={novoEvento.hora}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, hora: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={novoEvento.tipo} onValueChange={(value) => setNovoEvento(prev => ({ ...prev, tipo: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reuniao">Reunião</SelectItem>
                      <SelectItem value="pagamento">Pagamento</SelectItem>
                      <SelectItem value="recebimento">Recebimento</SelectItem>
                      <SelectItem value="lembrete">Lembrete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="local">Local</Label>
                  <Input
                    id="local"
                    value={novoEvento.local}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, local: e.target.value }))}
                    placeholder="Local do compromisso"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor (opcional)</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={novoEvento.valor}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, valor: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={novoEvento.descricao}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, descricao: e.target.value }))}
                    placeholder="Detalhes do compromisso"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCriarEvento}>
                  Criar Compromisso
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
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

      {/* Calendário ou Lista baseado no viewMode */}
      {viewMode === 'grid' && (
        <Card>
          <CardHeader>
            <CardTitle>Janeiro 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                <div key={dia} className="p-2 text-sm font-medium text-muted-foreground">
                  {dia}
                </div>
              ))}
              
              {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
                const temEvento = eventosState.some(evento => {
                  const dataEvento = new Date(evento.data + 'T00:00:00');
                  return dataEvento.getDate() === dia;
                });
                
                return (
                  <div
                    key={dia}
                    className={`p-2 text-sm rounded-md hover:bg-muted cursor-pointer ${
                      temEvento ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    {dia}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Eventos */}
      <Card>
        <CardHeader>
          <CardTitle>
            {viewMode === 'list' ? 'Agenda - Visualização em Lista' : 'Próximos Eventos'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={viewMode === 'list' ? 'space-y-3' : 'space-y-4'}>
            {eventosState.map((evento) => (
              <div 
                key={evento.id} 
                className={`border rounded-lg p-4 ${
                  viewMode === 'list' ? 'hover:shadow-md transition-shadow' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{evento.titulo}</h3>
                      <Badge className={getTipoColor(evento.tipo)}>
                        {getTipoLabel(evento.tipo)}
                      </Badge>
                    </div>
                    
                    <div className={`flex items-center gap-4 text-sm text-muted-foreground ${
                      viewMode === 'list' ? 'flex-wrap' : ''
                    }`}>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{evento.hora}</span>
                      </div>
                      {evento.local && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{evento.local}</span>
                        </div>
                      )}
                    </div>
                    
                    {evento.descricao && (
                      <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                    )}
                  </div>
                  
                  {evento.valor && (
                    <div className="text-right ml-4">
                      <span className="font-semibold text-lg">
                        R$ {evento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}