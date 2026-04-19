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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  ChevronDown,
  Download,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const activeFilterCount =
    (city ? 1 : 0) + (agentFilter !== "all" ? 1 : 0) + (from ? 1 : 0) + (to ? 1 : 0);

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
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-remax-${format(new Date(), "yyyy-MM-dd-HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string, name: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      console.error("delete lead:", error);
      toast.error("Erro ao excluir lead.");
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success(`Lead de ${name} excluído.`);
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
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-cta text-white md:h-10 md:w-10">
              <Users className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-display text-base font-extrabold text-foreground md:text-lg">
                Painel de Leads
              </h1>
              <p className="truncate text-[11px] text-muted-foreground md:text-xs">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="shrink-0"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl space-y-4 px-3 py-4 md:space-y-6 md:px-4 md:py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <StatCard label="Total" fullLabel="Total de leads" value={leads.length} />
          <StatCard label="Filtrados" fullLabel="Filtrados" value={filtered.length} />
          <StatCard
            label="Corretores"
            fullLabel="Já corretores"
            value={leads.filter((l) => l.is_agent).length}
          />
        </div>

        {/* Search + filters */}
        <div className="rounded-2xl border border-border bg-card p-3 md:p-6">
          <div className="space-y-3">
            <Input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail ou WhatsApp..."
              className="h-11"
            />

            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <div className="flex items-center justify-between gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-2 md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">
                        {activeFilterCount}
                      </Badge>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <div className="ml-auto flex items-center gap-2">
                  {(search || activeFilterCount > 0) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
                      Limpar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={fetchLeads}
                    disabled={loading}
                    className="h-9 w-9"
                    aria-label="Atualizar"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>

              <CollapsibleContent className="md:!block">
                <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs">Cidade</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Sorocaba/SP"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Corretor?</Label>
                    <Select
                      value={agentFilter}
                      onValueChange={(v) => setAgentFilter(v as typeof agentFilter)}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="yes">Sim</SelectItem>
                        <SelectItem value="no">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="from" className="text-xs">De</Label>
                    <Input
                      id="from"
                      type="date"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="to" className="text-xs">Até</Label>
                    <Input
                      id="to"
                      type="date"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Mobile: cards / Desktop: table */}
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            Nenhum lead encontrado com esses filtros.
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((l) => (
                <LeadCard key={l.id} lead={l} onDelete={handleDelete} />
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden rounded-2xl border border-border bg-card md:block">
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
                      <TableHead className="w-12 text-right">Ações</TableHead>
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
                        <TableCell
                          className="max-w-xs truncate text-muted-foreground"
                          title={l.attraction ?? ""}
                        >
                          {l.attraction || "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right text-sm text-muted-foreground">
                          {format(new Date(l.created_at), "dd/MM/yy HH:mm", { locale: ptBR })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DeleteLeadDialog lead={l} onDelete={handleDelete} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Sticky mobile export bar */}
      {!loading && filtered.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:hidden">
          <Button
            onClick={exportCSV}
            className="h-11 w-full gradient-cta border-0 text-white"
          >
            <Download className="h-4 w-4" />
            Exportar {filtered.length} lead{filtered.length === 1 ? "" : "s"} (CSV)
          </Button>
        </div>
      )}

      {/* Desktop export button (inside content area) */}
      {!loading && filtered.length > 0 && (
        <div className="mx-auto hidden max-w-7xl px-4 pb-6 md:block">
          <div className="flex justify-end">
            <Button onClick={exportCSV} size="sm" className="gradient-cta border-0 text-white">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

const StatCard = ({
  label,
  fullLabel,
  value,
}: {
  label: string;
  fullLabel: string;
  value: number;
}) => (
  <div className="rounded-2xl border border-border bg-card p-3 md:p-5">
    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground md:text-xs">
      <span className="md:hidden">{label}</span>
      <span className="hidden md:inline">{fullLabel}</span>
    </p>
    <p className="mt-1 font-display text-2xl font-extrabold text-foreground md:mt-2 md:text-3xl">
      {value}
    </p>
  </div>
);

const LeadCard = ({
  lead,
  onDelete,
}: {
  lead: Lead;
  onDelete: (id: string, name: string) => void;
}) => {
  const wa = lead.whatsapp.replace(/\D/g, "");
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-foreground">{lead.name}</h3>
            {lead.is_agent ? (
              <Badge variant="default" className="shrink-0 text-[10px]">Corretor</Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0 text-[10px]">Lead</Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {format(new Date(lead.created_at), "dd 'de' MMM, HH:mm", { locale: ptBR })}
          </p>
        </div>
        <DeleteLeadDialog lead={lead} onDelete={onDelete} />
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{lead.city}</span>
        </div>
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{lead.whatsapp}</span>
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span className="truncate">{lead.email}</span>
        </a>
      </div>

      {lead.attraction && (
        <div className="mt-3 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Motivação
          </p>
          <p className="mt-1 text-sm text-foreground">{lead.attraction}</p>
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button asChild size="sm" className="h-10 gradient-cta border-0 text-white">
          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="h-10">
          <a href={`mailto:${lead.email}`}>
            <Mail className="h-4 w-4" />
            E-mail
          </a>
        </Button>
      </div>
    </article>
  );
};

const DeleteLeadDialog = ({
  lead,
  onDelete,
}: {
  lead: Lead;
  onDelete: (id: string, name: string) => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Excluir lead de ${lead.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Excluir este lead?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. O lead de <strong>{lead.name}</strong> ({lead.email}) será
          removido permanentemente.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onDelete(lead.id, lead.name)}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default Admin;
