
# Ocultar selo "+46 vendas/ano" no Hero da `/nova-carreira`

Remover apenas o badge vermelho "+46 vendas/ano" que aparece no card flutuante sobre a foto das mulheres no Hero. Mantém todo o resto (foto, badge "Sorocaba/SP", título "Mulheres RE/MAX — Mães, profissionais, alta performance", balão flutuante).

**Arquivo:** `src/components/landing/nova-carreira/HeroMulheres.tsx`
**Mudança:** remover o `<div>` com `gradient-red` e ajustar o card pra não ficar mais com `flex justify-between`.

Os números "+46 vendas" continuam aparecendo na seção **Conquistas Possíveis** mais abaixo na página e nos depoimentos — só sai do card sobre a foto.
