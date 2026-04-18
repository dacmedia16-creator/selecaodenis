
The user uploaded the official "RE/MAX Única Escolha" unit logo (with "IMOBILIÁRIA" on top and "CRECI 29886-J" badge). This is the proper unit branding and should replace the current text-based "RE/MAX + Denis Souza" combo in the header and footer.

## Plan

1. **Save asset** — copy `user-uploads://Logo_REMAX_Unica.png` to `src/assets/remax-unica-escolha.png`.

2. **Refactor `RemaxLogo.tsx`** — replace the balloon+wordmark composition with the official unit logo image. Keep the `variant` prop:
   - `dark` (default): logo as-is on light backgrounds (header)
   - `light`: same logo wrapped in a subtle white-tinted container, OR use CSS `brightness-0 invert` filter so it reads on dark backgrounds (footer). Since the logo has gray "IMOBILIÁRIA" and "CRECI" text that won't read on dark, use `brightness-0 invert` for the light variant to render it fully white.
   - Drop `showWordmark` prop (no longer needed — logo is self-contained).

3. **Update `Header.tsx`** — the unit logo already contains "RE/MAX Única Escolha" text, so:
   - Remove the redundant "Denis Souza · Única Escolha · Sorocaba/SP" sidecar text (now duplicates the logo).
   - Replace with just "Denis Souza · Sorocaba/SP" as a smaller subtitle to keep the personal anchor.
   - Increase logo height (h-12 to h-14) since it's wider/taller proportionally.

4. **Footer** — `RemaxLogo variant="light"` will pick up the inverted version automatically.

5. **Keep the balloon** in `Hero.tsx` (floating decorative element) and `Proof.tsx` (watermark) — they serve a different purpose (brand iconography vs unit identification).

6. **CRECI compliance** — the logo includes "CRECI 29886-J" which is a regulatory requirement, so keeping it visible in header + footer is a plus.

No backend or copy changes.
