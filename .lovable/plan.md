# Adicionar número de gestor no webhook

## Mudança
No arquivo `supabase/functions/ziontalk-webhook/index.ts`, linha 401, adicionar o número `5515991984949` (15 99198-4949) à lista de gestores que recebem os resumos de leads.

Antes:
```ts
const MANAGER_PHONES = ['15981788214', '15996370990'];
```

Depois:
```ts
const MANAGER_PHONES = ['15981788214', '15996370990', '15991984949'];
```

O número informado (`5515991984949`) inclui o código do Brasil (55); no array entra sem o 55, pois o `MANAGER_CD = '+55'` já adiciona o prefixo no envio.

## Pós-edição
- Fazer deploy da edge function `ziontalk-webhook` para aplicar a mudança.
- (Opcional) Enviar um teste para confirmar que os resumos de leads chegam no novo número.
