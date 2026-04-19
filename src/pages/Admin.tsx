import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Download, Loader2, LogOut, RefreshCw, Users } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  is_agent: boolean;
  attraction: string | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [agentFilter, setAgentFilter] = useState<"all" | "yes" | "no">("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    document.title = "Painel — Leads RE/MAX";
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("fetch leads:", error);
      toast.error("Erro ao carregar leads.");
    } else {
      setLeads(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (search) {
        const q = search.toLowerCase();
        const hit =
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.whatsapp.toLowerCase().includes(q);
        if (!hit) return false;
      }
      if (city && !l.city.toLowerCase().includes(city.toLowerCase())) return false;
      if (agentFilter === "yes" && !l.is_agent) return false;
      if (agentFilter === "no" && l.is_agent) return false;
      if (from) {
        const d = new Date(l.created_at);
        if (d < new Date(from + "T00:00:00")) return false;
      }
      if (to) {
        const d = new Date(l.created_at);
        if (d > new Date(to + "T23:59:59")) return false;
      }
      return true;
    });
  }, [leads, search, city, agentFilter, from, to]);

  const exportCSV = () => {
    if (filtered.length === 0) {
      toast.error("Nenhum lead para exportar.");
      return;
    }
    const headers = ["Nome", "WhatsApp", "E-mail", "Cidade", "Já é corretor", "Motivação", "Recebido em"];
    const rows = filtered.map((l) => [
      l.name,
      l.whatsapp,
      l.email,
      l.city,
      l.is_agent ? "Sim" : "Não",
      (l.attraction ?? "").replace(/\n/g, " "),
      format(new Date(l.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }),
    ]);
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((r) => r.map((c) => escape(String(c))).join(",")).join("\n");
    // BOM para Excel reconhecer UTF-8
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-remax-${format(new Date(), "yyyy-MM-dd-HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setAgentFilter("all");
    setFrom("");
    setTo("");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-cta text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-extrabold text-foreground">Painel de Leads</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total de leads" value={leads.length} />
          <StatCard label="Filtrados" value={filtered.length} />
          <StatCard
            label="Já corretores"
            value={leads.filter((l) => l.is_agent).length}
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="search">Buscar (nome, e-mail, WhatsApp)</Label>
              <Input
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite para buscar..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Sorocaba/SP"
              />
            </div>
            <div className="space-y-2">
              <Label>Corretor?</Label>
              <Select value={agentFilter} onValueChange={(v) => setAgentFilter(v as typeof agentFilter)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from">De</Label>
              <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">Até</Label>
              <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
            <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button size="sm" onClick={exportCSV} className="gradient-cta border-0 text-white">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              Nenhum lead encontrado com esses filtros.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Corretor</TableHead>
                    <TableHead>Motivação</TableHead>
                    <TableHead className="text-right">Recebido</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.name}</TableCell>
                      <TableCell>
                        <a
                          href={`https://wa.me/${l.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {l.whatsapp}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`mailto:${l.email}`} className="text-primary hover:underline">
                          {l.email}
                        </a>
                      </TableCell>
                      <TableCell>{l.city}</TableCell>
                      <TableCell>
                        {l.is_agent ? (
                          <Badge variant="default">Sim</Badge>
                        ) : (
                          <Badge variant="secondary">Não</Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground" title={l.attraction ?? ""}>
                        {l.attraction || "—"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right text-sm text-muted-foreground">
                        {format(new Date(l.created_at), "dd/MM/yy HH:mm", { locale: ptBR })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="mt-2 font-display text-3xl font-extrabold text-foreground">{value}</p>
  </div>
);

export default Admin;
