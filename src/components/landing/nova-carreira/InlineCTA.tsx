import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InlineCTAProps {
  headline?: string;
  buttonText?: string;
}

export const InlineCTA = ({
  headline = "Pronta para dar o próximo passo?",
  buttonText = "Quero saber como",
}: InlineCTAProps) => (
  <section className="py-10 md:py-14">
    <div className="container max-w-3xl">
      <div className="reveal flex flex-col items-center gap-5 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm md:flex-row md:justify-between md:p-8 md:text-left">
        <p className="font-display text-xl font-bold leading-snug text-foreground md:text-2xl">
          {headline}
        </p>
        <a href="#formulario" className="shrink-0">
          <Button
            size="lg"
            className="h-12 gradient-cta border-0 px-6 text-base font-semibold text-white shadow-elegant hover:opacity-95"
          >
            {buttonText}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </a>
      </div>
    </div>
  </section>
);
