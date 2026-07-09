## Ajustes após ver o painel da ZionTalk

### 1. Corrigir o parser da edge function

O template JSON da ZionTalk manda:

```json
{
  "evento": "mensagem.recebida",
  "contato": { "nome": "...", "telefone": "+554699887766" },
  "mensagem": { "texto": "...", "canal": "...", "tipo": "attachment" },
  "timestamp": "..."
}
```

Vou atualizar `supabase/functions/ziontalk-webhook/index.ts` para:

- Ler o telefone de `payload.contato.telefone` (formato oficial), mantendo os fallbacks antigos.
- Confirmar o evento `mensagem.recebida` antes de responder (evita processar outros gatilhos).
- Continuar logando o payload cru para depuração.

### 2. Você precisa trocar a URL na ZionTalk

A URL que está no campo **URL de destino** não é a da nossa função. Substituir por:

```
https://bnhuvpavzwdqwdzuiqvx.supabase.co/functions/v1/ziontalk-webhook
```

Passos no painel ZionTalk:
1. Abrir o webhook **Agenda Denis**.
2. No gatilho **Mensagem recebida**, colar a URL acima em **URL de destino**.
3. Manter método **POST** e o **Template JSON** que já está.
4. Salvar.

### 3. Testar

Manda uma mensagem de teste pelo WhatsApp. Se algo falhar, eu leio os logs da função (`ziontalk-webhook`) e ajusto.

### Observação

Não precisa mexer no frontend. Só a edge function e a configuração do webhook na ZionTalk.
