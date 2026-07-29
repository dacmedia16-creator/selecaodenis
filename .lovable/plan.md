## Objetivo

Quando o lead terminar de responder as 7 perguntas do funil, além da mensagem final com o site, enviar o vídeo enviado (WhatsApp_Video_2026-07-29, 90s, ~14 MB) para o WhatsApp dele.

## Como funciona

A API da ZionTalk (`POST /api/send_message/`) aceita anexos via `multipart/form-data` no campo `attachments`. Então dá para enviar o vídeo direto pela mesma função que já responde o lead.

## Passos

1. **Hospedar o vídeo no CDN da Lovable**
   - Subir `WhatsApp_Video_2026-07-29_at_20.21.46_1.mp4` com o CLI de assets, gerando `src/assets/video-boas-vindas.mp4.asset.json`.
   - A URL pública do CDN será usada pela função de backend para baixar o arquivo na hora do envio (o binário não fica no repositório).

2. **Alterar `supabase/functions/ziontalk-webhook/index.ts`**
   - Nova função `sendWhatsappWithVideo(mobilePhone, cd, msg)`: faz `fetch` da URL do vídeo, monta um `FormData` com `msg`, `mobile_phone`, `cd` e `attachments` (blob do vídeo) e envia para a ZionTalk.
   - No fim do funil (`nextStep > QUESTIONS.length`): manter a mensagem final de texto e, logo depois (com pequeno intervalo), enviar o vídeo com uma legenda curta.
   - Envio do vídeo protegido por try/catch e log: se falhar, o funil continua normal e o gestor ainda recebe o resumo.
   - Redeploy da função.

## Detalhes técnicos

- Vídeo: MP4, 90s, ~14 MB — dentro do limite típico do WhatsApp (16 MB), mas se a ZionTalk recusar por tamanho, comprimo o arquivo (target ~8 MB) e reenvio.
- A URL do CDN é fixa e imutável, então não precisa de storage nem de secret novo.

## Pergunta rápida

Quer alguma legenda junto do vídeo? Se não me disser, uso algo como: *"Dá uma olhada nesse vídeo rapidinho 👇"*.

## Arquivos alterados

- `src/assets/video-boas-vindas.mp4.asset.json` (novo)
- `supabase/functions/ziontalk-webhook/index.ts`
