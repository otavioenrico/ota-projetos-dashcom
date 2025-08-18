import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Building2, 
  BarChart3, 
  Calendar,
  ShoppingCart,
  Package,
  Clock,
  DollarSign,
  Target,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const Produto = () => {
  const integrations = [
    { name: "Mercado Livre", logo: "🛒", category: "Marketplace" },
    { name: "Shopee", logo: "🛍️", category: "Marketplace" },
    { name: "Shein", logo: "👗", category: "Marketplace" },
    { name: "Tiny ERP", logo: "📊", category: "Gestão" },
    { name: "Bling", logo: "💼", category: "Gestão" },
    { name: "Google Ads", logo: "🎯", category: "Marketing" }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Fluxo de Caixa Inteligente",
      description: "Visualize entradas e saídas em tempo real com gráficos interativos"
    },
    {
      icon: CreditCard,
      title: "Gestão de Contas",
      description: "Controle contas a pagar e receber com lembretes automáticos"
    },
    {
      icon: Users,
      title: "CRM Integrado",
      description: "Gerencie clientes e fornecedores com histórico completo"
    },
    {
      icon: BarChart3,
      title: "Relatórios Avançados",
      description: "Análises detalhadas para decisões estratégicas"
    },
    {
      icon: Calendar,
      title: "Agenda Financeira",
      description: "Organize compromissos e prazos importantes"
    },
    {
      icon: ShoppingCart,
      title: "Multi-Marketplace",
      description: "Sincronize vendas de todas suas plataformas"
    }
  ];

  const metrics = [
    {
      icon: Clock,
      value: "30+",
      label: "Horas economizadas por mês",
      description: "Automatização de tarefas repetitivas"
    },
    {
      icon: DollarSign,
      value: "20%",
      label: "Aumento no faturamento",
      description: "Decisões baseadas em dados precisos"
    },
    {
      icon: Target,
      value: "85%",
      label: "Redução de erros",
      description: "Eliminação de planilhas manuais"
    },
    {
      icon: Zap,
      value: "5 min",
      label: "Tempo para gerar relatórios",
      description: "Relatórios instantâneos e precisos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">DashComm</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/produto" className="text-primary font-medium">
              Produto
            </Link>
            <Link to="/planos" className="text-foreground hover:text-primary transition-colors">
              Planos
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/registrar">Cadastre-se</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-sm">
            💡 Solução completa para e-commerce
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            O que é o DashComm?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Uma plataforma completa de gestão financeira e operacional para e-commerce. 
            Integre todas suas vendas, controle seu fluxo de caixa e tome decisões 
            inteligentes baseadas em dados reais.
          </p>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Integrações que funcionam
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conecte-se com as principais plataformas do mercado e centralize 
              toda sua operação em um só lugar
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{integration.logo}</div>
                  <h3 className="font-semibold text-sm mb-1">{integration.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {integration.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Funcionalidades principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu e-commerce com eficiência
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Resultados comprovados
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Veja o impacto real que o DashComm pode ter no seu negócio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{metric.value}</div>
                  <h3 className="font-semibold mb-2">{metric.label}</h3>
                  <p className="text-sm opacity-80">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Em poucos passos você estará no controle total do seu e-commerce
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Conecte suas plataformas</h3>
              <p className="text-muted-foreground">
                Integre Mercado Livre, Shopee e outras plataformas em segundos
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Automatize seus processos</h3>
              <p className="text-muted-foreground">
                Deixe o sistema sincronizar vendas e organizar seu fluxo de caixa
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Tome decisões inteligentes</h3>
              <p className="text-muted-foreground">
                Use relatórios em tempo real para expandir seu negócio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para transformar seu e-commerce?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já descobriram o poder 
            de uma gestão inteligente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/registrar">Comece gratuitamente</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/planos">Ver planos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">DashComm</span>
              </div>
              <p className="text-background/70">
                Gestão inteligente para seu e-commerce
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/produto" className="hover:text-background transition-colors">Funcionalidades</Link></li>
                <li><Link to="/planos" className="hover:text-background transition-colors">Planos</Link></li>
                <li><a href="#" className="hover:text-background transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/70">
            <p>&copy; 2024 DashComm. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Produto;