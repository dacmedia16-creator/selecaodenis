## Objetivo
Fazer com que a página `/nova-carreira` seja exibida na rota raiz `/` do site.

## Mudanças

**Arquivo:** `src/App.tsx`

- A rota `/` passará a renderizar o componente `NovaCarreira` (atualmente renderiza `Index`).
- A rota `/nova-carreira` continuará funcionando e também renderizará `NovaCarreira`, para não quebrar links existentes.
- A página antiga `Index` ficará acessível em `/antiga` (preservada para referência; podemos remover depois se você quiser).

```tsx
<Route path="/" element={<NovaCarreira />} />
<Route path="/nova-carreira" element={<NovaCarreira />} />
<Route path="/antiga" element={<Index />} />
```

## Observações
- Nenhum componente precisa ser modificado, apenas o roteamento.
- SEO (title/description/canonical) já é configurado dinamicamente dentro de `NovaCarreira.tsx` via `useEffect`, então funcionará normalmente na raiz.

Me confirme se quer manter a página antiga acessível em `/antiga` ou removê-la totalmente.