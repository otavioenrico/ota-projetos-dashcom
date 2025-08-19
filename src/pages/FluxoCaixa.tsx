import { useState } from "react";
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
  id: number;
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
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: 1,
      data: "2024-01-15",
      descricao: "Venda Online - Loja Virtual",
      categoria: "Receita",
      fornecedor: "Mercado Pago",
      valor: 1250.00,
      status: "Confirmado",
      tipo: "entrada"
    },
    {
      id: 2,
      data: "2024-01-14",
      descricao: "Compra de Estoque",
      categoria: "Despesa",
      fornecedor: "Fornecedor ABC",
      valor: 850.00,
      status: "Pago",
      tipo: "saida"
    },
    {
      id: 3,
      data: "2024-01-13",
      descricao: "Taxa da Plataforma",
      categoria: "Despesa",
      fornecedor: "Shopify",
      valor: 129.90,
      status: "Pago",
      tipo: "saida"
    },
    {
      id: 4,
      data: "2024-01-12",
      descricao: "Venda Presencial",
      categoria: "Receita",
      fornecedor: "Loja Física",
      valor: 780.00,
      status: "Confirmado",
      tipo: "entrada"
    }
  ]);

  const { toast } = useToast();

  const handleAddTransaction = (newTransaction: any) => {
    const transaction: Transacao = {
      id: transacoes.length + 1,
      data: newTransaction.date,
      descricao: newTransaction.description,
      categoria: newTransaction.type === "receita" ? "Receita" : "Despesa",
      fornecedor: newTransaction.contact,
      valor: newTransaction.amount,
      status: "Confirmado",
      tipo: newTransaction.type === "receita" ? "entrada" : "saida"
    };
    
    setTransacoes([transaction, ...transacoes]);
    
    toast({
      title: "Transação adicionada!",
      description: "A transação foi registrada com sucesso.",
    });
  };

  const handleConcluir = (id: number) => {
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

  const handleExcluir = (id: number) => {
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