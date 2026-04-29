import { X, Check } from "lucide-react";

const mitos = [
  {
    mito: "Sou velha demais pra recomeçar.",
    verdade:
      "Mulheres 40+ são as que mais crescem na nossa equipe. Maturidade, escuta e relacionamento vendem imóvel.",
  },
  {
    mito: "Preciso ser vendedora nata.",
    verdade:
      "Não. Vender imóvel é processo. Aprende-se com método, treinamento e prática — passo a passo.",
  },
  {
    mito: "Estou há muito tempo fora do mercado.",
    verdade:
      "Aqui você começa do zero com suporte. O que conta é vontade de aprender, não o tempo do último carimbo na carteira.",
  },
  {
    mito: "Não tenho tempo, sou mãe.",
    verdade:
      "Justamente por isso. A flexibilidade da RE/MAX foi feita pra caber na sua rotina — não o contrário.",
  },
  {
    mito: "Não tenho dinheiro pra investir num negócio.",
    verdade:
      "Você não monta um negócio do zero. Entra numa estrutura pronta, com marca, sistema e equipe.",
  },
  {
    mito: "Vou ser cobrada como se fosse CLT.",
    verdade:
      "Você é dona do seu tempo e da sua agenda. As metas existem pra te puxar, não pra te prender.",
  },
];

export const MitosQueTravam = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-5xl">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Derrubando objeções</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Os mitos que <span className="text-gradient-cta">travam</span> mulheres incríveis
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {mitos.map((m) => (
          <div
            key={m.mito}
            className="reveal rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:shadow-elegant"
          >
            <div className="mb-3 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <X className="h-4 w-4" />
              </span>
              <p className="text-base font-semibold text-muted-foreground line-through decoration-destructive/40">
                "{m.mito}"
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-base font-medium leading-relaxed text-foreground">{m.verdade}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
