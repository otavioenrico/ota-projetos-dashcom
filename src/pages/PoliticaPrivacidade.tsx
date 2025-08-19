import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const PoliticaPrivacidade = () => {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-muted-foreground">
            Última atualização: 19 de agosto de 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                A DashComm ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos 
                suas informações quando você usa nosso serviço de gestão de e-commerce.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">2.1 Informações Pessoais</h4>
                <p className="text-muted-foreground">
                  Coletamos informações que você nos fornece diretamente, como:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Nome completo e informações de contato</li>
                  <li>Endereço de email</li>
                  <li>Informações da empresa</li>
                  <li>Dados de pagamento (processados por terceiros seguros)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.2 Dados Comerciais</h4>
                <p className="text-muted-foreground">
                  Para fornecer nossos serviços, coletamos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Dados de vendas e transações</li>
                  <li>Informações de clientes e fornecedores</li>
                  <li>Dados financeiros e de estoque</li>
                  <li>Integrações com marketplaces</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.3 Informações Técnicas</h4>
                <p className="text-muted-foreground">
                  Automaticamente coletamos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Endereço IP e dados de localização</li>
                  <li>Tipo de navegador e dispositivo</li>
                  <li>Logs de uso da plataforma</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Como Usamos suas Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar transações e pagamentos</li>
                <li>Enviar comunicações importantes sobre sua conta</li>
                <li>Oferecer suporte técnico</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Analisar e melhorar o desempenho da plataforma</li>
                <li>Enviar atualizações de produto (com seu consentimento)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Compartilhamento de Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Não vendemos suas informações pessoais. Compartilhamos dados limitados apenas quando:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Necessário para fornecer nossos serviços</li>
                <li>Com provedores de serviços confiáveis (sob contrato de confidencialidade)</li>
                <li>Para cumprir requisitos legais</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas de segurança robustas:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Criptografia SSL/TLS para dados em trânsito</li>
                <li>Criptografia AES-256 para dados em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups seguros e regulares</li>
                <li>Testes de penetração regulares</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar exclusão de dados</li>
                <li>Revogar consentimento</li>
                <li>Portabilidade dos dados</li>
                <li>Informações sobre uso e compartilhamento</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para exercer esses direitos, entre em contato conosco através do email: 
                <strong> privacidade@dashcomm.com</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Utilizamos cookies para melhorar sua experiência. Você pode gerenciar preferências 
                de cookies através das configurações do seu navegador. Alguns cookies são essenciais 
                para o funcionamento da plataforma.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mantemos seus dados pelo tempo necessário para fornecer nossos serviços e cumprir 
                obrigações legais. Após o cancelamento da conta, dados pessoais são excluídos 
                em até 90 dias, exceto quando exigido por lei.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Podemos atualizar esta política ocasionalmente. Notificaremos sobre mudanças 
                significativas através do email ou da plataforma. O uso continuado após as 
                alterações constitui aceitação da nova política.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Para dúvidas sobre esta política ou exercer seus direitos:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> privacidade@dashcomm.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Encarregado de Dados:</strong> contato@dashcomm.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 pt-8 border-t">
          <Button asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </div>

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

export default PoliticaPrivacidade;