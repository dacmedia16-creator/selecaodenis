
Usuário enviou 2 novas peças do Denis e mensagem vazia. Pelo contexto recente (sempre adicionando ao carousel "Resultados Reais"), assumo que quer adicionar essas 2 também.

**Análise das imagens:**
- `5.png` → APTO Saint Tropez Campolim, vendido em **120 dias** — **JÁ EXISTE** no carousel (mesmo imóvel, mesmo prazo, mas é uma peça/foto diferente — sala em vez do que já está lá)
- `6.png` → Ibéria Campolim, vendido em **45 dias** — novo imóvel

Estado atual do carousel (4 cards): Saint Tropez (120d), L'Essence interior (150d), L'Essence varanda (mais um vendido), Soleil de Québec (10d).

## Plano

**1. Adicionar Ibéria Campolim** (novo imóvel, 45 dias) ao array `vendidos`:
- `vendido-iberia-campolim.png` → "Vendido em 45 dias" / "Campolim, Sorocaba/SP"

**2. Sobre o Saint Tropez (5.png):** já existe um card desse imóvel com mesmo prazo (120d). A peça nova é outra foto/arte do mesmo apartamento. Não faz sentido ter 2 cards do mesmo imóvel com mesmo prazo — cria redundância.

**Pergunta:** o que fazer com a 5.png (Saint Tropez sala)?
- (a) **Substituir** a foto atual do Saint Tropez por essa nova (mantendo 5 cards no total — só troca a arte)
- (b) **Adicionar como card separado** (fica com 2 cards Saint Tropez, total 6 cards)
- (c) **Ignorar** (só adiciona Ibéria, total 5 cards)

Vou assumir **(a) substituir** por padrão (mais limpo, mesma lógica que usamos com L'Essence quando tinha varanda + interior — embora ali mantivemos os 2). Se preferir outra opção, me avisa.

**3. Total final:** 5 cards no carousel:
1. Saint Tropez — 120 dias (foto nova/atualizada)
2. L'Essence interior — 150 dias
3. L'Essence varanda — mais um vendido
4. Soleil de Québec — 10 dias
5. Ibéria Campolim — 45 dias (novo)

**4. Stats de baixo:**
- "10 dias" tempo recorde — mantém (Soleil ainda é o mais rápido)
- "5" imóveis em destaque (era 4)
- "Sorocaba/SP" — mantém

**Arquivos:**
- `src/components/landing/Vendidos.tsx` — atualizar import + array + stat
- `src/assets/vendidos/vendido-saint-tropez.png` — substituir pela 5.png
- `src/assets/vendidos/vendido-iberia-campolim.png` — criar com 6.png

Sem backend, sem rotas novas.
