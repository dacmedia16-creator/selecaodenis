import { Quote } from "lucide-react";

export const Story = () => (
  <section className="relative py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />

    <div className="container max-w-5xl">
      <div className="reveal mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Minha história</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl text-balance">
          Não vim do mercado imobiliário.
          <br />
          <span className="text-gradient-cta">Construí minha carreira aqui.</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="reveal grid gap-6 md:grid-cols-3">
        {[
          {
            step: "01",
            title: "Comecei do zero",
            text: "Quando entrei na RE/MAX, eu não sabia nem o básico da profissão. Não entendia processos, não dominava a linguagem do mercado.",
          },
          {
            step: "02",
            title: "Apliquei o método",
            text: "Encontrei treinamento, metodologia e direcionamento para desenvolver minha carreira. Decidi aplicar com consistência e compromisso.",
          },
          {
            step: "03",
            title: "Resultados reais",
            text: "Em menos de 2 anos: + R$ 1 milhão em comissões, premiações, reconhecimento e a posição de corretor de alta performance.",
          },
        ].map((s) => (
          <div
            key={s.step}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mb-4 font-display text-5xl font-extrabold text-primary/10 transition-smooth group-hover:text-primary/20">
              {s.step}
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-foreground">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <div aria-hidden className="absolute right-0 top-0 h-1 w-0 gradient-cta transition-smooth group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="reveal mt-14 rounded-3xl gradient-dark p-8 text-white shadow-elegant md:p-12">
        <Quote className="mb-4 h-10 w-10 text-secondary" />
        <p className="font-display text-xl leading-snug text-white md:text-2xl text-balance">
          “Não é preciso começar pronto — é preciso estar no ambiente certo e colocar em prática o que funciona.”
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/20" />
          <span className="text-sm font-semibold tracking-wide text-white/90">Denis Souza</span>
        </div>
      </div>
    </div>
  </section>
);
