## Objetivo
Medir quais CTAs (Hero, 4 intermediários, FinalCTA, Header) geram mais cliques e, principalmente, quais geram mais leads. Tudo armazenado no próprio backend do projeto (sem Google Analytics) e visível na página `/admin`.

## O que vamos rastrear
1. **Clique em CTA** — toda vez que o usuário clica em qualquer botão que leva a `#formulario`, registramos:
   - `source` (qual CTA: `hero`, `header`, `inline_historias`, `inline_virada`, `inline_conquistas`, `inline_mitos`, `final_cta`)
   - `session_id` (UUID gerado e guardado em `localStorage` na 1ª visita)
   - `path` (rota atual)
   - `created_at`
2. **Lead enviado** — ao salvar o lead, gravamos também o `last_cta_source` (último CTA clicado nessa sessão). Isso permite atribuir o lead ao CTA mais "convertedor".

## Banco de dados
Migração nova:
- Tabela `public.cta_clicks` (id, source, session_id, path, user_agent, created_at)
  - RLS: INSERT liberado para `anon`/`authenticated`; SELECT só para admins (mesmo padrão de `leads`).
- Adicionar coluna `last_cta_source text` na tabela `public.leads` (nullable).

## Edge function
Atualizar `submit-lead` para aceitar `lastCtaSource` opcional no body e gravar em `leads.last_cta_source`.

## Frontend
- Criar `src/lib/tracking.ts`:
  - `getSessionId()` — gera/recupera UUID em `localStorage`.
  - `trackCtaClick(source)` — faz `INSERT` direto em `cta_clicks` via `supabase.from(...).insert(...)` (a policy permite anon) e guarda `last_cta_source` em `localStorage`.
  - `getLastCtaSource()` — lê do `localStorage`.
- Adaptar componentes que têm CTA para chamar `trackCtaClick("...")` no `onClick`:
  - `Header.tsx`, `HeroMulheres.tsx` (1 botão; o "Ver histórias" não conta), `FinalCTA.tsx`, `InlineCTA.tsx` (passar `source` como prop).
- Em `NovaCarreira.tsx`, passar o `source` correto para cada `<InlineCTA />`.
- Em `LeadForm.tsx`, ler `getLastCtaSource()` e enviar como `lastCtaSource` no payload do `submit-lead`.

## Painel admin
Em `src/pages/Admin.tsx`, adicionar uma seção "Performance dos CTAs" com uma tabela simples mostrando, por `source`:
- Total de cliques (de `cta_clicks`)
- Total de leads atribuídos (de `leads.last_cta_source`)
- Taxa de conversão (leads / cliques)
Ordenada por leads desc. Sem gráficos — só tabela limpa.

## Fora de escopo
- Não usar GA, GTM, Plausible ou qualquer ferramenta externa.
- Não rastrear pageviews nem rolagem — só cliques em CTA.
- Não alterar o visual/copy dos botões.
