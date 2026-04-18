import { ArrowUpRight, Briefcase, Building2, CheckCircle2, GraduationCap, Sparkles, Target } from "lucide-react";

export const ForYou = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Oportunidade</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Essa oportunidade é <span className="text-gradient-cta">para você?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A RE/MAX abre as portas para quem quer crescer — independente de onde você está hoje.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1 - Corretores */}
        <div className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant md:p-10">
          <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Briefcase className="h-3.5 w-3.5" />
              Para corretores de imóveis
            </div>
            <h3 className="mb-3 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              Você quer crescer mais.
            </h3>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              Se você já atua no mercado e sente que pode ir além, esta é a oportunidade de estar em um ambiente com
              marca forte, metodologia, desenvolvimento constante e cultura de alta performance.
            </p>
            <ul className="space-y-3">
              {[
                { icon: ArrowUpRight, text: "Mais crescimento" },
                { icon: Target, text: "Mais direcionamento" },
                { icon: Sparkles, text: "Mais profissionalismo" },
                { icon: Building2, text: "Ambiente de performance" },
                { icon: CheckCircle2, text: "Força de marca global" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2 - Outras áreas */}
        <div className="group relative overflow-hidden rounded-3xl border border-secondary/10 bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant md:p-10">
          <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
              <GraduationCap className="h-3.5 w-3.5" />
              Para quem vem de outras áreas
            </div>
            <h3 className="mb-3 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              Você quer mudar de vida.
            </h3>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              Se você quer entrar no mercado imobiliário e construir uma nova carreira, essa pode ser o começo de uma
              nova fase. Não é preciso vir pronto — é preciso ter vontade de aprender, crescer e aplicar o método.
            </p>
            <ul className="space-y-3">
              {[
                { icon: ArrowUpRight, text: "Transição de carreira" },
                { icon: GraduationCap, text: "Aprendizado com método" },
                { icon: Sparkles, text: "Treinamento estruturado" },
                { icon: Target, text: "Desenvolvimento profissional" },
                { icon: CheckCircle2, text: "Nova oportunidade real" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);
