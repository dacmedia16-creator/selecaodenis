import { cn } from "@/lib/utils";
import balao from "@/assets/remax-balao.png";

interface RemaxLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

/**
 * Official RE/MAX hot-air balloon logo.
 */
export const RemaxLogo = ({ className, variant = "dark", showWordmark = true }: RemaxLogoProps) => {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={balao}
        alt="RE/MAX"
        width={48}
        height={48}
        className="h-10 w-auto object-contain drop-shadow-sm"
      />
      {showWordmark && (
        <div className="flex items-baseline gap-0.5 leading-none">
          <span
            className={cn(
              "font-display text-xl font-extrabold tracking-tight",
              isLight ? "text-white" : "text-primary",
            )}
          >
            RE
          </span>
          <span className={cn("font-display text-xl font-extrabold", isLight ? "text-white/60" : "text-foreground/40")}>
            /
          </span>
          <span
            className={cn(
              "font-display text-xl font-extrabold tracking-tight",
              isLight ? "text-white" : "text-secondary",
            )}
          >
            MAX
          </span>
        </div>
      )}
    </div>
  );
};
