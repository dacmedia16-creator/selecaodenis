import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    <div aria-hidden className="absolute inset-0 -z-10 gradient-cta" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,hsl(0_0%_100%/0.18),transparent_50%),radial-gradient(circle_at_80%_70%,hsl(0_0%_100%/0.12),transparent_55%)]"
    />

    <div className="container max-w-4xl text-center">
      <div className="reveal">
        <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl text-balance">
          Sua próxima fase profissional pode começar agora.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          Se você já é corretor e quer crescer mais, ou deseja entrar no mercado imobiliário com treinamento,
          metodologia e oportunidade real de desenvolvimento — essa pode ser a chance de dar um novo passo na sua
          carreira.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Minha história é a prova de que começar do zero não impede ninguém de crescer. O que faz diferença é estar no
          ambiente certo e agir com consistência.
        </p>

        <div className="mt-10 flex justify-center">
          <a href="#formulario" className="inline-flex">
            <Button
              size="lg"
              className="h-14 bg-white px-8 text-base font-bold text-primary shadow-elegant hover:bg-white/95"
            >
              Quero conversar sobre essa oportunidade
              <ArrowRight className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);
