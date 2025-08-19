import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { Upload, FileText } from "lucide-react";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

interface TransactionForm {
  type: "receita" | "despesa";
  amount: number;
  description: string;
  contact: string;
  platform: string;
  date: string;
  file?: FileList;
}

export function TransactionModal({ open, onOpenChange, onSubmit: onSubmitProp }: TransactionModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, watch, setValue, reset } = useForm<TransactionForm>({
    defaultValues: {
      type: "receita",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const watchType = watch("type");

  const onSubmit = async (data: TransactionForm) => {
    console.log("Transaction data:", data);
    
    if (onSubmitProp) {
      onSubmitProp(data);
    }
    
    onOpenChange(false);
    reset();
    setUploadedFile(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setValue("description", `Documento ${file.name.replace('.pdf', '')}`);
        setValue("amount", Math.floor(Math.random() * 1000) + 100);
        setValue("contact", "Fornecedor extraído do PDF");
        setValue("platform", "Plataforma detectada");
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium">Upload de PDF (Opcional)</p>
                <p className="text-sm text-muted-foreground">
                  Envie um PDF e nossa IA preencherá os dados automaticamente
                </p>
              </div>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Selecionar PDF
              </Button>
              
              {uploadedFile && (
                <div className="flex items-center gap-2 justify-center">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{uploadedFile.name}</span>
                  {isProcessing && (
                    <Badge variant="secondary">Processando...</Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Transaction Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                value={watchType} 
                onValueChange={(value) => setValue("type", value as "receita" | "despesa")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("amount", { required: true, valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição da transação"
              {...register("description", { required: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Contact */}
            <div className="space-y-2">
              <Label htmlFor="contact">
                {watchType === "receita" ? "Cliente" : "Fornecedor"}
              </Label>
              <Input
                id="contact"
                placeholder={watchType === "receita" ? "Nome do cliente" : "Nome do fornecedor"}
                {...register("contact", { required: true })}
              />
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform">Plataforma</Label>
              <Select onValueChange={(value) => setValue("platform", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mercado-livre">Mercado Livre</SelectItem>
                  <SelectItem value="shopee">Shopee</SelectItem>
                  <SelectItem value="shein">Shein</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="loja-fisica">Loja Física</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: true })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
                setUploadedFile(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Transação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}