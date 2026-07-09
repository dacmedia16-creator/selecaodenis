## Objetivo

1. Mostrar todas as respostas do funil (`funnel_answers`) no painel `/admin` de cada lead.
2. Quando o lead terminar o funil (última pergunta respondida), enviar automaticamente um WhatsApp para o número **+55 15 98178-8214** com o contato do lead e todas as respostas.

## O que muda

### 1. Painel `/admin` — mostrar respostas do funil

Em `src/pages/Admin.tsx`:

- Adicionar campos no tipo `Lead`: `funnel_step`, `funnel_answers` (Record), `funnel_last_question_at`.
- Nova coluna "Funil" na tabela desktop e nos cards mobile, com um badge de status:
  - `funnel_step = 0` → "Não iniciado"
  - `1 ≤ step ≤ 7` → "Em andamento (X/7)"
  - `step > 7` → "Concluído"
- Cada linha/card fica expansível (Collapsible) mostrando as 7 perguntas e respostas salvas em `funnel_answers`, na ordem:
  1. Nome
  2. Trabalha atualmente?
  3. Renda extra ou nova profissão?
  4. Já trabalhou com vendas ou atendimento?
  5. Disponibilidade para treinamento?
  6. Entende que corretor trabalha por comissão?
  7. Interesse em conversar sobre o plano de carreira?
- Perguntas sem resposta aparecem como "—".
- Exportação CSV ganha 8 colunas extras (status do funil + 7 respostas).

### 2. Envio automático para o gestor ao concluir o funil

Em `supabase/functions/ziontalk-webhook/index.ts`, dentro do `runFunnel`, quando `nextStep > QUESTIONS.length` (funil finalizado), além do `FINAL_MESSAGE` para o lead, disparar um WhatsApp para **15981788214** (cd `+55`) com o resumo:

```
📋 Novo lead qualificado — RE/MAX

Nome: {name}
WhatsApp: {whatsapp do lead}

Respostas:
1. Nome: ...
2. Trabalha atualmente?: ...
3. Renda extra ou nova profissão?: ...
4. Já trabalhou com vendas/atendimento?: ...
5. Disponibilidade para treinamento?: ...
6. Entende que é por comissão?: ...
7. Interesse em conversar?: ...
```

Envio usa o mesmo `sendWhatsapp()` já existente (Ziontalk API). O número do gestor fica hardcoded no arquivo — sem novos secrets.

## Arquivos alterados

- `src/pages/Admin.tsx` — nova coluna Funil, expansão com respostas, CSV atualizado.
- `supabase/functions/ziontalk-webhook/index.ts` — envio do resumo ao gestor ao finalizar.

## Nada de novo em banco

Todas as colunas necessárias (`funnel_step`, `funnel_answers`, `funnel_last_question_at`) já existem em `leads`. Sem migração.
