# Trocar número de gestor no webhook

## Mudança
No arquivo `supabase/functions/ziontalk-webhook/index.ts`, linha 401:

- Remover `15981888214` (15 98188-8214)
- Adicionar `15996370990` (15 99637-0990)

Resultado:
```ts
const MANAGER_PHONES = ['15981788214', '15996370990'];
```

## Pós-edição
- Fazer deploy da edge function `ziontalk-webhook` para aplicar a mudança.
- (Opcional) Enviar um teste para confirmar que os resumos de leads chegam no novo número.
