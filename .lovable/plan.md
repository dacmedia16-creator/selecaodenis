## Corrigir destino dos CTAs com formulário oculto

### Problema
O wrapper `hidden` (display:none) remove o `FormSection` do layout, então os links `#formulario` rolam até o próximo elemento visível (`FinalCTA`).

### Solução
Substituir o wrapper `hidden` por uma **seção placeholder vazia** com `id="formulario"` que ocupa espaço vertical equivalente, fazendo os CTAs rolarem para o "lugar" do formulário antigo.

Em `src/pages/NovaCarreira.tsx`, trocar:

```tsx
<div aria-hidden="true" className="hidden">
  <FormSection />
</div>
```

por:

```tsx
<section id="formulario" aria-hidden="true" className="py-20 md:py-28" />
```

Isso:
- Mantém a âncora `#formulario` no DOM como alvo de scroll.
- Reserva espaço vertical (mesmo padding usado pelo `FormSection`) sem mostrar nada.
- Remove totalmente o formulário da página (sem campos ocultos no DOM).
- Não altera nenhum CTA — todos continuam funcionando.

### Arquivo afetado
- `src/pages/NovaCarreira.tsx` (também remover o import não usado de `FormSection`)