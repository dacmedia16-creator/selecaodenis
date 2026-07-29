## Objetivo

Enviar o resumo das respostas do funil também para o WhatsApp **+55 15 98188-8214** (hoje só vai para **15981788214**).

## O que muda

Em `supabase/functions/ziontalk-webhook/index.ts`:

- Trocar a constante única `MANAGER_PHONE = '15981788214'` por uma lista:
  ```
  const MANAGER_PHONES = ['15981788214', '15981888214'];
  ```
- Em `notifyManager`, montar a mensagem uma vez e enviar em loop para cada número da lista (com pequeno intervalo entre os envios, e log de erro individual para que a falha em um número não impeça o outro).
- Redeploy da função.

## Observação

Os dois números são parecidos (…9817… e …9818…). Se o segundo for na verdade uma correção do primeiro e você quiser substituir em vez de adicionar, me avise que eu troco.

## Arquivos alterados

- `supabase/functions/ziontalk-webhook/index.ts`
