import { Clock, GraduationCap, Users, Sparkles, Building2, Heart } from "lucide-react";

const pilares = [
  {
    icon: Clock,
    title: "Flexibilidade real",
    text: "Você organiza sua agenda. Consegue levar e buscar na escola, ir ao médico, estar presente — e ainda construir uma carreira sólida.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento do zero",
    text: "Não precisa saber nada sobre mercado imobiliário. A RE/MAX tem método, escola própria e processo passo a passo.",
  },
  {
    icon: Users,
    title: "Ambiente acolhedor",
    text: "Equipe que respeita sua história, suas múltiplas responsabilidades e o seu ritmo. Você não está sozinha.",
  },
  {
    icon: Sparkles,
    title: "Mentoria de quem já chegou lá",
    text: "Você aprende com mulheres que estão fazendo +46 vendas/ano e entrando no Clube do Milhão. Modelo que funciona.",
  },
  {
    icon: Building2,
    title: "Marca forte e global",
    text: "RE/MAX é a maior rede imobiliária do mundo. Você empresta credibilidade desde o primeiro dia.",
  },
  {
    icon: Heart,
    title: "Renda que transforma a casa",
    text: "Escola particular dos filhos, viagens em família, sua independência. Renda direta no que importa pra você.",
  },
];

export const AViradaRemax = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">A virada</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          O que <span className="text-gradient-cta">muda</span> quando você entra na RE/MAX
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pilares.map((p) => (
          <div
            key={p.title}
            className="reveal group rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
              <p.icon className="h-6 w-6" />
            </span>
            <h3 className="mb-2 font-display text-lg font-bold text-foreground">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
