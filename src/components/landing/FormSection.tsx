import { LeadForm } from "./LeadForm";

export const FormSection = () => (
  <section id="formulario" className="relative py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />
    <div className="container max-w-3xl">
      <div className="reveal mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Próximo passo</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Quero saber mais sobre <span className="text-gradient-cta">essa oportunidade</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Preencha seus dados e nossa equipe entrará em contato para apresentar melhor essa oportunidade.
        </p>
      </div>
      <div className="reveal">
        <LeadForm />
      </div>
    </div>
  </section>
);
