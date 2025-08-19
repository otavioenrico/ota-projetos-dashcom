import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const TermosUso = () => {
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
            Termos de Uso
          </h1>
          <p className="text-lg text-muted-foreground">
            Última atualização: 19 de agosto de 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ao acessar ou usar o DashComm, você concorda em estar legalmente vinculado a estes 
                Termos de Uso. Se você não concordar com qualquer parte destes termos, não use nosso serviço.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Descrição do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O DashComm é uma plataforma de gestão de e-commerce que oferece ferramentas para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Controle financeiro e fluxo de caixa</li>
                <li>Gestão de clientes e fornecedores</li>
                <li>Integrações com marketplaces</li>
                <li>Relatórios e analytics</li>
                <li>Outras funcionalidades relacionadas à gestão empresarial</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Conta de Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">3.1 Criação de Conta</h4>
                <p className="text-muted-foreground">
                  Para usar nosso serviço, você deve criar uma conta fornecendo informações 
                  precisas e completas. Você é responsável por manter a confidencialidade 
                  de suas credenciais de acesso.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.2 Responsabilidades do Usuário</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Manter suas informações de conta atualizadas</li>
                  <li>Notificar imediatamente sobre uso não autorizado</li>
                  <li>Usar o serviço apenas para fins legais</li>
                  <li>Não compartilhar suas credenciais com terceiros</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Teste Gratuito e Pagamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">4.1 Teste Gratuito</h4>
                <p className="text-muted-foreground">
                  Oferecemos um teste gratuito de 7 dias. Após este período, é necessário 
                  assinar um plano pago para continuar usando o serviço.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4.2 Pagamentos</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Pagamentos são processados por terceiros seguros</li>
                  <li>Cobrança automática conforme plano escolhido</li>
                  <li>Valores em reais brasileiros (BRL)</li>
                  <li>Impostos aplicáveis incluídos quando aplicável</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4.3 Cancelamento</h4>
                <p className="text-muted-foreground">
                  Você pode cancelar sua assinatura a qualquer momento. O acesso continuará 
                  até o final do período pago. Não oferecemos reembolsos proporciais.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Uso Aceitável</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Você concorda em NÃO usar o serviço para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Atividades ilegais ou fraudulentas</li>
                <li>Violação de direitos de terceiros</li>
                <li>Envio de spam ou conteúdo malicioso</li>
                <li>Tentativas de acesso não autorizado</li>
                <li>Engenharia reversa ou cópia do serviço</li>
                <li>Sobrecarga intencional do sistema</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O DashComm e todo seu conteúdo são propriedade nossa ou de nossos licenciados. 
                Você recebe uma licença limitada e revogável para usar o serviço conforme estes termos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Privacidade e Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seus dados são tratados conforme nossa Política de Privacidade. Você mantém 
                propriedade sobre seus dados comerciais e pode exportá-los a qualquer momento.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Disponibilidade do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nos esforçamos para manter o serviço disponível 24/7, mas não garantimos 
                disponibilidade ininterrupta. Podemos realizar manutenções programadas 
                com aviso prévio quando possível.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O serviço é fornecido "como está". Não nos responsabilizamos por danos 
                indiretos, perda de lucros ou dados. Nossa responsabilidade total é 
                limitada ao valor pago pelos serviços nos últimos 12 meses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Podemos modificar estes termos a qualquer momento. Mudanças significativas 
                serão comunicadas com 30 dias de antecedência. O uso continuado após as 
                alterações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Rescisão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Podemos suspender ou encerrar sua conta por violação destes termos, 
                não pagamento, ou outras razões legítimas. Você pode encerrar sua 
                conta a qualquer momento através das configurações.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Lei Aplicável</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Estes termos são regidos pelas leis brasileiras. Disputas serão resolvidas 
                nos tribunais competentes do Brasil.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>13. Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Para dúvidas sobre estes termos:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> juridico@dashcomm.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Suporte:</strong> contato@dashcomm.com
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

export default TermosUso;