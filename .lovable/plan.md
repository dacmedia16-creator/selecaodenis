
The user uploaded their real professional photo (Denis with arms crossed, blazer, transparent/white background) to replace the AI-generated placeholder in the Hero section.

## Plan

1. **Save asset** — copy `user-uploads://DenisfotoBanner.png` to `src/assets/denis-real.png`.

2. **Update `Hero.tsx`** — swap the import from `denis-hero.jpg` to the new `denis-real.png`. Since this photo has a transparent/white background and shows Denis from waist-up with arms crossed (different framing than the previous AI photo), adjust the presentation:
   - Replace the `aspect-[4/5]` cropped frame with a layout that showcases the cutout figure better.
   - Use a gradient backdrop (azul→vermelho RE/MAX) behind the photo so the transparent PNG pops.
   - Keep `object-contain` instead of `object-cover` to avoid cropping the head/arms.
   - Keep the floating location badge ("Sorocaba/SP"), the "Denis Souza · RE/MAX Única Escolha" info card, and the floating balloon — they all remain valuable.
   - Slight adjustments: anchor photo to bottom of frame so the figure "stands" on the info card naturally.

3. **Optionally add subtle photo accent in `Story.tsx`** — the storytelling section currently has no portrait; a smaller version of the real photo could reinforce the narrative. Will skip for now to keep scope tight (can add later if user requests).

4. **Cleanup** — keep the old `denis-hero.jpg` file untouched (no need to delete; harmless).

No backend, copy, or layout structure changes beyond the Hero photo treatment.
