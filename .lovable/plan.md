
User está no mobile (390px), na seção FinalCTA. Ele copiou o texto do `<h2>` + 2 parágrafos e disse "não está aparecendo, colocar outra cor de letra".

Olhando o `FinalCTA.tsx`:
- Fundo: `gradient-cta` = linear-gradient azul → vermelho (`hsl(215 100% 32%)` → `hsl(354 80% 49%)`)
- Texto h2: `text-white` ✓
- Parágrafos: `text-white/90` e `text-white/80`

Em tese branco sobre azul/vermelho deveria ter contraste OK. Mas o user reporta que não vê. Possíveis causas:
1. Os overlays radiais brancos (`bg-[radial-gradient(...white/0.18...)]`) podem estar lavando o fundo no meio, deixando branco-sobre-branco em pontos.
2. `text-white/80` em cima de gradiente claro fica muito fraco no mobile.
3. Possivelmente o `.reveal` ainda está causando opacity baixa em algum momento — mas já corrigimos isso.

Solução simples e direta: aumentar contraste do texto. Como o user pediu "outra cor", vou propor:

## Plano

**Editar `src/components/landing/FinalCTA.tsx`:**

1. **Reduzir os overlays brancos** que clareiam o fundo no centro (de `white/0.18` e `white/0.12` para `white/0.08` e `white/0.05`), pra manter o gradiente azul/vermelho saturado e garantir contraste com texto branco.

2. **Reforçar o texto:**
   - `<h2>`: manter branco, mas adicionar `drop-shadow-lg` (sombra escura) pra destacar de qualquer ponto claro do gradiente.
   - 1º `<p>`: subir de `text-white/90` para `text-white` com `drop-shadow`.
   - 2º `<p>`: subir de `text-white/80` para `text-white/95` com `drop-shadow`.

3. Botão CTA já tem `bg-white text-primary` — fica como está, contraste perfeito.

**Resultado:** texto fica nítido e legível no mobile, sem mudar o visual geral da seção (fundo continua sendo o gradiente azul→vermelho da marca).

Nenhum arquivo novo. 1 arquivo editado. Sem backend.

### Dica extra pro user
Pra mudanças simples de cor/texto como essa, dá pra usar o **Visual Edits** (botão de editar no canto inferior esquerdo do chat) — é grátis e instantâneo. Vou mencionar isso depois de aplicar.
