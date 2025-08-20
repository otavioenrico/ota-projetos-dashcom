import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, 
  Upload,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Trash2
} from "lucide-react";

interface Conta {
  id: string;
  description: string;
  contact_id?: string;
  total_amount: number;
  due_date: string;
  status: string;
  category_id?: string;
  installments?: number;
  notes?: string;
  board: string;
  org_id: string;
  created_at?: string;
  updated_at?: string;
  external_ref?: string;
  file_url?: string;
}

const Contas = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [contas, setContas] = useState<Conta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  const { orgId } = useAuth();
  
  const form = useForm({
    defaultValues: {
      description: "",
      contact_id: "",
      total_amount: "",
      due_date: "",
      board: "pagar",
      installments: "1",
      notes: ""
    }
  });

  const loadContas = async () => {
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
        .from('bills')
        .select('*')
        .eq('org_id', orgId)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setContas(data || []);
    } catch (error) {
      console.error('Error loading bills:', error);
      toast({
        title: "Erro ao carregar contas",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orgId) {
      loadContas();
    }
  }, [orgId]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // OCR stub - apenas preenche campos no form, não grava nada
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        form.setValue("description", "Fornecedor XYZ - Material");
        form.setValue("total_amount", "1200.00");
        form.setValue("due_date", "2024-02-15");
        form.setValue("installments", "3");
        toast({
          title: "Documento processado!",
          description: "Dados extraídos automaticamente. Revise e confirme.",
        });
      }, 2000);
    }
  };

  const onSubmit = async (data: any) => {
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
        .from('bills')
        .insert({
          org_id: orgId,
          description: data.description,
          total_amount: parseFloat(data.total_amount),
          due_date: data.due_date,
          board: data.board,
          status: "pending",
          installments: parseInt(data.installments),
          notes: data.notes
        });

      if (error) throw error;

      toast({
        title: "Conta cadastrada!",
        description: "A conta foi adicionada com sucesso.",
      });
      setIsDialogOpen(false);
      form.reset();
      setSelectedFile(null);
      loadContas(); // Recarregar lista
    } catch (error) {
      console.error('Error creating bill:', error);
      toast({
        title: "Erro ao cadastrar conta",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleConcluir = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .update({ status: "completed" })
        .eq('id', id)
        .eq('org_id', orgId);

      if (error) throw error;

      toast({
        title: "Conta concluída!",
        description: "A conta foi movida para o histórico.",
      });
      loadContas();
    } catch (error) {
      console.error('Error updating bill:', error);
      toast({
        title: "Erro ao atualizar conta",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleVoltarConta = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .update({ status: "pending" })
        .eq('id', id)
        .eq('org_id', orgId);

      if (error) throw error;

      toast({
        title: "Conta restaurada!",
        description: "A conta foi movida de volta para a lista ativa.",
      });
      loadContas();
    } catch (error) {
      console.error('Error updating bill:', error);
      toast({
        title: "Erro ao restaurar conta",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleExcluir = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id)
        .eq('org_id', orgId);

      if (error) throw error;

      toast({
        title: "Conta excluída!",
        description: "A conta foi excluída com sucesso.",
      });
      loadContas();
    } catch (error) {
      console.error('Error deleting bill:', error);
      toast({
        title: "Erro ao excluir conta",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success/10 text-success border-success/20">Pago</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      case "overdue":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Vencido</Badge>;
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Concluído</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const contasPagar = contas.filter(conta => 
    conta.board === "pagar" && conta.status !== "completed"
  );
  
  const contasReceber = contas.filter(conta => 
    conta.board === "receber" && conta.status !== "completed"
  );

  const contasConcluidas = contas.filter(conta => conta.status === "completed");
  
  const todasContas = contas.filter(conta => conta.status !== "completed");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Contas</h1>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const renderContasTable = (contasData: Conta[], tipo: "pagar" | "receber" | "todas" | "concluidas") => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>{tipo === "pagar" ? "Fornecedor" : tipo === "receber" ? "Cliente" : "Fornecedor/Cliente"}</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Parcela</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contasData.map((conta) => (
          <TableRow key={conta.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(conta.status)}
                {getStatusBadge(conta.status)}
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{conta.description}</p>
                {conta.notes && (
                  <p className="text-xs text-muted-foreground">{conta.notes}</p>
                )}
              </div>
            </TableCell>
            <TableCell>{conta.contact_id || "-"}</TableCell>
            <TableCell>{conta.category_id || "-"}</TableCell>
            <TableCell>{new Date(conta.due_date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{conta.installments || "-"}</TableCell>
            <TableCell className="text-right font-medium">
              {conta.total_amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {conta.status !== "completed" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleConcluir(conta.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir conta</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir esta conta? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleExcluir(conta.id)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contas</h1>
          <p className="text-muted-foreground">
            Gerencie todas suas contas a pagar e a receber
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Conta</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-foreground">
                          Faça upload do boleto ou documento
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          PDF, JPG, PNG até 10MB - Dados serão extraídos automaticamente
                        </span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {selectedFile && (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{selectedFile.name}</span>
                        {isProcessing && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Fornecedor ABC - Estoque" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="board"
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
                            <SelectItem value="pagar">Conta a Pagar</SelectItem>
                            <SelectItem value="receber">Conta a Receber</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="total_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Vencimento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="installments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Parcelas</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Parcelas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}x
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Informações adicionais..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Cadastrar Conta</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {contasPagar.reduce((total, conta) => total + conta.total_amount, 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>
            <p className="text-xs text-muted-foreground">{contasPagar.length} contas pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {contasReceber.reduce((total, conta) => total + conta.total_amount, 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>
            <p className="text-xs text-muted-foreground">{contasReceber.length} contas pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo em 7 dias</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">R$ 2.980,50</div>
            <p className="text-xs text-muted-foreground">2 contas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">R$ 480,50</div>
            <p className="text-xs text-muted-foreground">1 conta</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
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
              <Calendar className="mr-2 h-4 w-4" />
              Filtrar por data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas */}
        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="todas">Todas as Contas</TabsTrigger>
            <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
            <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
          </TabsList>
        
        <TabsContent value="todas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Contas</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContasTable(todasContas, "todas")}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pagar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Pagar</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContasTable(contasPagar, "pagar")}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receber" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Receber</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContasTable(contasReceber, "receber")}
            </CardContent>
          </Card>
        </TabsContent>

        </Tabs>

        {/* Seção de Histórico */}
        <Card>
          <CardHeader 
            className="cursor-pointer" 
            onClick={() => setHistoricoAberto(!historicoAberto)}
          >
            <div className="flex items-center justify-between">
              <CardTitle>Histórico</CardTitle>
              <Button variant="ghost" size="sm">
                <svg 
                  className={`h-4 w-4 transition-transform ${historicoAberto ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </CardHeader>
          {historicoAberto && (
            <CardContent>
              {contasConcluidas.length > 0 ? (
                <div className="space-y-4">
                  {contasConcluidas.map((conta) => (
                    <div key={conta.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{conta.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{conta.contact_id || "N/A"}</span>
                            <span>•</span>
                            <span>{new Date(conta.due_date).toLocaleDateString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <Badge className="bg-success/10 text-success border-success/20">
                          Concluído
                        </Badge>
                        <div className="font-bold">
                          {conta.total_amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2 text-xs"
                            onClick={() => handleVoltarConta(conta.id)}
                          >
                            Colocar de Volta
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir conta</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir esta conta? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleExcluir(conta.id)}>
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
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma conta concluída ainda.
                </p>
              )}
            </CardContent>
          )}
        </Card>
    </div>
  );
};

export default Contas;