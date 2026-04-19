
O usuário quer usar o **balão RE/MAX** (`src/assets/remax-balao.png`) como ícone do PWA, em vez do logo da unidade. Faz sentido — o balão é o símbolo icônico da marca, redondo, funciona perfeitamente como ícone de app.

**Plano:**

1. **Configurar PWA** com `vite-plugin-pwa` no `vite.config.ts`:
   - `name`: "RE/MAX Denis Souza"
   - `short_name`: "RE/MAX Denis"
   - `theme_color`: `#0052A5` (azul RE/MAX)
   - `background_color`: `#FFFFFF`
   - `display`: standalone
   - `start_url`: `/`

2. **Gerar ícones a partir do balão** (`remax-balao.png`) com fundo branco para garantir contraste em qualquer launcher:
   - `public/icon-192.png` (192×192)
   - `public/icon-512.png` (512×512)
   - `public/icon-maskable-512.png` (512×512, com padding seguro ~20% para Android adaptive icons não cortar o balão)
   - `public/apple-touch-icon.png` (180×180, iOS)
   - `public/favicon.ico` / `public/favicon.png` (substituir placeholder)

3. **Atualizar `index.html`** com:
   - `<link rel="manifest" href="/manifest.webmanifest">`
   - `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`
   - `<meta name="theme-color" content="#0052A5">`
   - `<meta name="apple-mobile-web-app-capable" content="yes">`
   - `<meta name="apple-mobile-web-app-title" content="RE/MAX Denis">`
   - Atualizar `<link rel="icon">` para o novo favicon

**Resultado:** ao "Adicionar à tela inicial" no celular, o app aparece com o balão RE/MAX vermelho/azul/branco como ícone, abre em modo fullscreen sem barra do navegador, e o admin continua acessível via `/admin` após login.
