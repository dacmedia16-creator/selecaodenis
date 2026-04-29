import { Trophy, GraduationCap, Plane, Wallet } from "lucide-react";

const conquistas = [
  {
    icon: Trophy,
    big: "+46",
    label: "vendas no ano",
    text: "Meta real alcançada por mulheres da nossa equipe.",
  },
  {
    icon: Wallet,
    big: "Clube",
    label: "do Milhão",
    text: "Mais de R$ 1 milhão em comissões — reconhecimento de alta performance.",
  },
  {
    icon: GraduationCap,
    big: "Escola",
    label: "particular dos filhos",
    text: "Paga com a sua renda, do seu trabalho, do seu jeito.",
  },
  {
    icon: Plane,
    big: "Viagens",
    label: "em família",
    text: "Independência financeira pra fazer o que sempre quis com quem você ama.",
  },
];

export const ConquistasPossiveis = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-dark" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,hsl(354_80%_49%/0.25),transparent_55%),radial-gradient(circle_at_80%_70%,hsl(215_100%_45%/0.25),transparent_55%)]"
    />

    <div className="container">
      <div className="reveal mb-14 text-center text-white">
        <span className="text-xs font-bold uppercase tracking-widest text-white/70">Conquistas possíveis</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl text-balance">
          O que sua nova carreira pode <span className="text-gradient-cta">construir</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Não são promessas. São resultados reais de mulheres que tomaram a decisão de recomeçar.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {conquistas.map((c) => (
          <div
            key={c.label}
            className="reveal rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-smooth hover:-translate-y-1 hover:bg-white/10"
          >
            <c.icon className="mb-4 h-8 w-8 text-secondary" />
            <p className="font-display text-3xl font-extrabold leading-none text-white md:text-4xl">{c.big}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-white/90">{c.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
