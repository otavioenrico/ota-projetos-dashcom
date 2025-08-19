import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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

interface Fornecedor {
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
  categoria: string;
}

const fornecedoresMock: Fornecedor[] = [
  {
    id: "1",
    nome: "TechSupply",
    razaoSocial: "TechSupply Equipamentos LTDA",
    cnpj: "11.222.333/0001-44",
    email: "vendas@techsupply.com",
    telefone: "(11) 95555-1234",
    whatsapp: "5511955551234",
    endereco: "Rua da Tecnologia, 789",
    cidade: "São Paulo",
    uf: "SP",
    categoria: "Equipamentos"
  },
  {
    id: "2",
    nome: "Logística Express",
    razaoSocial: "Logística Express Transportes LTDA",
    cnpj: "22.333.444/0001-55",
    email: "contato@logexpress.com",
    telefone: "(11) 94444-5678",
    whatsapp: "5511944445678",
    endereco: "Av. dos Transportes, 456",
    cidade: "Guarulhos",
    uf: "SP",
    categoria: "Logística"
  }
];

export default function Fornecedores() {
  const { orgId } = useAuth();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: "",
    razaoSocial: "",
    cnpj: "",
    email: "",
    telefone: "",
    whatsapp: "",
    endereco: "",
    cidade: "",
    uf: "",
    categoria: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (!orgId) return;
    loadFornecedores();
  }, [orgId]);

  const loadFornecedores = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('org_id', orgId)
        .eq('type', 'vendor')
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Transform Supabase data to match Fornecedor interface
      const transformedFornecedores = data?.map(contact => ({
        id: contact.id,
        nome: contact.name || '',
        razaoSocial: contact.name || '',
        cnpj: contact.cnpj || '',
        email: contact.email || '',
        telefone: contact.phone || '',
        whatsapp: contact.phone || '',
        endereco: contact.address || '',
        cidade: contact.city || '',
        uf: contact.state || '',
        categoria: 'Fornecedor'
      })) || [];

      setFornecedores(transformedFornecedores);
    } catch (error) {
      console.error('Error loading fornecedores:', error);
      toast({
        title: "Erro ao carregar fornecedores",
        description: "Não foi possível carregar a lista de fornecedores.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fornecedoresFiltrados = fornecedores
    .filter(fornecedor =>
      fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj.includes(searchTerm) ||
      fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const buscarDadosCNPJ = async (cnpj: string) => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length === 14) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        if (response.ok) {
          const dados = await response.json();
          setNovoFornecedor(prev => ({
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

  const handleCadastrarFornecedor = async () => {
    if (!novoFornecedor.nome || !novoFornecedor.cnpj) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e CNPJ são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

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
        .from('contacts')
        .insert({
          org_id: orgId,
          name: novoFornecedor.nome,
          cnpj: novoFornecedor.cnpj,
          email: novoFornecedor.email,
          phone: novoFornecedor.telefone,
          address: novoFornecedor.endereco,
          city: novoFornecedor.cidade,
          state: novoFornecedor.uf,
          type: 'vendor'
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      const fornecedor: Fornecedor = {
        id: data.id,
        nome: novoFornecedor.nome,
        razaoSocial: novoFornecedor.razaoSocial,
        cnpj: novoFornecedor.cnpj,
        email: novoFornecedor.email,
        telefone: novoFornecedor.telefone,
        whatsapp: novoFornecedor.whatsapp,
        endereco: novoFornecedor.endereco,
        cidade: novoFornecedor.cidade,
        uf: novoFornecedor.uf,
        categoria: novoFornecedor.categoria
      };

      setFornecedores(prev => [fornecedor, ...prev]);
      setNovoFornecedor({
        nome: "", razaoSocial: "", cnpj: "", email: "", telefone: "", whatsapp: "", endereco: "", cidade: "", uf: "", categoria: ""
      });
      setIsDialogOpen(false);
      
      toast({
        title: "Fornecedor cadastrado!",
        description: "Fornecedor foi adicionado com sucesso.",
      });
    } catch (error) {
      console.error('Error creating fornecedor:', error);
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o fornecedor.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
          <p className="text-muted-foreground">Gerencie seus fornecedores e parceiros</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Fornecedor</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={novoFornecedor.nome}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome do fornecedor"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={novoFornecedor.cnpj}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, cnpj: e.target.value }))}
                  onBlur={(e) => buscarDadosCNPJ(e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input
                  id="razaoSocial"
                  value={novoFornecedor.razaoSocial}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, razaoSocial: e.target.value }))}
                  placeholder="Razão social da empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={novoFornecedor.categoria}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, categoria: e.target.value }))}
                  placeholder="Ex: Equipamentos, Logística, Matéria Prima"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoFornecedor.email}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={novoFornecedor.telefone}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={novoFornecedor.whatsapp}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="5511999999999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={novoFornecedor.endereco}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, endereco: e.target.value }))}
                  placeholder="Rua, número"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={novoFornecedor.cidade}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, cidade: e.target.value }))}
                  placeholder="São Paulo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  value={novoFornecedor.uf}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, uf: e.target.value }))}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCadastrarFornecedor}>
                Cadastrar Fornecedor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar fornecedores..."
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

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {fornecedoresFiltrados.map((fornecedor) => (
          <Card key={fornecedor.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{fornecedor.nome}</h3>
                    <Badge variant="outline">{fornecedor.cnpj}</Badge>
                    {fornecedor.categoria && (
                      <Badge variant="secondary">{fornecedor.categoria}</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{fornecedor.razaoSocial}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{fornecedor.telefone}</span>
                    <span>{fornecedor.email}</span>
                    <span>{fornecedor.cidade}/{fornecedor.uf}</span>
                  </div>
                </div>
                
                {fornecedor.whatsapp && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${fornecedor.whatsapp}`}
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
      )}

      {fornecedoresFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum fornecedor encontrado com os filtros aplicados." : "Nenhum fornecedor cadastrado ainda."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}