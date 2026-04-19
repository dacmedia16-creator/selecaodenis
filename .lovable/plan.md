
Adicionar 2 novos imóveis vendidos ao carousel "Resultados Reais": L'Essence Campolim (sem prazo informado, marca "MAIS UM VENDIDO!") e Soleil de Québec (vendido em 10 dias).

Espera — já tem um L'Essence Campolim no carousel atual. As novas imagens são variações/peças diferentes do mesmo apartamento (a atual mostra interior, a nova mostra varanda). Preciso confirmar com o usuário se é pra **adicionar** as 2 novas (ficando 4 cards) ou **substituir** alguma.

## Plano

**1. Adicionar as 2 novas peças ao array `vendidos` em `Vendidos.tsx`:**
- `vendido-lessence-varanda.png` → "APTO L'Essence Campolim" / "Campolim, Sorocaba/SP" (sem prazo específico — usar "Mais um vendido")
- `vendido-soleil-quebec.png` → "Vendido em 10 dias" / "Campolim, Sorocaba/SP"

**2. Copiar as 2 imagens** de `user-uploads://3.png` e `user-uploads://4.png` para `src/assets/vendidos/`.

**3. Total de 4 cards** no carousel (Saint Tropez, L'Essence interior, L'Essence varanda, Soleil de Québec). O Embla com `basis-1/2` fica perfeito — usuário vê 2 por vez no desktop, 1 no mobile, e navega pelas setas/dots.

**4. Atualizar os stats de baixo:**
- "10 dias" → tempo recorde (substituindo "120 dias" — fica mais impactante)
- "4" imóveis em destaque (substituindo "2")
- "Sorocaba/SP" — mantém

**Pergunta antes:** o L'Essence interior (atual, "Vendido em 150 dias") deve continuar OU a peça nova da varanda substitui ela? Como é o mesmo imóvel, geralmente faz sentido manter só uma — provavelmente a versão mais nova/melhor (a da varanda tem vista mais impactante).

**Arquivos:** `src/components/landing/Vendidos.tsx` + 2 imagens novas em `src/assets/vendidos/`. Sem backend.
