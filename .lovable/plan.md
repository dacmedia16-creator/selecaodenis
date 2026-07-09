## Objetivo

Toda vez que alguém enviar mensagem no WhatsApp conectado à ZionTalk, o sistema responde automaticamente:

> "Logo a RecrutaMax vai entrar em contato, aproveita e veja www.recrutamax.com.br"

## Como vai funcionar

```text
Pessoa manda msg no WhatsApp
        ↓
ZionTalk recebe
        ↓
ZionTalk dispara webhook → Edge Function nossa
        ↓
Edge Function chama API ZionTalk (send_message)
        ↓
Pessoa recebe a resposta automática
```

## O que vou construir

1. **Edge Function `ziontalk-webhook`** (endpoint público, sem JWT)
   - Recebe POST da ZionTalk com os dados da mensagem recebida (telefone do remetente).
   - Ignora mensagens enviadas pelo próprio operador (para não entrar em loop de auto-resposta).
   - Chama `POST https://app.ziontalk.com/api/send_message/` usando Basic Auth com o secret `ZIONTALK_API_KEY` já cadastrado.
   - Envia a mensagem fixa com o link do site.
   - Retorna 200 rápido para a ZionTalk (responde mesmo em erro, para não travar retries).
   - Loga tudo para depuração.

2. **Nada muda no frontend** — é só backend.

## Depois que eu implantar

Você vai precisar, no painel da ZionTalk:

1. Ir em **Canais → editar o canal do WhatsApp**.
2. Colar a URL do webhook (vou te passar depois do deploy, formato: `https://<projeto>.supabase.co/functions/v1/ziontalk-webhook`).
3. Salvar.

Depois é só mandar uma mensagem de teste no WhatsApp para conferir.

## Observações importantes

- **"Toda vez"**: como pediu, responde em qualquer mensagem recebida. Isso pode ser repetitivo se a pessoa mandar 5 mensagens seguidas — ela vai receber 5 respostas automáticas. Se quiser depois limitar (ex.: 1 resposta por hora por número), me avise e eu adiciono um cache simples no banco.
- **Formato exato do webhook da ZionTalk**: a doc pública (`ziontalk.com.br/docs`) só mostra o endpoint de envio, não o payload do webhook de entrada. Vou implementar tentando os campos mais comuns (`mobile_phone`, `from`, `phone`, `direction`, `type`) e logar o payload cru na primeira chamada — se algum campo vier com nome diferente, ajusto em 1 edição depois do primeiro teste real.
- **Loop infinito**: se a própria resposta automática disparar o webhook de novo, vira loop. A função vai descartar mensagens marcadas como "outbound"/"sent"/enviadas pelo canal — se a ZionTalk não mandar essa informação, adiciono uma checagem por número (não responder para o próprio número do canal).
