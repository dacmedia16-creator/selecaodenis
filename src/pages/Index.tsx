import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Story } from "@/components/landing/Story";
import { ForYou } from "@/components/landing/ForYou";
import { Benefits } from "@/components/landing/Benefits";
import { Proof } from "@/components/landing/Proof";
import { WhatYouFind } from "@/components/landing/WhatYouFind";
import { FormSection } from "@/components/landing/FormSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const Index = () => {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Story />
        <ForYou />
        <Benefits />
        <Proof />
        <WhatYouFind />
        <FormSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
