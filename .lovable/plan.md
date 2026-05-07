## Objetivo
Usar a imagem enviada (mãe com filhos + RE/MAX) na landing `/nova-carreira`, substituindo a foto atual do Hero.

## Passos
1. Copiar `user-uploads://ChatGPT_Image_7_de_mai._de_2026_16_13_19.png` para `src/assets/recomeco-mae-filhos.png`.
2. Em `src/components/landing/nova-carreira/HeroMulheres.tsx`:
   - Trocar o import `mulheres-remax.png` pela nova imagem.
   - Atualizar o `alt` para "Mãe e filhos — recomeço de carreira na RE/MAX".
   - Como a nova imagem já contém o balão RE/MAX, remover o `<img>` flutuante do balão para não duplicar.
   - Ajustar o aspect ratio do container (a imagem é vertical ~4/5) trocando `aspect-[4/3]` por `aspect-[4/5]` e `object-cover` mantido.

Sem mudanças em outras páginas.

## Pergunta
Confirma que a imagem deve substituir a foto do Hero da página `/nova-carreira` (e não ser adicionada em outra seção)?