## Substituição dos logos pelo novo branding RMX

Você enviou dois arquivos do novo logo RecrutaMax:
- `RMX_Logo_2026_UE-01.png` — versão "horizontal" (balão posicionado à esquerda em canvas amplo)
- `Aplicações_-_Balão_Balão_-_Sem_fundo_-_01_1.png` — apenas o balão (ícone quadrado, fundo transparente)

Hoje o site usa `src/assets/remax-unica-escolha.png` via `<RemaxLogo>` no Header e no Footer (com `variant="light"` invertendo para branco).

### Mudanças

1. **Subir os dois novos arquivos como Lovable Assets** (CDN, sem inchar o repo):
   - `src/assets/rmx-logo-horizontal.png.asset.json`
   - `src/assets/rmx-logo-balao.png.asset.json`

2. **Atualizar `src/components/RemaxLogo.tsx`**:
   - Trocar a fonte da imagem para o novo logo horizontal (`rmx-logo-horizontal.png`).
   - Remover o efeito `brightness-0 invert` da variante `light` — o novo logo já é colorido (vermelho/azul/marinho) e fica legível tanto sobre fundo claro quanto sobre o fundo escuro do footer. A prop `variant` é mantida para compatibilidade, mas vira no-op.
   - Atualizar o `alt` para "RecrutaMax".
   - Ajustar `width`/`height` ao novo aspect ratio do arquivo.

3. **Favicon e PWA icon** (usando o balão quadrado):
   - Copiar `Aplicações_-_Balão...png` para `public/favicon.png` e `public/apple-touch-icon.png`.
   - Remover `public/favicon.ico` (ou substituí-lo) para o browser não cair no antigo.
   - `index.html` já referencia `/favicon.png` e `/apple-touch-icon.png`, então não muda.

4. **Não mexer** em: og-image, conteúdo do site, Admin, edge functions, build offline.

### Verificação após implementar
- `browser--view_preview` na `/` para conferir Header e Footer com o novo logo.
- Conferir favicon no preview.

### Pergunta rápida
O arquivo "horizontal" que você enviou é, na prática, só o balão posicionado à esquerda num canvas largo (sem texto "RecrutaMax" ao lado). Quer mesmo usar essa versão no Header, ou prefere que eu use o **balão quadrado** centralizado tanto no Header quanto no Footer? Se não responder, sigo o plano acima (horizontal no Header, balão no favicon).
