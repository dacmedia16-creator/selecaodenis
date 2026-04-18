
Tenho a doc da ZionTalk em mãos. API simples: POST `multipart/form-data` em `https://app.ziontalk.com/api/send_message/` com Basic Auth (API Key como username, senha vazia). Campos: `msg` e `mobile_phone`. Resposta 201 = sucesso.

## Plano

**1. Ativar Lovable Cloud + criar tabela `leads`**
   - Migração com colunas: `id`, `name`, `whatsapp`, `email`, `city`, `is_agent`, `attraction`, `created_at`.
   - RLS: `INSERT` permitido para `anon` (formulário público); `SELECT` apenas para autenticados (futuro painel do Denis).

**2. Adicionar 2 secrets**
   - `ZIONTALK_API_KEY` — chave gerada no painel ZionTalk (Denis precisa gerar e colar).
   - `DENIS_WHATSAPP` — número do Denis em formato E.164 (ex: `+5515999999999`) que receberá a notificação.

**3. Criar Edge Function `submit-lead`** (`supabase/functions/submit-lead/index.ts`)
   - CORS habilitado, `verify_jwt = false` (form público).
   - Valida payload com Zod (mesmo schema do front).
   - Insere na tabela `leads`.
   - Monta mensagem formatada para o Denis:
     ```
     🔥 Novo lead — Landing RE/MAX
     Nome: {name}
     WhatsApp: {whatsapp}
     E-mail: {email}
     Cidade: {city}
     Já é corretor: {sim/não}
     Motivação: {attraction ou "—"}
     ```
   - POST para ZionTalk via `fetch` com `multipart/form-data` e header `Authorization: Basic base64(API_KEY:)`.
   - Retorna `{ success: true }` mesmo se ZionTalk falhar (lead já está salvo no DB) — apenas loga o erro.

**4. Atualizar `LeadForm.tsx`**
   - Trocar o `setTimeout` simulado por `supabase.functions.invoke('submit-lead', { body: parsed.data })`.
   - Em caso de erro do invoke, mostra toast de erro e NÃO redireciona pro WhatsApp.
   - Em sucesso, mantém o fluxo atual (toast + abre wa.me + tela de sucesso).

### Notas técnicas
- Basic Auth no Deno: `"Basic " + btoa(apiKey + ":")`.
- `mobile_phone` no formato `+5515999999999`.
- Nenhuma mudança no wa.me redirect (continua abrindo a conversa pro lead falar com o Denis).
- Auto-resposta pro lead fica como melhoria futura (a doc suporta, mas exigiria template aprovado pela Meta se quisermos via API oficial — o endpoint `send_message` simples deve funcionar pra canal já conectado).

### Próximos passos depois da aprovação
Vou pedir as 2 informações: API Key da ZionTalk e o WhatsApp do Denis (E.164). Sem elas não consigo testar a integração de ponta a ponta.
