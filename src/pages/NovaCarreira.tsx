import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FormSection } from "@/components/landing/FormSection";
import { HeroMulheres } from "@/components/landing/nova-carreira/HeroMulheres";
import { VoceSeReconhece } from "@/components/landing/nova-carreira/VoceSeReconhece";
import { HistoriasReais } from "@/components/landing/nova-carreira/HistoriasReais";
import { AViradaRemax } from "@/components/landing/nova-carreira/AViradaRemax";
import { ConquistasPossiveis } from "@/components/landing/nova-carreira/ConquistasPossiveis";
import { UnicaEscolhaStats } from "@/components/landing/UnicaEscolhaStats";
import { MitosQueTravam } from "@/components/landing/nova-carreira/MitosQueTravam";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const TITLE = "Recomeçar a carreira na RE/MAX — para mães que querem flexibilidade";
const DESCRIPTION =
  "Mulheres que pausaram a carreira estão construindo +46 vendas/ano e entrando no Clube do Milhão na RE/MAX. Flexibilidade, treinamento do zero e independência financeira.";

const NovaCarreira = () => {
  useRevealOnScroll();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      const prev = el.content;
      el.content = content;
      return () => {
        el!.content = prev;
      };
    };

    const restoreDesc = setMeta("description", DESCRIPTION);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const created = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const prevHref = canonical.href;
    canonical.href = `${window.location.origin}/nova-carreira`;

    return () => {
      document.title = prevTitle;
      restoreDesc();
      if (created) canonical?.remove();
      else if (canonical) canonical.href = prevHref;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroMulheres />
        <VoceSeReconhece />
        <HistoriasReais />
        <AViradaRemax />
        <ConquistasPossiveis />
        <MitosQueTravam />
        <FormSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default NovaCarreira;
