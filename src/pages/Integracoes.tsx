import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Integracoes = () => {
  const { toast } = useToast();
  const [syncingPlatforms, setSyncingPlatforms] = useState<string[]>([]);

  const marketplaces = [
    {
      id: 'mercado-livre',
      name: 'Mercado Livre',
      logo: '🛒',
      category: 'Marketplace',
      status: 'disconnected',
      description: 'Sincronize vendas, estoque e clientes do ML',
      features: ['Vendas automáticas', 'Controle de estoque', 'Gestão financeira']
    },
    {
      id: 'shopee',
      name: 'Shopee',
      logo: '🛍️',
      category: 'Marketplace', 
      status: 'disconnected',
      description: 'Integração completa com a Shopee Brasil',
      features: ['Sincronização de produtos', 'Gestão de pedidos', 'Relatórios de vendas']
    },
    {
      id: 'shein',
      name: 'Shein',
      logo: '👗',
      category: 'Marketplace',
      status: 'disconnected', 
      description: 'Conecte sua loja Shein ao DashComm',
      features: ['Produtos automáticos', 'Controle de vendas', 'Analytics']
    },
    {
      id: 'amazon',
      name: 'Amazon',
      logo: '📦',
      category: 'Marketplace',
      status: 'coming-soon',
      description: 'Em breve: Integração com Amazon Brasil',
      features: ['Gestão de FBA', 'Sincronização completa', 'Relatórios avançados']
    }
  ];

  const managementTools = [
    {
      id: 'tiny',
      name: 'Tiny ERP',
      logo: '📊',
      category: 'Gestão',
      status: 'disconnected',
      description: 'Sincronize estoque e vendas com Tiny ERP',
      features: ['Controle de estoque', 'Notas fiscais', 'Relatórios financeiros']
    },
    {
      id: 'bling',
      name: 'Bling',
      logo: '💼',
      category: 'Gestão',
      status: 'disconnected',
      description: 'Integração completa com sistema Bling',
      features: ['Gestão comercial', 'Controle financeiro', 'Emissão de NFe']
    }
  ];

  const handleSync = async (platformId: string, platformName: string) => {
    setSyncingPlatforms(prev => [...prev, platformId]);
    
    // Simulate OAuth flow
    toast({
      title: "Redirecionando...",
      description: `Abrindo página de autorização do ${platformName}`,
    });

    // Simulate API call
    setTimeout(() => {
      setSyncingPlatforms(prev => prev.filter(id => id !== platformId));
      toast({
        title: "Integração configurada!",
        description: `${platformName} foi conectado com sucesso. Iniciando sincronização...`,
      });
    }, 3000);
  };

  const renderPlatformCard = (platform: any) => (
    <Card key={platform.id} className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{platform.logo}</div>
            <div>
              <CardTitle className="text-lg">{platform.name}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {platform.category}
              </Badge>
            </div>
          </div>
          
          {platform.status === 'connected' && (
            <CheckCircle className="w-5 h-5 text-success" />
          )}
          {platform.status === 'disconnected' && (
            <AlertCircle className="w-5 h-5 text-warning" />
          )}
          {platform.status === 'coming-soon' && (
            <Badge variant="outline" className="text-xs">Em breve</Badge>
          )}
        </div>
        
        <CardDescription className="text-sm">
          {platform.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recursos inclusos:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {platform.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4">
          {platform.status === 'disconnected' && (
            <Button 
              onClick={() => handleSync(platform.id, platform.name)}
              disabled={syncingPlatforms.includes(platform.id)}
              className="w-full"
            >
              {syncingPlatforms.includes(platform.id) ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Sincronizar
                </>
              )}
            </Button>
          )}
          
          {platform.status === 'connected' && (
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Ressincronizar
              </Button>
              <Button variant="destructive" size="sm" className="w-full">
                Desconectar
              </Button>
            </div>
          )}
          
          {platform.status === 'coming-soon' && (
            <Button disabled className="w-full">
              Em desenvolvimento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground mt-2">
          Conecte suas plataformas de venda e gestão para sincronização automática
        </p>
      </div>

      {/* Marketplaces */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Marketplaces</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Conecte suas contas de vendas online para importar pedidos, produtos e clientes automaticamente
          </p>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {marketplaces.map(renderPlatformCard)}
          </div>
        </div>
      </div>

      {/* Management Tools */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ferramentas de Gestão</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Sincronize com sistemas de ERP e gestão para controle completo do seu negócio
          </p>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {managementTools.map(renderPlatformCard)}
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Status das Sincronizações
          </CardTitle>
          <CardDescription>
            Acompanhe o status das suas integrações ativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Última sincronização bem-sucedida</span>
              </div>
              <span className="text-xs text-muted-foreground">Há 15 minutos</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• Sincronização automática a cada 15 minutos</p>
              <p>• Backfill inicial dos últimos 90 dias</p>
              <p>• Webhooks configurados para atualizações em tempo real</p>
            </div>
            
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver logs detalhados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integracoes;