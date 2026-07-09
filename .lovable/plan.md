## Objetivo

Quando um lead mandar mensagem no WhatsApp, iniciar uma cadência de 7 perguntas — uma por vez. Cada resposta é validada pela IA (Lovable AI / Gemini) antes de avançar: se fizer sentido, envia a próxima; se não fizer, reformula e repete a mesma. No final envia o link `www.recrutamax.com.br` + aviso "logo a RE/MAX vai entrar em contato".

## Roteiro fixo (na ordem)

0. **Abertura** — "Oi, tudo bem? Vi que você se interessou pela oportunidade de carreira na RE/MAX. Antes de te explicar tudo, posso te fazer algumas perguntinhas rápidas para entender se faz sentido para você?"
1. Qual seu nome?
2. Você trabalha atualmente?
3. Está buscando renda extra ou nova profissão?
4. Já trabalhou com vendas ou atendimento?
5. Você tem disponibilidade para treinamento?
6. Você entende que corretor trabalha por comissão, sem salário fixo no início?
7. Se fizer sentido, você teria interesse em participar de uma conversa para conhecer o plano de carreira da RE/MAX?

**Mensagem final:** "Perfeito! Acesse www.recrutamax.com.br para conhecer mais. Logo a RE/MAX vai entrar em contato com você. 🏡"

## Como vai funcionar

### 1. Estado da conversa em `leads` (colunas extras)
Adicionar em `public.leads`:
- `funnel_step` int — próxima pergunta a enviar (0 = abertura, 1..7 = perguntas, 8 = finalizado)
- `funnel_answers` jsonb — respostas coletadas (`{ "trabalha_atualmente": "sim, sou vendedor", ... }`)
- `funnel_last_question_at` timestamptz — quando a última pergunta foi enviada
- `funnel_retries` int default 0 — tentativas de reformulação da pergunta atual (limite de 2)

Lead novo entra em `funnel_step = 0`. Lead já existente com `funnel_step = 8` recebe apenas uma mensagem curta de "já recebemos seus dados" e não reinicia o fluxo.

### 2. Fluxo no `ziontalk-webhook`
Ao receber uma mensagem inbound:
1. Extrai telefone e texto da mensagem.
2. `upsertLead` (já existente) — garante 1 lead por número.
3. Lê `funnel_step` e `funnel_answers` do lead.
4. **Se `funnel_step == 0`**: envia abertura + pergunta 1, seta `funnel_step = 1`, salva timestamp.
5. **Se `1 <= funnel_step <= 7`**: chama a IA para validar se a resposta responde a pergunta atual.
   - Se **válida** → salva resposta em `funnel_answers`, incrementa `funnel_step`, zera `retries`, envia próxima pergunta (ou mensagem final se passou de 7).
   - Se **inválida** e `retries < 2` → incrementa `retries`, pede a IA reformular a mesma pergunta de forma mais clara e envia.
   - Se **inválida** e `retries >= 2` → aceita mesmo assim (salva o texto cru), avança para próxima pergunta.
6. **Se `funnel_step >= 8`**: responde algo curto tipo "Já recebemos seus dados, em breve entramos em contato 🏡" e não avança.

### 3. Validação e reformulação por IA
Chamar Lovable AI Gateway (modelo `google/gemini-3-flash-preview`) dentro do próprio edge function, usando `LOVABLE_API_KEY` (já configurada). Usa `generateText` + `Output.object` com um schema mínimo:

```
{ "faz_sentido": boolean, "resposta_normalizada": string, "proxima_pergunta_reformulada": string }
```

Prompt inclui: pergunta atual, texto do usuário, contexto (é uma triagem para vaga de corretor RE/MAX). O modelo decide se a resposta cabe na pergunta e devolve uma versão limpa para salvar em `funnel_answers`.

### 4. Envio das mensagens
Continua usando o endpoint `https://app.ziontalk.com/api/send_message/` já em uso. Sem mudanças no site, no painel `/admin` ou no formulário — apenas o webhook e a tabela `leads`.

### 5. Painel `/admin`
Já mostra os leads. As respostas do funil ficam visíveis via a coluna `funnel_answers` (jsonb). Fica para uma próxima iteração adicionar uma coluna renderizada no admin — não faz parte deste plano.

## Arquivos alterados

- **Migração** — adiciona `funnel_step`, `funnel_answers`, `funnel_last_question_at`, `funnel_retries` em `public.leads`.
- **`supabase/functions/ziontalk-webhook/index.ts`** — extrai texto da mensagem, lê/atualiza estado do funil, chama IA para validar, envia próxima pergunta ou mensagem final. Mantém a lógica de deduplicação atual.

## Limites conhecidos

- Sem timeout de sessão: se o lead sumir por dias e voltar, retoma de onde parou. (Pode ser adicionado depois com base em `funnel_last_question_at`.)
- Retry de reformulação vai até 2 tentativas por pergunta; depois aceita qualquer resposta para não travar.
- Custo de IA: 1 chamada de validação por mensagem recebida durante o funil (7 chamadas por lead completo).
