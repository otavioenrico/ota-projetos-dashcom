import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Plus, 
  Upload,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search
} from "lucide-react";

interface Conta {
  id: number;
  descricao: string;
  fornecedor: string;
  valor: number;
  dataVencimento: string;
  status: "pendente" | "pago" | "vencido";
  categoria: string;
  parcela?: string;
  observacoes?: string;
}

const contasPagar: Conta[] = [
  {
    id: 1,
    descricao: "Fornecedor ABC - Estoque",
    fornecedor: "Fornecedor ABC Ltda",
    valor: 2500.00,
    dataVencimento: "2024-01-20",
    status: "pendente",
    categoria: "Fornecedores",
    parcela: "1/4",
    observacoes: "Pagamento parcelado em 4x"
  },
  {
    id: 2,
    descricao: "Aluguel da Loja",
    fornecedor: "Imobiliária Silva",
    valor: 3200.00,
    dataVencimento: "2024-01-15",
    status: "pago",
    categoria: "Fixas",
  },
  {
    id: 3,
    descricao: "Conta de Energia",
    fornecedor: "Companhia Elétrica",
    valor: 480.50,
    dataVencimento: "2024-01-12",
    status: "vencido",
    categoria: "Utilitários",
  }
];

const contasReceber: Conta[] = [
  {
    id: 4,
    descricao: "Venda Cliente XYZ",
    fornecedor: "Cliente XYZ Ltda",
    valor: 4500.00,
    dataVencimento: "2024-01-25",
    status: "pendente",
    categoria: "Vendas",
    parcela: "2/3"
  },
  {
    id: 5,
    descricao: "Serviço de Consultoria",
    fornecedor: "Empresa DEF",
    valor: 1800.00,
    dataVencimento: "2024-01-18",
    status: "pendente",
    categoria: "Serviços",
  }
];

const Contas = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      descricao: "",
      fornecedor: "",
      valor: "",
      dataVencimento: "",
      categoria: "",
      parcelas: "1",
      observacoes: ""
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simular processamento do boleto
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        form.setValue("descricao", "Fornecedor XYZ - Material");
        form.setValue("fornecedor", "Fornecedor XYZ Ltda");
        form.setValue("valor", "1200.00");
        form.setValue("dataVencimento", "2024-02-15");
        form.setValue("categoria", "Fornecedores");
        form.setValue("parcelas", "3");
        toast({
          title: "Boleto processado!",
          description: "Dados extraídos automaticamente. Revise e confirme.",
        });
      }, 2000);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Cadastrando conta:", data);
    toast({
      title: "Conta cadastrada!",
      description: "A conta foi adicionada com sucesso.",
    });
    setIsDialogOpen(false);
    form.reset();
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-success/10 text-success border-success/20">Pago</Badge>;
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>;
      case "vencido":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Vencido</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pendente":
        return <Clock className="h-4 w-4 text-warning" />;
      case "vencido":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const renderContasTable = (contas: Conta[], tipo: "pagar" | "receber") => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>{tipo === "pagar" ? "Fornecedor" : "Cliente"}</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Parcela</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contas.map((conta) => (
          <TableRow key={conta.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(conta.status)}
                {getStatusBadge(conta.status)}
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{conta.descricao}</p>
                {conta.observacoes && (
                  <p className="text-xs text-muted-foreground">{conta.observacoes}</p>
                )}
              </div>
            </TableCell>
            <TableCell>{conta.fornecedor}</TableCell>
            <TableCell>{conta.categoria}</TableCell>
            <TableCell>{new Date(conta.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{conta.parcela || "-"}</TableCell>
            <TableCell className="text-right font-medium">
              {conta.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
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
                    name="descricao"
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
                    name="fornecedor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fornecedor/Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do fornecedor ou cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="valor"
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
                    name="dataVencimento"
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
                    name="parcelas"
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
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fornecedores">Fornecedores</SelectItem>
                          <SelectItem value="fixas">Despesas Fixas</SelectItem>
                          <SelectItem value="utilitarios">Utilitários</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
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
            <div className="text-2xl font-bold text-destructive">R$ 6.180,50</div>
            <p className="text-xs text-muted-foreground">3 contas pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">R$ 6.300,00</div>
            <p className="text-xs text-muted-foreground">2 contas pendentes</p>
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
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas de Contas */}
      <Tabs defaultValue="pagar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pagar">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Pagar</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContasTable(contasPagar, "pagar")}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receber">
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
    </div>
  );
};

export default Contas;