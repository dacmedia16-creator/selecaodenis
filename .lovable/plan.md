# Adicionar pergunta "Qual cidade você mora?" ao funil do WhatsApp

## Objetivo
Incluir uma nova pergunta de cidade no funil de qualificação que o lead recebe via WhatsApp, e salvar a resposta no campo `city` do lead (hoje fica como "Não informado").

## Decisão de posicionamento
A pergunta de cidade entrará como **pergunta #2**, logo após o nome. Motivo: cidade é informação demográfica básica (como o nome), faz sentido coletar cedo antes das perguntas de qualificação profissional. Ordem atual:

1. Qual seu nome?
2. **Qual cidade você mora?** ← NOVA
3. Você trabalha atualmente?
4. Está buscando renda extra ou uma nova profissão?
5. Já trabalhou com vendas ou atendimento?
6. Você tem disponibilidade para treinamento?
7. Você entende que corretor trabalha por comissão, sem salário fixo no início?
8. Se fizer sentido, você teria interesse em participar de uma conversa para conhecer o plano de carreira da RE/MAX?

## Mudanças (somente no edge function `ziontalk-webhook`)
Arquivo: `supabase/functions/ziontalk-webhook/index.ts`

1. Inserir no array `QUESTIONS`, na posição 2:
   `{ key: 'cidade', question: 'Qual cidade você mora?' }`
2. Após aceitar a resposta, atualizar o campo `city` do lead (igual já é feito para `name` quando `key === 'nome'`):
   ```ts
   if (currentQ.key === 'cidade' && validation.resposta_normalizada) {
     patch.city = validation.resposta_normalizada.slice(0, 120);
   }
   ```

Nenhuma migração de banco é necessária — a coluna `city` já existe na tabela `leads`.

## Observações
- Leads existentes que já responderam o funil não serão reafetados (o `funnel_step` deles já passou).
- A notificação ao gestor já lista todas as perguntas via `QUESTIONS.map(...)`, então a nova pergunta aparece automaticamente no resumo enviado aos números +55 15 98178-8214 e +55 15 98188-8214.
- Após editar, reimplantar o edge function.

## Validação
- Checar que o edge function publica sem erro.
- Opcional: disparar um teste manual para confirmar a ordem das perguntas.
