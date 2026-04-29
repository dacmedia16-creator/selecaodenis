
# Usar a foto das 4 mulheres no Hero da página `/nova-carreira`

A foto enviada (4 mulheres profissionais sorrindo num escritório, com o desenho "Best Mom Ever" e porta-retrato dos filhos na mesa) é perfeita pro tom da página — representa exatamente o público: mães profissionais, equipe diversa, alta performance.

## O que muda

**Arquivo:** `src/components/landing/nova-carreira/HeroMulheres.tsx`

Substituir o card visual atual (balão grande + stats em fundo gradient) pela **foto real das mulheres**, mantendo a mesma estrutura visual da Hero do Denis (Index) — para consistência:

- Foto em card arredondado com borda e shadow elegante
- Overlay sutil de gradiente azul no rodapé pra integrar com a marca
- Badge flutuante no topo-esquerdo: "Sorocaba/SP"
- Card flutuante na base com: "Mulheres RE/MAX — Mães, profissionais, alta performance" + selo vermelho "+46 vendas/ano"
- Balão RE/MAX pequeno flutuando no canto superior direito (mantém identidade)

**Asset:** já copiei o arquivo para `src/assets/mulheres-remax.png` — só falta importar e usar.

## Não muda

- Toda a coluna de texto/CTAs do Hero permanece igual
- Resto da página (depoimentos, mitos, formulário, etc.) intacto
