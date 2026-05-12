## Ocultar Formulário (mantendo âncora)

### Objetivo
Esconder visualmente a seção do formulário na página `/nova-carreira`, mas manter a âncora `#formulario` no DOM para que todos os CTAs continuem rolando até o mesmo ponto da página (sem alterar comportamento dos botões).

### Alteração

Em `src/pages/NovaCarreira.tsx`, envolver `<FormSection />` em um wrapper oculto acessível, preservando o `id="formulario"` como alvo de scroll:

```tsx
<div aria-hidden="true" className="hidden">
  <FormSection />
</div>
```

Como o `FormSection` já renderiza `<section id="formulario">`, o âncora continua existindo no DOM e os links `href="#formulario"` continuam funcionando — apenas sem nada visível no destino.

### O que NÃO muda
- Nenhum CTA é alterado (Header, Hero, InlineCTAs, FinalCTA continuam apontando para `#formulario`).
- Rastreamento de cliques (`trackCtaClick`) intacto.
- Edge function, banco e admin permanecem como estão (formulário pode ser reativado depois removendo o wrapper).

### Arquivo afetado
- `src/pages/NovaCarreira.tsx`