import { Button } from "@/components/ui/button";
import { RemaxLogo } from "@/components/RemaxLogo";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-smooth",
        scrolled ? "bg-background/85 backdrop-blur-lg shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <div className="flex items-center gap-3">
          <RemaxLogo />
          <div className="hidden h-10 w-px bg-border md:block" />
          <div className="hidden flex-col leading-tight md:flex">
            <span className="font-display text-sm font-bold text-foreground">Denis Souza</span>
            <span className="text-xs text-muted-foreground">Sorocaba/SP</span>
          </div>
        </div>
        <a href="#formulario">
          <Button size="sm" className="gradient-cta border-0 font-semibold text-white shadow-elegant hover:opacity-95">
            Quero saber mais
          </Button>
        </a>
      </div>
    </header>
  );
};
