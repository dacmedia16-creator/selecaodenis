## Plano

1. **Confirmar a configuração no ZionTalk**
   - A URL do print está correta:
     `https://bnhuvpavzwdqwdzuiqvx.supabase.co/functions/v1/ziontalk-webhook`
   - Manter método `POST` e gatilho `Mensagem recebida`.
   - Salvar essa configuração no ZionTalk.

2. **Testar com uma mensagem real**
   - Enviar uma mensagem de outro WhatsApp para o canal `15996512656 - RecrutaMAX`.
   - Esperado: o webhook responder automaticamente com:
     `Logo a REMAX vai entrar em contato aproveita e veja www.recrutamax.com.br`

3. **Se não responder, verificar logs do backend**
   - Conferir se o ZionTalk chamou o webhook.
   - Verificar se chegou `evento: mensagem.recebida` e `contato.telefone`.
   - Ajustar o parser ou o envio para ZionTalk conforme o erro real retornado.

## Detalhe técnico

O template JSON do print já envia exatamente os campos que a função foi ajustada para ler, principalmente:

```json
{
  "evento": "mensagem.recebida",
  "contato": {
    "telefone": "..."
  },
  "mensagem": {
    "texto": "..."
  }
}
```

Então o próximo passo é salvar no ZionTalk e fazer o teste real; só precisamos mexer no código se os logs mostrarem falha no disparo ou no envio da resposta.