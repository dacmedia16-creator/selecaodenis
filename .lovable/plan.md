
# Adicionar bloco "Resultados RE/MAX Única Escolha" nas duas páginas

Criar uma seção visual com os 4 números da unidade e exibir tanto na home (`/`) quanto na página `/nova-carreira`.

## Números exibidos

- **1.500** transações no ano passado
- **R$ 140 MI** — VGV (Valor Geral de Vendas)
- **51–71%** crescimento no trimestre
- **120%** projeção de crescimento em 2026

## Componente novo

**Arquivo:** `src/components/landing/UnicaEscolhaStats.tsx`

- Seção full-width com fundo escuro (`gradient-dark`) e blobs azul + vermelho — segue o padrão visual da seção `Proof` da home
- Título: "Você entra em uma **unidade em pleno crescimento**"
- Grid de 4 cards translúcidos (1 col mobile / 2 tablet / 4 desktop), cada um com ícone (Building2, TrendingUp, LineChart, Rocket) + número grande + label
- Animação `useCountUp` reaproveitada para os números (1500, 140, 120). O range "51–71%" fica fixo
- Rodapé pequeno: "Resultados consolidados da RE/MAX Única Escolha — Sorocaba/SP"

## Integração

**`src/pages/Index.tsx`** — inserir `<UnicaEscolhaStats />` **entre `<Proof />` e `<Vendidos />`** (encadeia naturalmente: prova individual do Denis → prova da unidade → imóveis vendidos).

**`src/pages/NovaCarreira.tsx`** — inserir `<UnicaEscolhaStats />` **entre `<ConquistasPossiveis />` e `<MitosQueTravam />`** (mostra que o ambiente onde elas vão entrar está crescendo forte, antes de derrubar objeções).
