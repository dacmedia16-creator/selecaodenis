import { cn } from "@/lib/utils";
import logoHorizontal from "@/assets/rmx-logo-horizontal.png.asset.json";

interface RemaxLogoProps {
  className?: string;
  /** Mantido por compatibilidade — o novo logo é colorido e funciona em fundos claros e escuros. */
  variant?: "light" | "dark";
}

/**
 * Logotipo oficial RecrutaMax (RMX) 2026.
 */
export const RemaxLogo = ({ className }: RemaxLogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoHorizontal.url}
        alt="RecrutaMax"
        width={220}
        height={88}
        className="h-14 w-auto object-contain md:h-16"
      />
    </div>
  );
};
