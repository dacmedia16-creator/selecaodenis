import { Mail, MapPin, MessageCircle } from "lucide-react";
import { RemaxLogo } from "@/components/RemaxLogo";

export const Footer = () => (
  <footer className="border-t border-white/10 gradient-dark text-white/80">
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <RemaxLogo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Construindo carreiras de alta performance no mercado imobiliário com método e metodologia RE/MAX.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">Contato</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <MapPin className="h-4 w-4" />
              </span>
              RE/MAX Única Escolha · Sorocaba/SP
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <MessageCircle className="h-4 w-4" />
              </span>
              WhatsApp disponível via formulário
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Mail className="h-4 w-4" />
              </span>
              Contato via formulário
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">Privacidade</h4>
          <p className="text-sm leading-relaxed text-white/70">
            Seus dados serão utilizados apenas para contato sobre esta oportunidade. Não compartilhamos suas informações
            com terceiros.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
        <span>© {new Date().getFullYear()} Denis Souza · RE/MAX Única Escolha · Sorocaba/SP</span>
        <span>Todos os direitos reservados</span>
      </div>
    </div>
  </footer>
);
