
The user uploaded a real photo of Denis holding 2 RE/MAX balloon trophies and 4+ certificates ("CERTIFICADO Denis Fabio de Souza · RE/MAX ÚNICA ESCOLHA · 1º lugar em Team Leader · 2º Trimestre 2022"). This is gold for the **Proof** section — it's authentic social proof of the awards mentioned in the copy.

## Plan

1. **Save asset** — copy `user-uploads://IMG_5273.JPEG` to `src/assets/denis-premiacoes.jpg`.

2. **Update `Proof.tsx`** — currently the section is text-only (stats + tags) on a dark gradient. Add the awards photo as a visual anchor:
   - Restructure the layout to a 2-column grid on desktop (`lg:grid-cols-[1fr_1.1fr]`): photo on the left, stats + tags on the right.
   - Keep the section heading at the top, full-width.
   - Frame the photo in a rounded card (`rounded-3xl`) with a subtle white border and elegant shadow, plus a small floating badge overlay like "1º lugar — Team Leader · 2º Tri 2022" to make the certificate context legible even if the text in the photo isn't readable.
   - On mobile: photo stacks above the stats, slightly smaller.
   - Keep the decorative balloon watermark but reduce its prominence so it doesn't compete with the real photo.

3. **No changes** to Hero, Story, or other sections — the awards photo belongs specifically in the Proof/Authority section.

Technical: pure visual update to one component, ES6 import of the new asset, responsive grid with Tailwind. No copy, backend, or layout changes elsewhere.
