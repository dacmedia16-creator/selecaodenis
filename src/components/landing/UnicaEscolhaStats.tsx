import { Building2, LineChart, Rocket, TrendingUp } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const AnimatedNumber = ({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const { ref, value: current } = useCountUp(value);
  return (
    <span className="font-display text-4xl font-extrabold leading-none text-white md:text-5xl">
      {prefix}
      <span ref={ref}>{current.toLocaleString("pt-BR")}</span>
      {suffix}
    </span>
  );
};

const stats = [
  {
    icon: Building2,
    render: () => <AnimatedNumber value={1500} />,
    label: "transações no ano passado",
  },
  {
    icon: TrendingUp,
    render: () => <AnimatedNumber value={140} prefix="R$ " suffix=" MI" />,
    label: "VGV — Valor Geral de Vendas",
  },
  {
    icon: LineChart,
    render: () => (
      <span className="font-display text-4xl font-extrabold leading-none text-white md:text-5xl">
        51–71<span className="text-secondary">%</span>
      </span>
    ),
    label: "crescimento no trimestre",
  },
  {
    icon: Rocket,
    render: () => <AnimatedNumber value={120} suffix="%" />,
    label: "projeção de crescimento em 2026",
  },
];

export const UnicaEscolhaStats = () => (
  <section className="relative isolate overflow-hidden py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-dark" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,hsl(215_100%_45%/0.20),transparent_55%),radial-gradient(circle_at_80%_70%,hsl(354_80%_49%/0.20),transparent_55%)]"
    />

    <div className="container">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">RE/MAX Única Escolha</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-5xl text-balance">
          Você entra em uma <span className="text-gradient-cta">unidade em pleno crescimento</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Não é uma promessa. São os números reais da unidade — e a curva continua subindo.
        </p>
      </div>

      <div className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-smooth hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-secondary backdrop-blur">
              <s.icon className="h-5 w-5" />
            </span>
            <div>{s.render()}</div>
            <p className="mt-3 text-sm font-medium leading-snug text-white/80">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm italic text-white/60">
        Resultados consolidados da RE/MAX Única Escolha — Sorocaba/SP.
      </p>
    </div>
  </section>
);
