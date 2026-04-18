import { useEffect, useState } from "react";
import { CheckCircle2, Clock, MapPin, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import v1 from "@/assets/vendidos/vendido-1.jpg";
import v2 from "@/assets/vendidos/vendido-2.jpg";
import v3 from "@/assets/vendidos/vendido-3.jpg";
import v4 from "@/assets/vendidos/vendido-4.jpg";
import v5 from "@/assets/vendidos/vendido-5.jpg";
import v6 from "@/assets/vendidos/vendido-6.jpg";
import v7 from "@/assets/vendidos/vendido-7.jpg";
import v8 from "@/assets/vendidos/vendido-8.jpg";
import v9 from "@/assets/vendidos/vendido-9.jpg";

type Vendido = {
  src: string;
  alt: string;
  tempo: string;
  local: string;
};

const vendidos: Vendido[] = [
  { src: v1, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v2, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v3, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v4, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v5, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v6, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
  { src: v7, alt: "Imóvel vendido — IEPE Golf", tempo: "Vendido rápido", local: "IEPE Golf" },
  { src: v8, alt: "Imóvel vendido — Mont Blanc", tempo: "Vendido rápido", local: "Mont Blanc" },
  { src: v9, alt: "Imóvel vendido por Denis Souza", tempo: "Vendido rápido", local: "Sorocaba/SP" },
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
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {vendidos.map((item, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                      Vendido
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
            { icon: Clock, value: "24h", label: "venda mais rápida" },
            { icon: Home, value: "9+", label: "imóveis em destaque" },
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
