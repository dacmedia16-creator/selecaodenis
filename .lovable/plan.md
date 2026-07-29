## Objetivo

Fazer um envio de teste do vídeo final para o WhatsApp **+55 15 98178-8214**, para você conferir como chega.

## Como será feito

Um único disparo direto na API da ZionTalk, usando a mesma rota que a função usa no fim do funil:

- `POST https://app.ziontalk.com/api/send_message/`
- `mobile_phone=15981788214`, `cd=+55`
- `msg=Dá uma olhada nesse vídeo rapidinho 👇`
- `attachments` = o vídeo hospedado no CDN (`video-boas-vindas.mp4`, ~14 MB)

Depois eu te informo o status da resposta da ZionTalk (200 = entregue à fila) e, se der erro de tamanho, comprimo o vídeo para ~8 MB e reenvio.

## Observação

Isso é só um teste manual — nada muda no código nem no funil, que já está publicado e funcionando.
