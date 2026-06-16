## Plano: Tornar o Header totalmente opaco

O fundo do Header ainda aparece transparente porque usei `/80` e `/95` de opacidade combinado com `backdrop-blur`. Vou trocar para um azul-marinho **100% sólido** em ambos os estados (com e sem scroll), garantindo contraste total com o logo.

### Alteração
- **Arquivo:** `src/components/landing/Header.tsx`
- Trocar `bg-[hsl(220_80%_12%)]/80` e `/95` por `bg-[hsl(220_80%_12%)]` sólido.
- Remover `backdrop-blur` (desnecessário em fundo opaco).
- Manter `shadow-soft` quando scrollado.