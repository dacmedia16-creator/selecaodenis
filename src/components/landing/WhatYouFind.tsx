import { Check } from "lucide-react";

const items = [
  "Oportunidade real de crescimento",
  "Ambiente profissional e estruturado",
  "Direcionamento claro de carreira",
  "Treinamento contínuo e prático",
  "Visão de longo prazo na profissão",
  "Possibilidade de evolução para quem quer performar",
];

export const WhatYouFind = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-5xl">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Aqui você encontra</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
            Mais que uma vaga: <span className="text-gradient-cta">um ambiente para crescer.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Aqui você não encontra apenas uma possibilidade de trabalho. Você encontra um ambiente para desenvolver
            carreira, crescer com mais direção e entender como alta performance se constrói na prática.
          </p>
        </div>

        <ul className="reveal grid gap-3">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-primary/30"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-cta text-white shadow-soft">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="pt-1 text-sm font-semibold text-foreground md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
