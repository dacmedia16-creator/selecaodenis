# Substituir o vídeo final do funil do WhatsApp por um novo

## Objetivo
Trocar o vídeo que o lead recebe ao concluir o questionário (`video-boas-vindas.mp4`) por um novo arquivo `.mp4` que você vai enviar. O fluxo permanece idêntico: ao terminar as 8 perguntas, o lead recebe a mensagem final e o vídeo com a legenda "Dá uma olhada nesse vídeo rapidinho 👇".

## Passo a passo

1. **Você envia o novo arquivo `.mp4`** aqui no chat.
2. **Hospedar o vídeo no CDN** — executar:
   ```bash
   lovable-assets create --file <caminho-do-arquivo-enviado> --filename video-boas-vindas.mp4
   ```
   O comando grava um `.asset.json` com a URL CDN (`/__l5e/assets-v1/{asset_id}/video-boas-vindas.mp4`). Deletar o `.mp4` original após o upload.
3. **Atualizar a constante `FINAL_VIDEO_URL`** em `supabase/functions/ziontalk-webhook/index.ts` (linha ~160) com a nova URL CDN lida do `.asset.json`.
   - O nome do arquivo no `new File([blob], 'video-boas-vindas.mp4', ...)` pode permanecer o mesmo.
4. **Reimplantar o edge function** `ziontalk-webhook`.

## Validação
- Disparar um teste manual para `+55 15 98178-8214` confirmando que o novo vídeo chega corretamente ao final do funil.

## Observações
- Nenhuma mudança de banco nem de fluxo de perguntas — apenas o arquivo de vídeo muda.
- O vídeo anterior permanece acessível pela URL antiga (imutável no CDN), mas deixa de ser usado.
