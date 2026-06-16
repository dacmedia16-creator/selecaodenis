## Plano: Fundo escuro no Header para destacar o logo

### Contexto
O Header atual inicia com `bg-transparent` (transparente) no topo da página e só ganha fundo ao rolar. Com o novo logo colorido (balão RE/MAX), o usuário quer um fundo mais escuro no header para garantir visibilidade e contraste.

### Alteração proposta
- **Arquivo:** `src/components/landing/Header.tsx`
- **Mudança:** Substituir `bg-transparent` no estado inicial (não scrollado) por um fundo escuro sólido ou semitransparente, por exemplo:
  - Opção A: `bg-primary-deep` (azul escuro da marca)
  - Opção B: `bg-[hsl(220,25%,12%)]` (quase preto, tom do `--foreground`)
  - Opção C: `bg-background/95 backdrop-blur-md` (branco escurecido com blur)

### Ajuste no logo
- Se necessário, ajustar classes do `<RemaxLogo />` para garantir legibilidade no fundo escuro (ex: versão `light` ou contraste adequado).

### Escopo limitado
- Apenas o componente `Header.tsx` será alterado.
- Sem impacto no comportamento de scroll (`scrolled`) — o header continua fixo e responde ao scroll normalmente.

---

**Aguardando confirmação ou preferência de tom (azul escuro, quase preto, etc.) para prosseguir.**