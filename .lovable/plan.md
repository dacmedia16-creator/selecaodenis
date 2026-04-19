
## Diagnóstico

A imagem mostra um espaço gigante em branco entre o formulário e o final da página. Confirmei a causa olhando o código:

- `FinalCTA` envolve todo o conteúdo num `<div class="reveal">` (opacity:0 inicial, vira opacity:1 quando ganha `.is-visible`).
- `useRevealOnScroll` roda **uma única vez no mount**, captura todos `.reveal` existentes e observa via IntersectionObserver.
- Problema: se o elemento `.reveal` for desmontado/remontado depois (ex: o `LeadForm` troca de markup quando `submitted=true`), ou se o usuário pular âncoras antes do JS rodar, o observer pode perder o elemento → fica `opacity:0` pra sempre, ocupando espaço mas invisível.

No caso do usuário: ele rolou direto pro `#formulario`, depois pra baixo. O `FinalCTA.reveal` provavelmente nunca disparou intersect (rootMargin negativo + threshold 0.12 + tela mobile pequena podem ter contribuído também).

## Correção (2 ajustes pequenos)

**1. Tornar `useRevealOnScroll` mais robusto** (`src/hooks/useRevealOnScroll.ts`):
- Reduzir `threshold` pra `0.05` e remover `rootMargin` negativo, pra disparar mais cedo.
- Adicionar fallback: depois de 1.5s, qualquer `.reveal` que ainda esteja sem `.is-visible` recebe a classe automaticamente. Garante que nunca fique invisível por bug de observer.
- Usar `MutationObserver` pra observar novos `.reveal` que apareçam depois do mount inicial (cobre o caso do `LeadForm` re-renderizar).

**2. Defensivo no CSS** (`src/index.css`):
- Adicionar `@media (prefers-reduced-motion: reduce)` que força `.reveal { opacity: 1; transform: none; }`, pra usuários que desativaram animação não verem tela em branco.

## Resultado esperado

- O gap em branco some — `FinalCTA` aparece corretamente assim que entra na tela (ou no máximo 1.5s depois como fallback).
- Sem regressão visual nas animações de scroll que funcionavam.
- Sem mudanças na lógica de form/admin.

Nenhum arquivo novo. 2 arquivos editados. Sem migration, sem mexer em backend.
