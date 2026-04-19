import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Acesso restrito — Painel Denis";
  }, []);

  useEffect(() => {
    if (!loading && session) {
      if (isAdmin) navigate("/admin", { replace: true });
      else {
        toast.error("Esta conta não tem acesso ao painel.");
      }
    }
  }, [loading, session, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!email || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (error) {
      console.error("login error:", error);
      toast.error(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar. Tente novamente.",
      );
      return;
    }
    toast.success("Login realizado!");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <header className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full gradient-cta text-white">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">Acesso ao painel</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre com suas credenciais para gerenciar os leads.
          </p>
        </header>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full gradient-cta border-0 font-semibold text-white shadow-elegant"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
