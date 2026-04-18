import { cn } from "@/lib/utils";
import logoUnica from "@/assets/remax-unica-escolha.png";

interface RemaxLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Official RE/MAX Única Escolha unit logo (includes CRECI 29886-J).
 * - `dark` (default): renders the logo as-is on light backgrounds.
 * - `light`: inverts the logo to pure white for dark backgrounds (footer).
 */
export const RemaxLogo = ({ className, variant = "dark" }: RemaxLogoProps) => {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoUnica}
        alt="RE/MAX Única Escolha — CRECI 29886-J"
        width={220}
        height={88}
        className={cn(
          "h-14 w-auto object-contain md:h-16",
          isLight && "brightness-0 invert",
        )}
      />
    </div>
  );
};
