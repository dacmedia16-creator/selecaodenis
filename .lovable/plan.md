
# Landing Page Premium — Recrutamento RE/MAX | Denis Souza

## Visão geral
Landing page de alta conversão, premium e responsiva, contando a história real do Denis Souza para captar leads de corretores e pessoas que querem entrar no mercado imobiliário.

## Direção visual
- **Paleta**: azul RE/MAX (#003DA5), vermelho RE/MAX (#DC1C2E), branco, com fundos neutros (off-white e azul profundo) para hierarquia.
- **Tipografia**: títulos em sans-serif forte (Plus Jakarta Sans / Inter Bold) com pesos altos; corpo em Inter regular para leitura.
- **Estilo**: clean, premium, generoso em espaçamento. Cards com sombras suaves, bordas arredondadas, divisores sutis.
- **Animações**: fade-in + leve translate ao rolar, contadores animados nos números, hover suave em cards e CTAs.
- **Ícones**: Lucide (modernos, traço fino).
- **Placeholders elegantes**: silhueta gradiente para foto do Denis e logo "RE/MAX" estilizado em texto + balão (ícone vetorial). Você substitui depois.

## Estrutura das seções
1. **Header fixo** — logo RE/MAX (texto estilizado), nome Denis Souza, CTA "Quero saber mais" no canto.
2. **Hero / Primeira dobra** — split layout: à esquerda headline forte, subheadline, dois CTAs e badges de prova (R$ 1MM+, premiações, do zero, alta performance); à direita foto em moldura premium com balão RE/MAX flutuante e selo "Única Escolha • Sorocaba/SP".
3. **Minha história** — bloco emocional com timeline visual (antes → método → resultado), aspas em destaque, foto secundária opcional.
4. **Essa oportunidade é para você?** — duas colunas/cards lado a lado: "Para corretores" (azul) e "Para quem vem de outras áreas" (vermelho), cada um com tópicos com ícones.
5. **Por que a RE/MAX acelera sua carreira** — grid de 6 benefícios com ícones, título e descrição curta.
6. **Prova e autoridade** — faixa escura com 4 números grandes animados (R$ 1MM+, <2 anos, premiações, alta performance) + selos/medalhas estilizados.
7. **O que você encontra aqui** — bloco com texto-âncora e lista visual de 6 tópicos.
8. **Formulário de captação** — card destacado, campos: Nome, WhatsApp, E-mail, Cidade, "Já atua no mercado?" (radio Sim/Não), "O que mais te chamou atenção?" (textarea opcional). Validação com Zod.
9. **CTA final** — faixa full-width com gradiente azul→vermelho, copy persuasiva e botão grande.
10. **Rodapé** — Denis Souza, RE/MAX Única Escolha, Sorocaba/SP, contato e aviso de privacidade.

## Funcionalidade do formulário
- Validação client-side robusta (Zod) com mensagens claras.
- **Envio paralelo**:
  - **E-mail** via Lovable Cloud + edge function (Lovable Emails — built-in, sem necessidade de Resend) para um e-mail de destino que você informa.
  - **Salva o lead** no banco (Lovable Cloud) para histórico.
  - **WhatsApp Zion**: envio dos dados para a API da Zion (você informa endpoint + token na implementação — guardo como secrets).
  - **Redirect WhatsApp**: após submit, abre `wa.me/<numero>` em nova aba com a mensagem pré-preenchida:
    > "Olá, Denis! Acabei de ver sua página sobre a oportunidade na RE/MAX Única Escolha e quero saber mais sobre como posso fazer parte."
- Toast de sucesso + estado "Enviado".

## Backend (Lovable Cloud)
- Tabela `leads` com RLS (insert público, select restrito).
- Edge function `submit-lead`: valida payload, grava lead, dispara e-mail, chama Zion API.
- Secrets necessários (peço na implementação): `DENIS_NOTIFICATION_EMAIL`, `WHATSAPP_NUMBER`, `ZION_API_URL`, `ZION_API_TOKEN`.

## Mobile & performance
- Layout mobile-first, hero empilhado, CTAs grandes e fixos onde fizer sentido.
- Imagens otimizadas, animações leves (Intersection Observer), sem libs pesadas.

## Entregáveis desta etapa
- Página `/` completa com todas as 10 seções.
- Formulário funcional ligado a Lovable Cloud + Zion (após você fornecer credenciais).
- Design system aplicado em `index.css` e `tailwind.config.ts` com tokens das cores RE/MAX.
- Pronto para você trocar foto e logo oficiais depois.
