import { useState } from "react";
import { Search, Plus, Filter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Cliente {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  cidade: string;
  uf: string;
}

const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "ABC Comércio",
    razaoSocial: "ABC Comércio de Produtos LTDA",
    cnpj: "12.345.678/0001-90",
    email: "contato@abc.com",
    telefone: "(11) 98765-4321",
    whatsapp: "5511987654321",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    uf: "SP"
  },
  {
    id: "2",
    nome: "Beta Distribuidora",
    razaoSocial: "Beta Distribuidora de Alimentos LTDA",
    cnpj: "98.765.432/0001-10",
    email: "vendas@beta.com",
    telefone: "(11) 91234-5678",
    whatsapp: "5511912345678",
    endereco: "Av. Central, 456",
    cidade: "São Paulo",
    uf: "SP"
  }
];

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    razaoSocial: "",
    cnpj: "",
    email: "",
    telefone: "",
    whatsapp: "",
    endereco: "",
    cidade: "",
    uf: ""
  });
  const { toast } = useToast();

  const clientesFiltrados = clientes
    .filter(cliente =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cnpj.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const buscarDadosCNPJ = async (cnpj: string) => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length === 14) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        if (response.ok) {
          const dados = await response.json();
          setNovoCliente(prev => ({
            ...prev,
            razaoSocial: dados.razao_social || dados.nome || "",
            endereco: `${dados.logradouro || ""}, ${dados.numero || ""}`,
            cidade: dados.municipio || "",
            uf: dados.uf || ""
          }));
          toast({
            title: "Dados encontrados!",
            description: "Informações do CNPJ foram carregadas automaticamente.",
          });
        }
      } catch (error) {
        toast({
          title: "Erro ao buscar CNPJ",
          description: "Não foi possível buscar os dados do CNPJ.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCadastrarCliente = () => {
    if (!novoCliente.nome || !novoCliente.cnpj) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e CNPJ são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const cliente: Cliente = {
      id: Date.now().toString(),
      ...novoCliente
    };

    setClientes(prev => [...prev, cliente]);
    setNovoCliente({
      nome: "", razaoSocial: "", cnpj: "", email: "", telefone: "", whatsapp: "", endereco: "", cidade: "", uf: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Cliente cadastrado!",
      description: "Cliente foi adicionado com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={novoCliente.nome}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome do cliente"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={novoCliente.cnpj}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, cnpj: e.target.value }))}
                  onBlur={(e) => buscarDadosCNPJ(e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input
                  id="razaoSocial"
                  value={novoCliente.razaoSocial}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, razaoSocial: e.target.value }))}
                  placeholder="Razão social da empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoCliente.email}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={novoCliente.telefone}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={novoCliente.whatsapp}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="5511999999999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={novoCliente.endereco}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, endereco: e.target.value }))}
                  placeholder="Rua, número"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={novoCliente.cidade}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, cidade: e.target.value }))}
                  placeholder="São Paulo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  value={novoCliente.uf}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, uf: e.target.value }))}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCadastrarCliente}>
                Cadastrar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-4">
        {clientesFiltrados.map((cliente) => (
          <Card key={cliente.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{cliente.nome}</h3>
                    <Badge variant="outline">{cliente.cnpj}</Badge>
                  </div>
                  <p className="text-muted-foreground">{cliente.razaoSocial}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{cliente.telefone}</span>
                    <span>{cliente.email}</span>
                    <span>{cliente.cidade}/{cliente.uf}</span>
                  </div>
                </div>
                
                {cliente.whatsapp && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${cliente.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clientesFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum cliente encontrado com os filtros aplicados." : "Nenhum cliente cadastrado ainda."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}