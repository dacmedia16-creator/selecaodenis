
O usuário quer que o app PWA (quando instalado na tela inicial) abra direto em `/admin` em vez de `/` (landing pública).

**Mudança simples:**

Editar `public/manifest.webmanifest`:
- `"start_url": "/"` → `"start_url": "/admin"`
- `"scope": "/"` mantém (para o app continuar funcionando em todas as rotas, incluindo `/auth` para login)

**Comportamento resultante:**
- Ao tocar no ícone do app instalado → abre direto em `/admin`
- Se não estiver logado → o `ProtectedRoute` redireciona para `/auth` automaticamente
- Após login → volta para `/admin`
- Site no navegador (sem instalar) continua abrindo em `/` normalmente

**Observação:** mudanças em `start_url` só têm efeito em instalações **novas** do PWA. Quem já adicionou o app à tela inicial antes precisa remover e reinstalar para pegar o novo `start_url`.
