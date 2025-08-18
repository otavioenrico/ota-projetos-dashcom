import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  QrCode,
  Receipt,
  Check,
  Star
} from "lucide-react";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscriptionDialog({ open, onOpenChange }: SubscriptionDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const plans = [
    {
      id: "monthly",
      name: "Plano Mensal",
      price: "R$ 59",
      period: "/mês",
      description: "Ideal para começar",
      features: ["Acesso completo ao DashComm", "Suporte por email", "Relatórios básicos", "Até 1.000 transações/mês"]
    },
    {
      id: "annual",
      name: "Plano Anual",
      price: "R$ 560",
      period: "/ano",
      description: "Economize 20%",
      originalPrice: "R$ 708",
      features: ["Acesso completo ao DashComm", "Suporte prioritário", "Relatórios avançados", "Integrações ilimitadas", "Transações ilimitadas", "Backup automático"]
    }
  ];

  const paymentMethods = [
    { id: "credit", name: "Cartão de Crédito", icon: CreditCard },
    { id: "pix", name: "PIX", icon: QrCode },
    { id: "boleto", name: "Boleto Bancário", icon: Receipt },
  ];

  const handleSubscribe = () => {
    console.log("Processando assinatura:", { selectedPlan, paymentMethod, cardData });
    // Aqui você implementaria a lógica de processamento da assinatura
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Assinatura</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="plan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plan">Planos</TabsTrigger>
            <TabsTrigger value="payment">Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Escolha seu plano</h3>
              <p className="text-muted-foreground">
                Desbloqueie todo o potencial do DashComm
              </p>
            </div>

            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="relative">
                    <RadioGroupItem
                      value={plan.id}
                      id={plan.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={plan.id}
                      className="flex cursor-pointer"
                    >
                      <Card className="w-full peer-checked:ring-2 peer-checked:ring-primary transition-all">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {plan.name}
                                {plan.id === "annual" && (
                                  <Badge variant="secondary" className="bg-success text-success-foreground">
                                    <Star className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription>{plan.description}</CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">
                                {plan.price}
                                <span className="text-sm font-normal text-muted-foreground">
                                  {plan.period}
                                </span>
                              </div>
                              {plan.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  {plan.originalPrice}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-success" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Método de Pagamento</h3>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                        <method.icon className="w-4 h-4" />
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "credit" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cartão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData(prev => ({...prev, number: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="João Silva"
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Validade</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData(prev => ({...prev, expiry: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData(prev => ({...prev, cvv: e.target.value}))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "pix" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pagamento via PIX</p>
                      <p className="text-sm text-muted-foreground">
                        Após confirmar, você receberá o código PIX para pagamento
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "boleto" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Receipt className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Boleto Bancário</p>
                      <p className="text-sm text-muted-foreground">
                        Após confirmar, você receberá o boleto por email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedPlan === "monthly" ? "R$ 59/mês" : "R$ 560/ano (20% desconto)"}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubscribe}>
              Confirmar Assinatura
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}