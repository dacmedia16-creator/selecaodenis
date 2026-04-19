
User wants to replace the carousel images in `Resultados Reais` (Vendidos.tsx) with the 2 new uploaded images.

Currently `Vendidos.tsx` shows 9 images (v1-v9). User uploaded only 2 new images (1.png Saint Tropez 120 dias, 2.png L'Essence Campolim 150 dias).

Need to clarify: replace ALL 9 with just these 2, or add these 2 + keep some existing? Also the new images have rich info (location, days to sell) that differ from current generic "Vendido rápido / Sorocaba/SP" labels.

Let me check what's reasonable. The new images already contain VENDIDO badge + days + property name baked in. Current carousel adds an external "Vendido" pill on top. With baked-in info, the external pill becomes redundant.

## Plano

**1. Substituir as 9 fotos atuais por essas 2 novas** no carousel `Vendidos.tsx`:
- `src/assets/vendidos/vendido-saint-tropez.png` — Apto Saint Tropez, Campolim, vendido em 120 dias
- `src/assets/vendidos/vendido-lessence.png` — L'Essence Campolim, vendido em 150 dias

**2. Copiar as imagens** de `user-uploads://` para `src/assets/vendidos/` e importar no componente.

**3. Ajustar metadados de cada card** com a info real que aparece nas peças:
- Saint Tropez → "Vendido em 120 dias" / "Campolim, Sorocaba/SP"
- L'Essence → "Vendido em 150 dias" / "Campolim, Sorocaba/SP"

**4. Remover imports antigos** (`v1`–`v9`) que não serão mais usados.

**5. Ajustar o card visualmente** já que as imagens têm proporção retrato (mais alta que largura) e já trazem o selo "VENDIDO" embutido:
- Trocar `aspect-[4/5]` para `aspect-[3/4]` ou deixar imagem em altura natural com `object-contain` sobre fundo neutro, pra não cortar o selo nem o nome do imóvel.
- **Remover o pill "Vendido" sobreposto** (redundante — já está na arte).

**6. Stats de baixo** continuam (24h venda mais rápida, 9+ imóveis em destaque, Sorocaba/SP) — mas "9+ imóveis" não bate mais com 2 cards. Vou trocar por algo coerente:
- "120 dias" → tempo médio de venda (ou manter "24h" se preferir)
- "2 imóveis em destaque" — ou melhor: remover a contagem e deixar só "Sorocaba/SP" + um stat sobre experiência.

**Pergunta antes de implementar:** as 2 imagens são mesmo as ÚNICAS que devem aparecer agora, ou você vai mandar mais depois? Se forem só essas 2 mesmo, faço o ajuste completo (incluindo atualizar os stats). Se vai mandar mais, eu deixo a estrutura pronta e atualizo os stats só quando todas chegarem.

**Arquivos editados:** `src/components/landing/Vendidos.tsx` + 2 arquivos novos em `src/assets/vendidos/`. Sem mudanças em backend, rotas ou auth.
