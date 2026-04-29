
# Corrigir fundo escuro invisível em "Conquistas Possíveis"

O espaço vazio no print é a seção **"Conquistas Possíveis"** da `/nova-carreira`. O texto branco e os ícones brancos somem porque o fundo `gradient-dark` está sendo aplicado num `<div absolute -z-10>` que, em alguns contextos de empilhamento, fica atrás do `bg-background` da página inteira. Resultado: fundo branco + texto branco = espaço vazio.

## Correção

**Arquivo:** `src/components/landing/nova-carreira/ConquistasPossiveis.tsx`

Mover a classe `gradient-dark` direto pra `<section>` (em vez do div absoluto) e adicionar `isolate` pra garantir contexto de empilhamento próprio.

```tsx
<section className="relative isolate overflow-hidden gradient-dark py-20 md:py-28">
  {/* remove o div com gradient-dark */}
  <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(...)]" />
  ...
</section>
```

Vou aplicar a mesma garantia (`isolate`) no `UnicaEscolhaStats` também, já que ele usa o mesmo padrão e pode ter o mesmo bug.
