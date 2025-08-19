import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search,
  Filter,
  CheckCircle,
  Trash2
} from "lucide-react";

interface Transacao {
  id: string;
  data: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valor: number;
  status: string;
  tipo: "entrada" | "saida";
  concluido?: boolean;
}

const FluxoCaixa = () => {
  const { orgId } = useAuth();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!orgId) return;
    loadTransacoes();
  }, [orgId]);

  const loadTransacoes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('org_id', orgId)
        .order('date', { ascending: false });

      if (error) throw error;
      
      // Transform Supabase data to match Transacao interface
      const transformedTransacoes = data?.map(transaction => ({
        id: transaction.id,
        data: transaction.date,
        descricao: transaction.description,
        categoria: transaction.kind === 'inflow' ? 'Receita' : 'Despesa',
        fornecedor: 'Sistema', // You can join with contacts if needed
        valor: Number(transaction.amount_net || transaction.amount_gross),
        status: transaction.status,
        tipo: transaction.kind === 'inflow' ? 'entrada' as const : 'saida' as const,
        concluido: transaction.status === 'completed'
      })) || [];

      setTransacoes(transformedTransacoes);
    } catch (error) {
      console.error('Error loading transacoes:', error);
      toast({
        title: "Erro ao carregar transações",
        description: "Não foi possível carregar as transações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (newTransaction: any) => {
    if (!orgId) {
      toast({
        title: "Erro de organização",
        description: "Crie/Selecione sua organização para continuar.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          org_id: orgId,
          description: newTransaction.description,
          amount_gross: newTransaction.amount,
          amount_net: newTransaction.amount,
          date: newTransaction.date,
          kind: newTransaction.type === "receita" ? "inflow" : "outflow",
          status: "paid",
          platform: "manual"
        })
        .select()
        .single();

      if (error) throw error;

      const transaction: Transacao = {
        id: data.id,
        data: newTransaction.date,
        descricao: newTransaction.description,
        categoria: newTransaction.type === "receita" ? "Receita" : "Despesa",
        fornecedor: newTransaction.contact || 'Manual',
        valor: newTransaction.amount,
        status: "Confirmado",
        tipo: newTransaction.type === "receita" ? "entrada" : "saida"
      };
      
      setTransacoes(prev => [transaction, ...prev]);
      
      toast({
        title: "Transação adicionada!",
        description: "A transação foi registrada com sucesso.",
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Erro ao adicionar transação",
        description: "Não foi possível registrar a transação.",
        variant: "destructive"
      });
    }
  };

  const handleConcluir = (id: string) => {
    setTransacoes(transacoes.map(transacao => 
      transacao.id === id 
        ? { ...transacao, concluido: true }
        : transacao
    ));
    toast({
      title: "Transação concluída!",
      description: "A transação foi movida para a lista de concluídos.",
    });
  };

  const handleExcluir = (id: string) => {
    setTransacoes(transacoes.filter(transacao => transacao.id !== id));
    toast({
      title: "Transação excluída!",
      description: "A transação foi excluída com sucesso.",
    });
  };

  const transacoesAtivas = transacoes.filter(t => !t.concluido);
  const transacoesConcluidas = transacoes.filter(t => t.concluido);

  const totalEntradas = transacoesAtivas
    .filter(t => t.tipo === "entrada")
    .reduce((total, t) => total + t.valor, 0);
    
  const totalSaidas = transacoesAtivas
    .filter(t => t.tipo === "saida")
    .reduce((total, t) => total + t.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fluxo de Caixa</h1>
          <p className="text-muted-foreground">
            Controle completo de todas suas movimentações financeiras
          </p>
        </div>
        <Button onClick={() => setShowTransactionModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar Transação
        </Button>
      </div>

      {/* Resumo do período */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {totalEntradas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {totalSaidas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {(totalEntradas - totalSaidas).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar por descrição, fornecedor..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de transações ativas */}
      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="animate-pulse flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-40"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {transacoesAtivas.map((transacao) => (
              <div key={transacao.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transacao.tipo === "entrada" ? "bg-success/10" : "bg-destructive/10"
                  }`}>
                    {transacao.tipo === "entrada" ? (
                      <ArrowUpCircle className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transacao.descricao}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{new Date(transacao.data).toLocaleDateString("pt-BR")}</span>
                      <span>•</span>
                      <span>{transacao.fornecedor}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <Badge variant={transacao.status === "Confirmado" ? "default" : "secondary"}>
                    {transacao.status}
                  </Badge>
                  <div className={`font-bold text-lg ${
                    transacao.tipo === "entrada" ? "text-success" : "text-destructive"
                  }`}>
                    {transacao.tipo === "entrada" ? "+" : "-"}
                    {transacao.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleConcluir(transacao.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleExcluir(transacao.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de transações concluídas */}
      {transacoesConcluidas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transações Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transacoesConcluidas.map((transacao) => (
                <div key={transacao.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transacao.tipo === "entrada" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {transacao.tipo === "entrada" ? (
                        <ArrowUpCircle className="h-5 w-5 text-success" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transacao.descricao}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(transacao.data).toLocaleDateString("pt-BR")}</span>
                        <span>•</span>
                        <span>{transacao.fornecedor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <Badge className="bg-success/10 text-success border-success/20">
                      Concluído
                    </Badge>
                    <div className={`font-bold text-lg ${
                      transacao.tipo === "entrada" ? "text-success" : "text-destructive"
                    }`}>
                      {transacao.tipo === "entrada" ? "+" : "-"}
                      {transacao.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleExcluir(transacao.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <TransactionModal 
        open={showTransactionModal} 
        onOpenChange={setShowTransactionModal}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default FluxoCaixa;