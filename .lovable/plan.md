## Problema

Na página `/nova-carreira` (página principal), o `#formulario` foi substituído por uma `<section>` vazia (`aria-hidden`), então o formulário de lead não aparece — só restou o espaço em branco antes do CTA final.

## Mudança

Em `src/pages/NovaCarreira.tsx`:

1. Importar `FormSection` de `@/components/landing/FormSection`.
2. Substituir a linha:
   ```tsx
   <section id="formulario" aria-hidden="true" className="py-20 md:py-28" />
   ```
   por:
   ```tsx
   <FormSection />
   ```

O `FormSection` já possui `id="formulario"`, então todas as âncoras (`#formulario`) dos CTAs (Header, Hero, InlineCTAs, FinalCTA) voltam a rolar até o formulário e o usuário consegue enviar os dados.

Nenhuma outra alteração necessária — o `LeadForm` e a edge function `submit-lead` continuam funcionando.
