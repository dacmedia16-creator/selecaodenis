import { BookOpen, Building2, Compass, Flame, Rocket, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Treinamento e metodologia",
    text: "Conteúdo estruturado para acelerar sua evolução desde o primeiro dia.",
  },
  {
    icon: ShieldCheck,
    title: "Marca reconhecida",
    text: "Atue com a credibilidade de uma das maiores marcas imobiliárias do mundo.",
  },
  {
    icon: Flame,
    title: "Ambiente de alta performance",
    text: "Convivência diária com profissionais focados em resultado e crescimento.",
  },
  {
    icon: Rocket,
    title: "Cultura de crescimento",
    text: "Mentalidade de evolução contínua, com foco em desenvolvimento real.",
  },
  {
    icon: Building2,
    title: "Estrutura para sua carreira",
    text: "Suporte, processos e tecnologia para você construir com mais direção.",
  },
  {
    icon: Compass,
    title: "Oportunidade real",
    text: "Caminho claro para quem quer evoluir e performar de verdade.",
  },
];

export const Benefits = () => (
  <section className="relative py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />

    <div className="container">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Por que RE/MAX</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Por que a RE/MAX pode <span className="text-gradient-cta">acelerar sua carreira</span>
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl gradient-cta text-white shadow-elegant transition-bounce group-hover:scale-110">
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-lg font-bold text-foreground">{b.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
