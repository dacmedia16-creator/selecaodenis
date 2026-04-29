import { Quote } from "lucide-react";

const historias = [
  {
    label: "A mãe que precisava de flexibilidade",
    quote:
      "Tinha dois filhos em escola integral e achava impossível ter uma carreira de verdade. Precisava de uma rotina que não me prendesse das 8 às 18. Na RE/MAX descobri que podia organizar meu tempo do meu jeito — fechei mais de 46 vendas no último ano e hoje pago a escola particular dos meus filhos com o meu trabalho.",
    highlight: "+46 vendas no ano",
  },
  {
    label: "A que entrou para o Clube do Milhão",
    quote:
      "Passei anos achando que era 'só mãe'. Quando entrei na RE/MAX, não sabia nada do mercado imobiliário. Apliquei o método, confiei no processo e em pouco tempo entrei para o Clube do Milhão. Hoje viajo com a minha família sem precisar pedir autorização pra ninguém.",
    highlight: "Clube do Milhão",
  },
  {
    label: "A que recuperou a independência",
    quote:
      "Estava há mais de 8 anos fora do mercado de trabalho. Achei que ninguém ia me dar uma chance. A RE/MAX me deu treinamento, estrutura e um ambiente que respeita as minhas múltiplas responsabilidades. Hoje tenho minha renda, minhas escolhas e minha liberdade de volta.",
    highlight: "Independência total",
  },
];

export const HistoriasReais = () => (
  <section id="historias" className="relative py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-soft" />
    <div className="container max-w-6xl">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Histórias reais</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Mulheres que <span className="text-gradient-cta">recomeçaram aqui</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Trajetórias reais de corretoras da nossa equipe. Por respeito à privacidade, preservamos seus nomes — mas
          os números e as conquistas são reais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {historias.map((h) => (
          <article
            key={h.label}
            className="reveal group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <Quote className="mb-4 h-8 w-8 text-secondary/70" />
            <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground">{h.quote}</p>
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h.label}</p>
              <p className="mt-1 font-display text-base font-bold text-gradient-cta">{h.highlight}</p>
            </div>
            <div
              aria-hidden
              className="absolute right-0 top-0 h-1 w-0 gradient-cta transition-smooth group-hover:w-full"
            />
          </article>
        ))}
      </div>

      <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm italic text-muted-foreground">
        A próxima história pode ser a sua.
      </p>
    </div>
  </section>
);
