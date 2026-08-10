# Substituir o vídeo final do funil do WhatsApp

O arquivo `RMX_Institucional_3.mov` foi recebido (5,7 MB, vertical 1080x1920, 62s, H.264/AAC). Ele vai substituir o vídeo atual enviado ao lead ao concluir as 8 perguntas.

## Passos

1. Converter o `.mov` para `.mp4` (remux rápido, sem recodificar — o codec já é H.264/AAC, compatível com WhatsApp).
2. Hospedar no CDN com `lovable-assets`, gerando `src/assets/rmx-institucional.mp4.asset.json`.
3. Atualizar a constante `FINAL_VIDEO_URL` em `supabase/functions/ziontalk-webhook/index.ts` com a nova URL CDN, e o nome do arquivo enviado no `new File([...], 'rmx-institucional.mp4')`.
4. Reimplantar o edge function `ziontalk-webhook`.
5. Disparar um envio de teste para +55 15 98178-8214 para conferir como chega no WhatsApp.

## Observações

- A legenda continua "Dá uma olhada nesse vídeo rapidinho 👇" e o fluxo de perguntas não muda.
- O vídeo antigo (`video-boas-vindas.mp4`) deixa de ser usado; o pointer pode ser removido depois se você confirmar que não quer mais.
