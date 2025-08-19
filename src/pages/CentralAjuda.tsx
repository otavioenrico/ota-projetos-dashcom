import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin,
  Send,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CentralAjuda = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: 'suporte'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated form submission
    toast({
      title: "Mensagem enviada!",
      description: "Nossa equipe entrará em contato em até 24 horas.",
    });
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      type: 'suporte'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Central de Ajuda
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudar você a ter sucesso com o DashComm. Entre em contato conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Fale Conosco</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">contato@dashcomm.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Resposta em até 24 horas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Suporte Técnico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">suporte@dashcomm.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Para dúvidas técnicas e problemas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 9h às 12h</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Horário de Brasília
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      Localização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atendimento 100% online
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e nossa equipe entrará em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Solicitação *</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      required
                    >
                      <option value="suporte">Suporte Técnico</option>
                      <option value="vendas">Dúvidas sobre Vendas</option>
                      <option value="parcerias">Parcerias</option>
                      <option value="feedback">Feedback/Sugestões</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Resumo do seu problema ou dúvida"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descreva detalhadamente sua dúvida ou problema..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
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
              Respostas rápidas para as dúvidas mais comuns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Como funciona o teste gratuito?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Você tem 7 dias para testar todas as funcionalidades do DashComm gratuitamente. 
                  Não é necessário cartão de crédito para começar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim, você pode cancelar sua assinatura a qualquer momento sem taxas. 
                  Seu acesso continuará até o final do período pago.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meus dados ficam seguros?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim, utilizamos criptografia de ponta e servidores seguros. 
                  Seus dados estão protegidos com os mais altos padrões de segurança.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preciso de conhecimento técnico?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Não! O DashComm foi desenvolvido para ser intuitivo. 
                  Qualquer pessoa consegue usar, mesmo sem conhecimento técnico.
                </p>
              </CardContent>
            </Card>
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

export default CentralAjuda;