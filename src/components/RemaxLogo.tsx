import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RemaxLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Stylized RE/MAX wordmark with a balloon mark.
 * Replaceable with the official asset later.
 */
export const RemaxLogo = ({ className, variant = "dark" }: RemaxLogoProps) => {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg shadow-soft",
            isLight ? "bg-white" : "gradient-cta",
          )}
        >
          <Building2 className={cn("h-5 w-5", isLight ? "text-primary" : "text-white")} strokeWidth={2.5} />
        </div>
        <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-background" />
      </div>
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
    </div>
  );
};
