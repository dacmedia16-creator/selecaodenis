## Objetivo
Trocar a imagem de preview que aparece quando o link `recrutamax.com.br` é compartilhado no WhatsApp/redes sociais (Open Graph image).

## O que fazer
1. Copiar a nova imagem (mãe com filhos + RE/MAX) para `public/og-image.png` para que fique acessível em `https://recrutamax.com.br/og-image.png`.
2. Em `index.html`, atualizar as duas meta tags:
   - `<meta property="og:image" ...>`
   - `<meta name="twitter:image" ...>`
   apontando para `https://recrutamax.com.br/og-image.png`.
3. Atualizar também o `og:title`, `twitter:title`, `og:description`, `twitter:description` e `<title>` para refletir a nova landing (foco em mães/recomeço de carreira), já que `/nova-carreira` agora é a home:
   - Título: "RE/MAX — Seu recomeço de carreira pode começar agora"
   - Descrição: "Uma nova carreira para mães que querem voltar a crescer, gerar renda e ter mais liberdade. Conheça a oportunidade RE/MAX em Sorocaba/SP."

## Observação importante
O cache do WhatsApp guarda a imagem antiga por dias. Após publicar, será necessário forçar a atualização usando o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) colando a URL e clicando em "Scrape Again".