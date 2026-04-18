
The user uploaded another awards photo — Denis on stage with 4 other people, all holding RE/MAX balloon trophies in front of a big "REGIONAIS" backdrop. This is a great group/event shot complementing the existing solo photo with certificates.

## Plan

1. **Save asset** — copy `user-uploads://image-2.png` to `src/assets/denis-premiacoes-2.jpg`.

2. **Update `Proof.tsx`** — convert the single photo into a small 2-photo collage:
   - Keep the main solo certificate photo as the primary (larger) card on the left.
   - Add the new event photo as a smaller secondary card overlapping/offset (bottom-right of the primary), creating a layered "polaroid stack" feel.
   - On mobile: stack the two photos vertically (primary first, secondary below at ~70% width, slightly inset).
   - Both cards keep the rounded frame, white border, shadow.
   - Move the "1º lugar — Team Leader · 2º Tri 2022" badge to overlay the primary photo (as today).
   - Add a subtle caption tag on the secondary photo: "Premiação Regional · RE/MAX".

3. **No copy changes** elsewhere. Pure visual addition.
