# Mover vídeo de boas-vindas para o início do funil

## Objetivo
O vídeo institucional (RMX) deve ser enviado **no início** do funil (logo após a mensagem de abertura), e **removido do final**. A mensagem final ("Perfeito! Acesse www.recrutamax.com.br...") e a notificação aos gestores continuam no final.

## Arquivo alterado
`supabase/functions/ziontalk-webhook/index.ts`

## Mudanças

### 1. Enviar vídeo no início (step 0)
Na função `runFunnel`, bloco `step === 0`, reorganizar a ordem:
- Envia `OPENING` (mensagem de abertura)
- Aguarda 600ms
- **Envia o vídeo** com a legenda `FINAL_VIDEO_CAPTION` (via `sendWhatsappVideo`)
- Aguarda 800ms
- Envia a primeira pergunta (`QUESTIONS[0].question`)
- Atualiza `funnel_step = 1`

### 2. Remover vídeo do final
No bloco `nextStep > QUESTIONS.length`, remover a chamada `sendWhatsappVideo(...)`, mantendo apenas:
- `FINAL_MESSAGE` ("Perfeito! Acesse www.recrutamax.com.br...")
- `notifyManager(...)` (resumo para os gestores)

### 3. Reimplantar
- Deploy da edge function `ziontalk-webhook` via `supabase--deploy_edge_functions`
- Enviar teste para +55 15 98178-8214 para validar

## Fluxo final
```
Lead envia 1ª mensagem
  → OPENING ("Oi, tudo bem?...")
  → VÍDEO (rmx-institucional)
  → Pergunta 1 (nome)
  → ... perguntas 2-8 ...
  → FINAL_MESSAGE (recrutamax.com.br)
  → Notificação gestores
```
