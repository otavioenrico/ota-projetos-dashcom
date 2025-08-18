import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Clock, 
  Target, 
  Zap,
  Star,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Homepage = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Economize Tempo",
      description: "Automatize tarefas repetitivas e foque no crescimento do seu negócio"
    },
    {
      icon: Target,
      title: "Decisões Inteligentes",
      description: "Relatórios em tempo real para decisões baseadas em dados"
    },
    {
      icon: Zap,
      title: "Integração Completa",
      description: "Conecte com Mercado Livre, Shopee e principais plataformas"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      business: "Loja de Roupas Online",
      content: "O DashComm revolucionou minha gestão financeira. Agora tenho controle total do meu fluxo de caixa!",
      rating: 5
    },
    {
      name: "João Santos",
      business: "E-commerce de Eletrônicos",
      content: "Economizo 3 horas por dia que antes gastava com planilhas. Recomendo demais!",
      rating: 5
    },
    {
      name: "Ana Costa",
      business: "Marketplace Multi-canal",
      content: "As integrações são perfeitas. Consigo acompanhar vendas de todas as plataformas em um só lugar.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Como funciona a integração com marketplaces?",
      answer: "O DashComm se conecta automaticamente com Mercado Livre, Shopee, Shein e outras plataformas, sincronizando vendas e saldos em tempo real."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seu acesso continuará até o final do período pago."
    },
    {
      question: "Os dados ficam seguros na plataforma?",
      answer: "Sim, utilizamos criptografia de ponta e servidores seguros. Seus dados financeiros estão protegidos com os mais altos padrões de segurança."
    },
    {
      question: "Preciso de conhecimento técnico para usar?",
      answer: "Não! O DashComm foi desenvolvido para ser intuitivo. Qualquer pessoa consegue usar, mesmo sem conhecimento técnico avançado."
    },
    {
      question: "Há limite de transações?",
      answer: "No plano gratuito há limitações. Nos planos pagos você tem acesso a transações ilimitadas e todas as funcionalidades."
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
            <Link to="/produto" className="text-foreground hover:text-primary transition-colors">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pare de perder tempo com planilhas.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Destrave a operação do seu e-commerce e dedique seu tempo com o que realmente importa.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/registrar">Crie sua conta gratuita agora</Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="aspect-video bg-background rounded-lg shadow-lg flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span>Vendas: +32%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>Lucro: +28%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary">R$ 47.832,00</p>
                    <p className="text-sm text-muted-foreground">Faturamento do mês</p>
                  </div>
                </div>
              </div>
              
              {/* Floating metrics */}
              <div className="absolute top-4 right-4 bg-background rounded-lg shadow-md p-3 animate-pulse">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="font-medium">+15% este mês</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-background rounded-lg shadow-md p-3 animate-pulse">
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="font-medium">127 vendas hoje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gerencie seu e-commerce com inteligência e praticidade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de quem transformou seu negócio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.business}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre o DashComm
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

export default Homepage;