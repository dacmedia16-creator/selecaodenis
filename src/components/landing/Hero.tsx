import { Button } from "@/components/ui/button";
import { Award, MapPin, Sparkles, TrendingUp, Trophy } from "lucide-react";
import denisHero from "@/assets/denis-hero.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
    {/* Decorative gradient blobs */}
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,hsl(215_100%_45%/0.10),transparent_55%),radial-gradient(circle_at_85%_80%,hsl(354_80%_49%/0.10),transparent_55%)]"
    />
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />

    <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* Copy */}
      <div className="reveal">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Recrutamento RE/MAX
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
          Comecei do <span className="text-gradient-cta">zero</span> e, em menos de 2 anos, ultrapassei{" "}
          <span className="text-gradient-cta">R$ 1 milhão</span> em comissões aplicando o modelo RE/MAX.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Se você já é corretor ou quer entrar no mercado, descubra como a RE/MAX pode acelerar sua carreira com
          treinamento, metodologia e oportunidade real de crescimento.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#formulario">
            <Button
              size="lg"
              className="h-14 w-full gradient-cta border-0 px-8 text-base font-semibold text-white shadow-elegant hover:opacity-95 sm:w-auto"
            >
              Quero saber mais
            </Button>
          </a>
          <a href="#formulario">
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full border-2 border-primary/20 bg-background px-8 text-base font-semibold text-primary hover:bg-primary/5 sm:w-auto"
            >
              Quero ser contactado
            </Button>
          </a>
        </div>

        {/* Proof badges */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: TrendingUp, label: "+ R$ 1MM em comissões" },
            { icon: Trophy, label: "Premiações" },
            { icon: Sparkles, label: "Trajetória do zero" },
            { icon: Award, label: "Alta performance" },
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

      {/* Photo */}
      <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
        <div aria-hidden className="absolute -inset-6 -z-10 gradient-cta rounded-[2rem] opacity-20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-card shadow-elegant">
          <img
            src={denisHero}
            alt="Denis Souza, corretor de imóveis na RE/MAX Única Escolha em Sorocaba/SP"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
          {/* Floating badge: location */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            <MapPin className="h-3.5 w-3.5" />
            Sorocaba/SP
          </div>
          {/* Bottom info card */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/95 p-4 shadow-elegant backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-bold text-foreground">Denis Souza</div>
                <div className="text-xs text-muted-foreground">RE/MAX Única Escolha</div>
              </div>
              <div className="rounded-lg gradient-red px-3 py-1.5 text-xs font-bold text-white shadow-red-glow">
                Alta Performance
              </div>
            </div>
          </div>
        </div>

        {/* Floating RE/MAX balloon */}
        <div className="absolute -right-3 -top-3 hidden h-20 w-20 animate-float md:block">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 gradient-red rounded-full shadow-red-glow animate-pulse-ring" />
            <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-white">
              <span className="font-display text-[10px] font-extrabold leading-none text-primary">RE</span>
              <span className="font-display text-[10px] font-extrabold leading-none text-secondary">MAX</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
