import { Clock, Home, HeartCrack, CalendarX } from "lucide-react";

const dores = [
  {
    icon: Clock,
    title: "Você precisa estar presente em casa",
    text: "Escola integral, médico, atividades — sua rotina não cabe num CLT das 8 às 18.",
  },
  {
    icon: Home,
    title: "Você tem múltiplas responsabilidades",
    text: "Filhos, casa, família. Não dá pra colocar mais uma 'jornada engessada' na agenda.",
  },
  {
    icon: CalendarX,
    title: "Você está há anos fora do mercado",
    text: "Pausou a carreira, e hoje sente que o mercado anda rápido demais. Acha que ninguém vai te dar uma chance.",
  },
  {
    icon: HeartCrack,
    title: "Você quer sua independência de volta",
    text: "Quer escolher a escola dos filhos, viajar, ter sua renda — sem precisar pedir.",
  },
];

export const VoceSeReconhece = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-5xl">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Você não está sozinha</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl text-balance">
          Você se <span className="text-gradient-cta">reconhece</span> aqui?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Muitas mulheres que hoje são corretoras de sucesso na RE/MAX começaram exatamente assim.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {dores.map((d) => (
          <div
            key={d.title}
            className="reveal flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <d.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="mb-1 font-display text-lg font-bold text-foreground">{d.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
