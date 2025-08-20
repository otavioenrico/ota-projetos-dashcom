import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, 
  Calendar, 
  Clock,
  MapPin,
  Grid3X3,
  List,
  CheckCircle,
  CreditCard,
  Users,
  DollarSign
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  type: string;
  datetime: string;
  notes?: string;
  org_id: string;
}

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "reuniao": return "bg-blue-100 text-blue-800 border-blue-200";
    case "pagamento": return "bg-red-100 text-red-800 border-red-200";
    case "recebimento": return "bg-green-100 text-green-800 border-green-200";
    case "tarefa": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case "reuniao": return "Reunião";
    case "pagamento": return "Pagamento";
    case "recebimento": return "Recebimento";
    case "tarefa": return "Tarefa";
    default: return tipo;
  }
};

export default function Agenda() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventos, setEventos] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  const { orgId } = useAuth();

  const form = useForm({
    defaultValues: {
      title: "",
      type: "",
      datetime: "",
      notes: ""
    }
  });

  const loadEventos = async () => {
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
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('org_id', orgId)
        .order('datetime', { ascending: true });

      if (error) throw error;
      setEventos(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: "Erro ao carregar eventos",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orgId) {
      loadEventos();
    }
  }, [orgId]);

  const handleCriarEvento = async (data: any) => {
    if (!orgId) {
      toast({
        title: "Erro",
        description: "Selecione/Crie sua organização",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('calendar_events')
        .insert({
          org_id: orgId,
          title: data.title,
          type: data.type,
          datetime: data.datetime,
          notes: data.notes
        });

      if (error) throw error;

      toast({
        title: "Evento criado!",
        description: "O evento foi adicionado à sua agenda.",
      });
      setIsDialogOpen(false);
      form.reset();
      loadEventos();
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Erro ao criar evento",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const getEventCounts = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const eventosHoje = eventos.filter(e => e.datetime.split('T')[0] === hoje);
    const reunioes = eventos.filter(e => e.type === "reuniao");
    const pagamentos = eventos.filter(e => e.type === "pagamento");
    const recebimentos = eventos.filter(e => e.type === "recebimento");

    return {
      hoje: eventosHoje.length,
      reunioes: reunioes.length,
      pagamentos: pagamentos.length,
      recebimentos: recebimentos.length
    };
  };

  const counts = getEventCounts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Agenda</h1>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie seus compromissos e eventos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCriarEvento)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do evento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="reuniao">Reunião</SelectItem>
                            <SelectItem value="pagamento">Pagamento</SelectItem>
                            <SelectItem value="recebimento">Recebimento</SelectItem>
                            <SelectItem value="tarefa">Tarefa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="datetime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data e Hora</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Detalhes adicionais..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Criar Evento</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.hoje}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reuniões</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.reunioes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.pagamentos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recebimentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.recebimentos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Eventos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          {eventos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum evento agendado
            </div>
          ) : (
            <div className="space-y-4">
              {eventos.map((evento) => (
                <div key={evento.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getTipoColor(evento.type)}`}>
                      {getTipoLabel(evento.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{evento.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(evento.datetime).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(evento.datetime).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      {evento.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{evento.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}