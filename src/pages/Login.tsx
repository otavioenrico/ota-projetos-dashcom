import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  TrendingUp, 
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de autenticação
    console.log("Login:", formData);
    // Simulando login bem-sucedido
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Aqui seria implementada a lógica de login com Google
    console.log("Login com Google");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">DashComm</span>
          </div>
          
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao site
            </Link>
          </Button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Image/Illustration */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-12 relative overflow-hidden">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">
                    Bem-vindo de volta!
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Acesse seu painel e continue gerenciando seu e-commerce com inteligência.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Vendas em alta</p>
                      <p className="text-sm text-muted-foreground">+25% este mês</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">R$</span>
                    </div>
                    <div>
                      <p className="font-medium">Faturamento</p>
                      <p className="text-sm text-muted-foreground">R$ 47.832 este mês</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-success/10 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold">Faça login</h1>
              <p className="text-muted-foreground mt-2">
                Entre na sua conta para acessar o painel
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Acesse sua conta</CardTitle>
                <CardDescription>
                  Digite suas credenciais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <EyeOff className="w-4 h-4" /> : 
                          <Eye className="w-4 h-4" />
                        }
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, rememberMe: checked as boolean}))
                        }
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Manter conectado
                      </Label>
                    </div>
                    
                    <a 
                      href="#" 
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>

                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar com Google
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground">
                Não tem uma conta?{" "}
                <Link to="/registrar" className="text-primary hover:underline font-medium">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;