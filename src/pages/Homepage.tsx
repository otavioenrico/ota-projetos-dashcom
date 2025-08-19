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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[560px]">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pare de perder tempo com planilhas.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Destrave a operação do seu e-commerce e dedique seu tempo com o que realmente importa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/registrar">Crie sua conta</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/produto">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/64dc1ce8-a8f2-47ea-859f-75ec16de3715.png" 
                alt="Profissional trabalhando com dashboard de vendas e notificações de faturamento" 
                className="w-full h-auto"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section style={{ backgroundColor: '#f6f6fa' }} className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Integrações com as principais plataformas
            </h2>
            <p className="text-lg text-muted-foreground">
              Conecte-se automaticamente com os marketplaces líderes do mercado
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-sm font-medium">Mercado Livre</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🛍️</div>
              <p className="text-sm font-medium">Shopee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👗</div>
              <p className="text-sm font-medium">Shein</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm font-medium">Amazon</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm font-medium">Tiny</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💼</div>
              <p className="text-sm font-medium">Bling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
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
      <section style={{ backgroundColor: '#f6f6fa' }} className="py-20">
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

export default Homepage;