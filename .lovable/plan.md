
The user uploaded the official RE/MAX hot air balloon logo and wants it integrated into the landing page, replacing the stylized placeholder.

## Plan

1. **Save the asset** — copy `user-uploads://Balão.png` to `src/assets/remax-balao.png` so it can be imported as an ES6 module.

2. **Update `RemaxLogo.tsx`** — replace the current `Building2` icon + custom wordmark with the official balloon image. Keep the component API (`className`, `variant`) so all usages keep working. The balloon already contains the RE/MAX wordmark, so we'll show:
   - Balloon image (h-10 to h-12)
   - Optional "RE/MAX" wordmark text alongside it for the header (since the wordmark inside the small balloon may not be very legible at icon size)

3. **Update `Hero.tsx`** — replace the fake floating "balloon" (the pulse-ring div with text) with the real PNG balloon, keeping the `animate-float` and a subtle glow. Make it slightly larger and visible on mobile too.

4. **Add subtle balloon accents** in 1-2 strategic points (decorative, low opacity) — e.g., faint balloon watermark in the "Proof" dark section — to reinforce brand presence elegantly without clutter.

5. **Footer** — the existing `RemaxLogo` usage will automatically pick up the new balloon.

No backend or copy changes. Pure visual asset integration.
