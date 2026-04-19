
Usuário enviou mais 1 peça (7.png) e mensagem vazia. Mesmo padrão das últimas: adicionar ao carousel "Resultados Reais".

**Análise da imagem:**
- `7.png` → Condomínio **Raízes Campolim**, vendido em **5 dias**, Sorocaba/SP — novo imóvel, recorde absoluto (mais rápido que o Soleil de 10 dias!)

Estado atual (5 cards): Saint Tropez (120d), L'Essence interior (150d), L'Essence varanda, Soleil de Québec (10d), Ibéria (45d).

## Plano

**1. Adicionar Raízes Campolim** ao array `vendidos`:
- `vendido-raizes-campolim.png` → "Vendido em 5 dias" / "Campolim, Sorocaba/SP"

**2. Copiar imagem** de `user-uploads://7.png` para `src/assets/vendidos/vendido-raizes-campolim.png`.

**3. Total de 6 cards** no carousel. Embla com `basis-1/2` continua funcionando (mostra 2 por vez no desktop, 1 no mobile, navegação por setas/dots).

**4. Atualizar stats:**
- "10 dias" → **"5 dias"** (Raízes virou o novo recorde)
- "5" → **"6"** imóveis em destaque
- "Sorocaba/SP" — mantém

**Arquivos:**
- `src/assets/vendidos/vendido-raizes-campolim.png` (novo)
- `src/components/landing/Vendidos.tsx` (import + array + 2 stats)

Sem backend, sem rotas.
