## Objetivo

Se o lead parar de responder no meio da cadência, mandar lembretes automáticos:
- **30 minutos** sem resposta → "Oi, ainda tá por aí? 👀"
- **24 horas** sem resposta → "Oi! Ainda tem interesse em conhecer a oportunidade da RE/MAX?"

Só dispara enquanto o funil está em andamento (`funnel_step` entre 1 e 7). Se o lead já respondeu ou terminou o funil, não envia nada.

## Como vai funcionar

### 1. Nova coluna em `leads`
- `funnel_followup_stage` int default 0 — 0 = nenhum lembrete enviado, 1 = lembrete de 30 min já enviado, 2 = lembrete de 24 h já enviado.

Quando o webhook recebe qualquer resposta do lead, zera `funnel_followup_stage = 0` (usuário voltou a interagir).

### 2. Nova edge function `funnel-followup`
Roda periodicamente e para cada lead ativo (`funnel_step` entre 1 e 7) verifica quanto tempo passou desde `funnel_last_question_at`:

- Se passou ≥ 24 h e `funnel_followup_stage < 2` → envia a mensagem de 24 h, seta stage=2.
- Senão se passou ≥ 30 min e `funnel_followup_stage < 1` → envia a mensagem de 30 min, seta stage=1.

Não avança o `funnel_step` — só envia o lembrete e continua esperando a resposta do lead.

**Limite:** máximo 2 lembretes por lead. Depois do de 24 h fica em silêncio até o lead responder.

### 3. Agendamento (cron)
Habilita `pg_cron` + `pg_net` no projeto e cria um job que chama a função a cada 5 minutos. Precisão de ±5 min é suficiente para "30 min" e "24 h".

### 4. Reset ao responder
No `ziontalk-webhook`, no início do `runFunnel`, quando o lead está em `funnel_step >= 1` e mandou qualquer mensagem, adicionar `funnel_followup_stage: 0` no update — assim se o lead voltar a responder e parar de novo, o ciclo de lembretes recomeça do zero.

## Arquivos alterados

- **Migração**:
  - `ALTER TABLE public.leads ADD COLUMN funnel_followup_stage int NOT NULL DEFAULT 0`
- **Insert (não migração, tem URL/anon key)**:
  - Habilita `pg_cron` e `pg_net`
  - Cria cron job `funnel-followup-every-5min`
- **Nova função `supabase/functions/funnel-followup/index.ts`**:
  - Query leads elegíveis, envia mensagem via Ziontalk, atualiza `funnel_followup_stage`.
- **`supabase/functions/ziontalk-webhook/index.ts`**:
  - Reseta `funnel_followup_stage = 0` sempre que o lead manda mensagem em um step ativo.

## Mensagens exatas

- 30 min: `Oi, ainda tá por aí? 👀`
- 24 h: `Oi! Ainda tem interesse em conhecer a oportunidade da RE/MAX?`
