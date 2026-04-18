
The user wants to add a new section showcasing sold properties ("Imóveis Vendidos") using the 9 marketing flyers they uploaded. These are real proof of sales — perfect tangible social proof to complement the awards section.

Looking at the images: they're vertical/square Brazilian real estate marketing flyers showing properties Denis sold, with "VENDIDO em X dias" stamps. They tell a powerful story: "I don't just have awards, I sell real properties — fast."

## Plan

**1. Save 9 assets** to `src/assets/vendidos/` (vendido-1.jpg through vendido-9.jpg).

**2. Create new component `src/components/landing/Vendidos.tsx`** — a carousel/marquee section between Proof and WhatYouFind:
   - Section header: eyebrow "Resultados Reais", title "Imóveis vendidos em tempo recorde", subtitle highlighting the speed (some sold in 24h, 10 days, 15 days).
   - Use the existing shadcn `carousel` component (already in project) showing flyers in cards — 1 per view on mobile, 2 on tablet, 3 on desktop. Loop enabled, autoplay-friendly spacing.
   - Each card: flyer image with rounded frame + subtle shadow + small badge overlay "VENDIDO" with the time-to-sell extracted (e.g., "24 horas", "10 dias", "15 dias", "45 dias", "90 dias", "120 dias", "150 dias", "Cannes Campolim", etc.).
   - Below the carousel: 3 quick stats highlighting record times — e.g., "24h" venda mais rápida · "9+" imóveis destacados · "Campolim" região de atuação.
   - Light background (matches Story/WhatYouFind tone) so it contrasts the dark Proof section above.

**3. Wire into `src/pages/Index.tsx`** — insert `<Vendidos />` right after `<Proof />` and before `<WhatYouFind />`.

**4. No copy changes** to other sections.

### Layout sketch

```text
┌──────────────────────────────────────────────┐
│           RESULTADOS REAIS                   │
│   Imóveis vendidos em tempo recorde          │
│   Do anúncio à venda — em dias, não meses.   │
│                                              │
│  ◀  ┌────┐  ┌────┐  ┌────┐  ▶               │
│     │flyer│ │flyer│ │flyer│                  │
│     │ 24h │ │ 10d │ │ 15d │                  │
│     └────┘  └────┘  └────┘                   │
│                                              │
│       24h  ·  9+ imóveis  ·  Sorocaba/SP     │
└──────────────────────────────────────────────┘
```

### Technical notes

- Reuse `@/components/ui/carousel` (Embla-based, already imported elsewhere).
- ES6 imports for the 9 images from `src/assets/vendidos/`.
- Reveal-on-scroll via existing `.reveal` class.
- Responsive: `basis-full md:basis-1/2 lg:basis-1/3`.
- Each card: `aspect-[4/5]` to handle the mostly-portrait flyer dimensions consistently with `object-cover`.
