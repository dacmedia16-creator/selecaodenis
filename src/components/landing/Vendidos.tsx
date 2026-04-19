import { useEffect, useState } from "react";
import { Clock, MapPin, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import vSaintTropez from "@/assets/vendidos/vendido-saint-tropez.png";
import vLessence from "@/assets/vendidos/vendido-lessence.png";
import vLessenceVaranda from "@/assets/vendidos/vendido-lessence-varanda.png";
import vSoleilQuebec from "@/assets/vendidos/vendido-soleil-quebec.png";

type Vendido = {
  src: string;
  alt: string;
  tempo: string;
  local: string;
};

const vendidos: Vendido[] = [
  {
    src: vSaintTropez,
    alt: "Apartamento Saint Tropez vendido por Denis Souza",
    tempo: "Vendido em 120 dias",
    local: "Campolim, Sorocaba/SP",
  },
  {
    src: vLessence,
    alt: "L'Essence Campolim vendido por Denis Souza",
    tempo: "Vendido em 150 dias",
    local: "Campolim, Sorocaba/SP",
  },
  {
    src: vLessenceVaranda,
    alt: "Apartamento L'Essence Campolim — varanda — vendido por Denis Souza",
    tempo: "Mais um vendido",
    local: "Campolim, Sorocaba/SP",
  },
  {
    src: vSoleilQuebec,
    alt: "Apartamento Soleil de Québec vendido por Denis Souza",
    tempo: "Vendido em 10 dias",
    local: "Campolim, Sorocaba/SP",
  },
];

export const Vendidos = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.06),transparent_55%),radial-gradient(circle_at_80%_90%,hsl(var(--secondary)/0.08),transparent_55%)]"
      />

      <div className="container">
        <div className="reveal mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Resultados Reais
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
            Imóveis vendidos em <span className="text-gradient-cta">tempo recorde</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Do anúncio à venda — em dias, não meses. Estratégia, posicionamento e ação.
          </p>
        </div>

        <div className="reveal relative">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="mx-auto w-full max-w-5xl"
          >
            <CarouselContent className="-ml-4">
              {vendidos.map((item, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2">
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 h-10 w-10 border-border bg-background/90 text-foreground shadow-card hover:bg-background md:-left-6" />
            <CarouselNext className="right-2 h-10 w-10 border-border bg-background/90 text-foreground shadow-card hover:bg-background md:-right-6" />
          </Carousel>

          {count > 0 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para slide ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="reveal mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, value: "120 dias", label: "tempo médio de venda" },
            { icon: Home, value: "2", label: "imóveis em destaque" },
            { icon: MapPin, value: "Sorocaba/SP", label: "região de atuação" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-cta text-white shadow-soft">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-extrabold text-foreground leading-none">
                  {value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
