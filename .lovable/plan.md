## Gerar versão offline fiel via build de produção

### O que vou fazer

1. Rodar `npm run build` no projeto para gerar a pasta `dist/` com:
   - `index.html` final
   - CSS do Tailwind compilado
   - JS bundle do React/Vite com hashes
   - Todas as imagens importadas via `@/assets/...` já processadas
2. Ajustar o `vite.config.ts` temporariamente (ou usar flag) para `base: "./"` no build, garantindo que os caminhos fiquem **relativos** — assim o `index.html` abre direto com duplo clique (`file://`) sem servidor.
3. Compactar `dist/` em `/mnt/documents/site_offline.zip`.
4. Entregar o ZIP via `<presentation-artifact>` para download.

### Como usar depois
- Descompactar o ZIP
- Abrir `index.html` no navegador (duplo clique)
- Todas imagens, fontes e estilos carregam localmente

### Observação
- Conteúdo que depende de chamadas ao backend (envio do formulário de lead) não funciona offline — é só visualização.
- O build é só um artefato; não altero código do projeto de forma permanente (se mexer no `vite.config.ts` para `base`, reverto ao final).
