import { Award, Star, TrendingUp, Trophy } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import balao from "@/assets/remax-balao.png";

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
      <div className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
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
      className="pointer-events-none absolute -right-16 top-1/2 hidden w-80 -translate-y-1/2 opacity-[0.07] md:block"
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

      <div className="reveal grid grid-cols-2 gap-8 lg:grid-cols-4">
        <Stat icon={TrendingUp} value={1} prefix="+R$ " suffix=" MM" label="em comissões" />
        <Stat icon={Award} value={2} suffix=" anos" label="de trajetória" />
        <Stat icon={Trophy} value={5} suffix="+" label="premiações" />
        <Stat icon={Star} value={100} suffix="%" label="alta performance" />
      </div>

      <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-3">
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
  </section>
);
