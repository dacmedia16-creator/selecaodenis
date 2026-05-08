## Objetivo
Adicionar mais CTAs ("Quero saber como" → âncora `#formulario`) ao longo da landing `/` para que o visitante encontre um botão de ação a qualquer ponto da rolagem. Hoje só existem CTAs no Header, Hero e FinalCTA — entre eles há ~7 seções sem nenhum botão.

## Onde adicionar
Inserir um CTA curto e centralizado ao final das seções de maior peso emocional/persuasivo:

1. **Após `HistoriasReais`** — momento de identificação após ler depoimentos reais.
   - Texto: "Quero viver uma história assim"
2. **Após `AViradaRemax`** — depois de entender a virada de chave da RE/MAX.
   - Texto: "Quero saber como começar"
3. **Após `ConquistasPossiveis`** — depois de visualizar o que é possível conquistar.
   - Texto: "Quero essa oportunidade"
4. **Após `MitosQueTravam`** — fechando objeções, antes do formulário.
   - Texto: "Estou pronta para começar"

## Como fazer (técnico)
- Criar um componente reutilizável `src/components/landing/nova-carreira/InlineCTA.tsx` que renderiza uma faixa enxuta (frase curta + botão) apontando para `#formulario`.
- Props: `headline` e `buttonText` (ambos opcionais com defaults).
- Usar tokens do design system (cores semânticas, sem cores hardcoded), mesmo estilo de botão já usado em `HeroMulheres` / `FinalCTA` para manter consistência visual.
- Incluir animação de reveal (mesmo padrão `useRevealOnScroll` já presente).
- Em `src/pages/NovaCarreira.tsx`, intercalar `<InlineCTA ... />` entre as seções listadas acima.

## Fora de escopo
- Não alterar conteúdo das seções existentes.
- Não mudar o formulário, Header ou FinalCTA.
- Não criar novas páginas/rotas.
