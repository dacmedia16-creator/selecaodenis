## Objetivo

Garantir que cada número de WhatsApp gere **apenas 1 lead**, mesmo quando:
- o mesmo contato envia várias mensagens em datas diferentes;
- o número chega em formatos distintos (`+5515981788214`, `5515981788214`, `15981788214`, com/sem `+`, com/sem `55`, com espaços ou parênteses);
- o lead já foi cadastrado manualmente pelo formulário do site com formato diferente.

## Como funciona hoje

No `ziontalk-webhook`, a checagem é por igualdade exata na coluna `whatsapp`. Se o mesmo número for salvo uma vez como `+5515981788214` e outra como `5515981788214`, vira 2 leads. Também não há proteção no banco: se duas mensagens chegarem quase simultaneamente, dá pra inserir duplicado por corrida.

## O que vai mudar

### 1. Normalização única do telefone (webhook)
Criar um helper `digitsOnlyBR(phone)` que:
- remove tudo que não é dígito;
- se começar com `55` e tiver 12–13 dígitos, mantém;
- se tiver 10 ou 11 dígitos (DDD + número), prefixa `55`;
- resultado sempre no formato canônico `55DDNNNNNNNNN`.

O valor gravado em `leads.whatsapp` passa a ser sempre `+55DDNNNNNNNNN`.

### 2. Lookup por sufixo (compatibilidade com leads antigos)
Antes de inserir, buscar leads existentes comparando **apenas os últimos 10 dígitos** (DDD + número, ignorando código de país). Assim, um lead antigo salvo como `15981788214` ainda é reconhecido como o mesmo `+5515981788214`.

Se encontrar → apenas loga e não insere.

### 3. Proteção no banco (índice único)
Adicionar um índice único funcional em `public.leads` sobre os últimos 10 dígitos do `whatsapp`:

```text
UNIQUE INDEX leads_whatsapp_digits_unique
ON public.leads ( right(regexp_replace(whatsapp,'\D','','g'), 10) )
```

Isso impede duplicados mesmo em condição de corrida ou inserções vindas de outras origens (formulário do site, importação manual).

### 4. Migração de dados existentes
Antes de criar o índice, consolidar duplicados já presentes: manter o registro mais antigo de cada número (por `created_at`) e apagar os demais. Depois criar o índice.

### 5. Tratamento de erro no insert
Se o insert ainda falhar por violação do índice único (23505), o webhook trata como “já existe” — não é erro, apenas loga e segue com a resposta ao WhatsApp normalmente.

## Detalhes técnicos

Arquivos alterados:
- `supabase/functions/ziontalk-webhook/index.ts`
  - substitui `formatWhatsapp` por `digitsOnlyBR` + `toE164BR`;
  - `upsertLead` faz `select` com filtro `whatsapp ilike '%<last10>'` (ou usa RPC) antes de inserir;
  - captura erro `23505` como no-op.
- Nova migração:
  - dedup dos leads existentes por `right(digits,10)` (mantém o mais antigo);
  - cria `UNIQUE INDEX` funcional descrito acima.

Sem mudança no painel `/admin` nem em outros fluxos.
