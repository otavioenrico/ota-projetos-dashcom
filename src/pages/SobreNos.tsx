import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Heart,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const SobreNos = () => {
  const values = [
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Nossos clientes são o centro de tudo que fazemos. Desenvolvemos soluções pensando nas necessidades reais dos empreendedores."
    },
    {
      icon: Target,
      title: "Simplicidade",
      description: "Acreditamos que tecnologia deve ser simples e acessível. Criamos ferramentas intuitivas que qualquer pessoa pode usar."
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Estamos sempre buscando novas formas de melhorar e facilitar a gestão dos negócios dos nossos clientes."
    },
    {
      icon: Heart,
      title: "Transparência",
      description: "Construímos relacionamentos baseados na confiança, com comunicação clara e preços justos."
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
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sobre o DashComm
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nascemos para simplificar a gestão de e-commerce e empoderar empreendedores 
            a focarem no que realmente importa: fazer seus negócios crescerem.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Democratizar o acesso a ferramentas profissionais de gestão empresarial, 
                oferecendo soluções simples, eficientes e acessíveis para empreendedores 
                de todos os tamanhos.
              </p>
              <p className="text-lg text-muted-foreground">
                Acreditamos que todo negócio, independente do seu porte, merece ter acesso 
                às melhores ferramentas para crescer e prosperar no mercado digital.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Clientes Ativos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">R$ 50M+</div>
                  <p className="text-muted-foreground">Faturamento Gerenciado</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <p className="text-muted-foreground">Uptime</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Suporte</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Nossa História
            </h2>
            
            <div className="space-y-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">2023 - O Início</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    O DashComm nasceu da frustração de empreendedores que perdiam horas 
                    organizando planilhas e tentando entender o real desempenho de seus 
                    negócios online. Decidimos criar uma solução que juntasse tudo em um só lugar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">2024 - Crescimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Com o feedback dos primeiros usuários, expandimos nossa plataforma para 
                    incluir integrações com os principais marketplaces do Brasil e ferramentas 
                    avançadas de análise financeira.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Hoje - O Futuro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Continuamos inovando e expandindo nossas funcionalidades, sempre com foco 
                    na simplicidade e eficiência. Nosso objetivo é ser a ferramenta número 1 
                    para gestão de e-commerce no Brasil.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-muted-foreground">
              Os princípios que guiam nossa empresa e nossos produtos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Junte-se a Nós
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Faça parte da revolução na gestão de e-commerce. 
              Comece seu teste gratuito hoje mesmo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/registrar">
                  Começar Teste Gratuito
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/central-ajuda">
                  Falar com Nossa Equipe
                </Link>
              </Button>
            </div>
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

export default SobreNos;