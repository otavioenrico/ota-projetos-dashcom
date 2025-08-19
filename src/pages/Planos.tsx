import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  TrendingUp, 
  Check,
  X,
  Star,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Planos = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plan = {
    name: "DashComm Pro",
    monthlyPrice: "R$ 39",
    annualPrice: "R$ 400",
    originalAnnualPrice: "R$ 468",
    description: "Para negócios em crescimento",
    features: [
      { name: "Transações ilimitadas", included: true },
      { name: "Todas as integrações", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Gestão de clientes", included: true },
      { name: "Fluxo de caixa completo", included: true },
      { name: "Agenda financeira", included: true },
      { name: "Backup automático", included: true },
      { name: "API para integrações customizadas", included: isAnnual },
      { name: "Consultoria mensal gratuita", included: isAnnual },
      { name: "Relatórios personalizados", included: isAnnual },
      { name: "Prioridade em novos recursos", included: isAnnual }
    ]
  };

  const faq = [
    {
      question: "Posso trocar de plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente."
    },
    {
      question: "O que acontece se eu exceder o limite do plano gratuito?",
      answer: "Você receberá uma notificação quando estiver próximo do limite. Após exceder, será necessário fazer upgrade para continuar usando todas as funcionalidades."
    },
    {
      question: "Há taxa de cancelamento?",
      answer: "Não há nenhuma taxa de cancelamento. Você pode cancelar sua assinatura a qualquer momento e manter acesso até o final do período pago."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos cartão de crédito, PIX e boleto bancário. Para planos anuais, oferecemos desconto adicional no PIX."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">DashComm</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Início
              </Link>
              <Link to="/produto" className="text-foreground hover:text-primary transition-colors">
                Produto
              </Link>
              <Link to="/planos" className="text-primary font-medium">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-sm">
            💰 Planos flexíveis para todos os tamanhos de negócio
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Escolha o plano ideal para você
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comece grátis e evolua conforme seu negócio cresce. 
            Sem taxas ocultas, sem surpresas.
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
            <span className={`font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Anual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="text-success">
                15% off
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="relative ring-2 ring-primary shadow-lg">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
              <Star className="w-3 h-3 mr-1" />
              Mais Popular
            </Badge>
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Pricing */}
              <div className="p-8 border-r">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        {isAnnual ? '/ano' : '/mês'}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground line-through">
                          {plan.originalAnnualPrice}
                        </p>
                        <Badge variant="secondary" className="text-success">
                          <Zap className="w-3 h-3 mr-1" />
                          15% de desconto
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <Button className="w-full text-lg py-6" asChild>
                    <Link to="/registrar">
                      {isAnnual ? 'Assinar anual' : 'Assinar agora'}
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right side - Features */}
              <div className="p-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Free Trial Card */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Teste grátis por 7 dias</h3>
              <p className="text-muted-foreground mb-4">
                Experimente todas as funcionalidades sem compromisso
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/registrar">Começar teste gratuito</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: '#f6f6fa' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tudo que você precisa para crescer
            </h2>
            <p className="text-xl text-muted-foreground">
              Recursos completos para gestão do seu e-commerce
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Integrações Completas", description: "Conecte com Mercado Livre, Shopee, Shein e outros marketplaces" },
              { title: "Relatórios Avançados", description: "Análises detalhadas para tomada de decisão inteligente" },
              { title: "Fluxo de Caixa", description: "Controle total das suas receitas e despesas" },
              { title: "Gestão de Clientes", description: "CRM integrado para relacionamento eficiente" },
              { title: "Suporte Prioritário", description: "Atendimento especializado quando você precisar" },
              { title: "Backup Automático", description: "Seus dados sempre seguros e protegidos" }
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Perguntas frequentes sobre planos
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossos planos e preços
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#f6f6fa' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Teste gratuitamente por 7 dias. Não é necessário cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/registrar">Começar teste gratuito</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/produto">Conhecer o produto</Link>
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
                <li><Link to="/central-ajuda" className="hover:text-background transition-colors">Central de Ajuda</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/sobre-nos" className="hover:text-background transition-colors">Sobre nós</Link></li>
                <li><Link to="/politica-privacidade" className="hover:text-background transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/termos-uso" className="hover:text-background transition-colors">Termos de Uso</Link></li>
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

export default Planos;