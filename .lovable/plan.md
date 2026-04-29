# Diminuir badge "Sorocaba/SP"

O badge no canto superior esquerdo da imagem do Hero (página `/nova-carreira`) ainda está cobrindo parte do rosto da mulher. Vou reduzir o tamanho geral mais uma vez.

## Mudança

**Arquivo:** `src/components/landing/nova-carreira/HeroMulheres.tsx` (linhas 83-86)

- Texto: `text-[6px]` → `text-[5px]`
- Padding vertical: `py-0.5` → `py-[1px]`
- Padding horizontal: mantém `px-1`
- Ícone MapPin: `h-1.5 w-1.5` → `h-1 w-1`

Resultado: badge ainda menor e mais discreto, deixando o rosto da mulher mais visível por trás.

## Dica

Para ajustes finos como esse, o **Visual Edits** (botão no canto inferior esquerdo do chat) é mais rápido e não consome créditos para mudanças de texto/cor/fonte.
