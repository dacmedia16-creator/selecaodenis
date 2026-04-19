import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido")
    .max(20, "WhatsApp inválido")
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números"),
  email: z.string().trim().email("E-mail inválido").max(255),
  city: z.string().trim().min(2, "Informe sua cidade").max(80),
  isAgent: z.enum(["sim", "nao"], { required_error: "Selecione uma opção" }),
  attraction: z.string().trim().max(500).optional().or(z.literal("")),
});

type LeadFormData = z.infer<typeof leadSchema>;

// TODO: Replace with the real WhatsApp number once provided.
// Format: country code + DDD + number, digits only.
const WHATSAPP_NUMBER = "5515981788214";
const WHATSAPP_MESSAGE =
  "Olá, Denis! Acabei de ver sua página sobre a oportunidade na RE/MAX Única Escolha e quero saber mais sobre como posso fazer parte.";

export const LeadForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      isAgent: String(formData.get("isAgent") ?? "") as LeadFormData["isAgent"],
      attraction: String(formData.get("attraction") ?? ""),
    };

    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LeadFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Verifique os campos do formulário.");
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: parsed.data,
      });

      if (error || !data?.success) {
        console.error("submit-lead error:", error, data);
        toast.error("Não foi possível enviar agora. Tente novamente em instantes.");
        return;
      }

      setSubmitted(true);
      toast.success("Recebemos seus dados! Abrindo WhatsApp...");

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("submit-lead exception:", err);
      toast.error("Não foi possível enviar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-primary/15 bg-card p-10 text-center shadow-elegant">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full gradient-cta text-white shadow-elegant">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-extrabold text-foreground">Cadastro recebido!</h3>
        <p className="mt-3 text-muted-foreground">
          Em instantes nossa equipe entrará em contato. Se o WhatsApp não abriu automaticamente, clique no botão abaixo.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" className="mt-6 gradient-cta border-0 px-8 font-semibold text-white shadow-elegant">
            Abrir WhatsApp
          </Button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10">
      <div className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input id="name" name="name" placeholder="Seu nome" autoComplete="name" />
            {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              placeholder="(15) 99999-9999"
              inputMode="tel"
              autoComplete="tel"
            />
            {errors.whatsapp && <p className="text-xs font-medium text-destructive">{errors.whatsapp}</p>}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" name="email" type="email" placeholder="voce@email.com" autoComplete="email" />
            {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input id="city" name="city" placeholder="Sorocaba/SP" autoComplete="address-level2" />
            {errors.city && <p className="text-xs font-medium text-destructive">{errors.city}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Você já atua no mercado imobiliário? *</Label>
          <RadioGroup name="isAgent" className="flex gap-3">
            <label
              htmlFor="agent-sim"
              className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-smooth hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <RadioGroupItem value="sim" id="agent-sim" />
              <span className="font-medium text-foreground">Sim, sou corretor</span>
            </label>
            <label
              htmlFor="agent-nao"
              className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-smooth hover:border-secondary has-[:checked]:border-secondary has-[:checked]:bg-secondary/5"
            >
              <RadioGroupItem value="nao" id="agent-nao" />
              <span className="font-medium text-foreground">Não, quero entrar</span>
            </label>
          </RadioGroup>
          {errors.isAgent && <p className="text-xs font-medium text-destructive">{errors.isAgent}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="attraction">O que mais te chamou atenção nesta oportunidade? (opcional)</Label>
          <Textarea
            id="attraction"
            name="attraction"
            placeholder="Conte um pouco do que te motivou..."
            rows={3}
            maxLength={500}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-14 w-full gradient-cta border-0 text-base font-bold text-white shadow-elegant hover:opacity-95"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Quero ser contactado
            </>
          )}
        </Button>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Seus dados são utilizados apenas para contato sobre esta oportunidade.
        </p>
      </div>
    </form>
  );
};
