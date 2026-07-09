## Objetivo
Quando um contato WhatsApp mandar mensagem no canal RecrutaMAX, o webhook além de responder automaticamente também cadastra o contato como lead no painel /admin.

## Mudanças

### 1) `supabase/functions/ziontalk-webhook/index.ts`
- Após validar o payload de `mensagem.recebida` e ter telefone válido, inserir na tabela `public.leads` usando o `SUPABASE_SERVICE_ROLE_KEY` (contorna RLS).
- Campos:
  - `name`: `payload.contato.nome` (fallback: `primeiro_nome`, ou "Contato WhatsApp")
  - `whatsapp`: telefone normalizado (formato `+55DDNÚMERO`)
  - `email`: `whatsapp@recrutamax.lead` (placeholder, coluna é NOT NULL)
  - `city`: "Não informado" (NOT NULL)
  - `is_agent`: `false`
  - `attraction`: "WhatsApp Inbound"
  - `last_cta_source`: `payload.mensagem.canal` (ex: "15996512656 - RecrutaMAX")
- Deduplicar: antes de inserir, checar se já existe lead com mesmo `whatsapp` — se existir, pular insert (só responde a mensagem).
- Manter envio da resposta automática igual ao atual.
- Logar sucesso/erro do insert sem quebrar a resposta.

### 2) `src/pages/Admin.tsx` (mínimo)
- Nenhuma mudança estrutural: leads novos aparecem automaticamente no fetch existente.
- Opcional: adicionar "WhatsApp Inbound" ao filtro de atração (se houver dropdown fixo). Confirmar ao explorar — se filtro é livre, nada a fazer.

## Pontos a confirmar
- Confirmo que o email placeholder `<whatsapp>@recrutamax.lead` está OK, já que a coluna `email` é NOT NULL e o WhatsApp não fornece email? (Alternativa: tornar a coluna nullable via migração — mas é mudança de schema além do pedido.)
- Deduplicar por `whatsapp` (não recadastrar o mesmo número em cada mensagem nova) — OK?
