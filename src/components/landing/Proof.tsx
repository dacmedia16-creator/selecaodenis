import { Award, Star, TrendingUp, Trophy } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import balao from "@/assets/remax-balao.png";
import premiacoes from "@/assets/denis-premiacoes.jpg";

const Stat = ({
  icon: Icon,
  value,
  suffix,
  prefix,
  label,
}: {
  icon: typeof Award;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) => {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-secondary backdrop-blur">
        <Icon className="h-6 w-6" />
      </div>
      <div className="font-display text-4xl font-extrabold text-white md:text-5xl">
        {prefix}
        <span ref={ref}>{current}</span>
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/70">{label}</div>
    </div>
  );
};

export const Proof = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-dark" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(354_80%_49%/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(215_100%_45%/0.18),transparent_55%)]"
    />
    <img
      aria-hidden
      src={balao}
      alt=""
      className="pointer-events-none absolute -right-16 top-10 hidden w-64 opacity-[0.04] md:block"
    />

    <div className="container">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Prova & Autoridade</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-5xl text-balance">
          Resultados que falam por si.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Uma trajetória construída com método, consistência e o ambiente certo.
        </p>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="reveal relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur">
            <img
              src={premiacoes}
              alt="Denis Souza segurando troféus e certificados de premiações da RE/MAX Única Escolha"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground shadow-lg">
                <Trophy className="h-3.5 w-3.5" />
                1º lugar — Team Leader · 2º Tri 2022
              </div>
              <p className="mt-2 text-sm font-medium text-white/90">
                Reconhecimento entre os destaques da RE/MAX Única Escolha.
              </p>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="grid grid-cols-2 gap-8">
            <Stat icon={TrendingUp} value={1} prefix="+R$ " suffix=" MM" label="em comissões" />
            <Stat icon={Award} value={2} suffix=" anos" label="de trajetória" />
            <Stat icon={Trophy} value={5} suffix="+" label="premiações" />
            <Stat icon={Star} value={100} suffix="%" label="alta performance" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Top Producer", "Reconhecimento Interno", "Crescimento Consistente", "Metodologia RE/MAX"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
