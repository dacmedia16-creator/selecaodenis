import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Clock } from "lucide-react";
import balao from "@/assets/remax-balao.png";

export const HeroMulheres = () => (
  <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,hsl(354_80%_49%/0.10),transparent_55%),radial-gradient(circle_at_85%_80%,hsl(215_100%_45%/0.10),transparent_55%)]"
    />
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />

    <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="reveal">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          <Heart className="h-3.5 w-3.5" />
          Para mulheres que querem recomeçar
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
          Você pausou a carreira pelos seus filhos.{" "}
          <span className="text-gradient-cta">Agora é a hora de recomeçar — do seu jeito.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Mulheres que ficaram anos fora do mercado estão construindo carreiras de sucesso na RE/MAX —
          com flexibilidade para a família, treinamento do zero e renda que transforma a vida em casa.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#formulario">
            <Button
              size="lg"
              className="h-14 w-full gradient-cta border-0 px-8 text-base font-semibold text-white shadow-elegant hover:opacity-95 sm:w-auto"
            >
              Quero saber como
            </Button>
          </a>
          <a href="#historias">
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full border-2 border-secondary/20 bg-background px-8 text-base font-semibold text-secondary hover:bg-secondary/5 sm:w-auto"
            >
              Ver histórias reais
            </Button>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Clock, label: "Rotina flexível para a família" },
            { icon: Sparkles, label: "Treinamento do zero" },
            { icon: Heart, label: "Independência financeira real" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2.5 backdrop-blur shadow-card"
            >
              <b.icon className="h-4 w-4 shrink-0 text-secondary" />
              <span className="text-xs font-medium leading-tight text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
        <div aria-hidden className="absolute -inset-6 -z-10 gradient-cta rounded-[2rem] opacity-20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-elegant gradient-cta p-10">
          <div className="relative flex flex-col items-center justify-center gap-6 text-center text-white">
            <img
              src={balao}
              alt="Balão RE/MAX"
              className="h-40 w-40 animate-float object-contain drop-shadow-[0_15px_30px_hsl(0_0%_0%/0.35)] md:h-56 md:w-56"
            />
            <div className="space-y-2">
              <p className="font-display text-2xl font-extrabold md:text-3xl">+46 vendas/ano</p>
              <p className="text-sm uppercase tracking-widest text-white/80">Resultados de mulheres da equipe</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 pt-4">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="font-display text-xl font-bold">Clube</p>
                <p className="text-xs text-white/80">do Milhão</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="font-display text-xl font-bold">Liberdade</p>
                <p className="text-xs text-white/80">de horários</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
