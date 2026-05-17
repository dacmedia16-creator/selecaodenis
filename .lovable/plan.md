## HTML único autocontido (abre com duplo clique)

### Passos
1. Instalar `vite-plugin-singlefile` como devDependency.
2. Criar um config Vite separado (`vite.config.singlefile.ts`) com:
   - `base: "./"`
   - plugin `viteSingleFile()` para inlinear JS + CSS dentro do `index.html`
   - `build.assetsInlineLimit: 100000000` para embutir imagens em base64
   - `outDir: "dist-single"`
3. Rodar `npx vite build --config vite.config.singlefile.ts`.
4. Copiar `dist-single/index.html` para `/mnt/documents/site_offline_single.html`.
5. Entregar via `<presentation-artifact>`.

### Observação
- O arquivo deve ficar grande (~25MB) por causa das imagens inline — esperado.
- Não altera `vite.config.ts` original (é um config separado só pro export).
- Formulário de lead continua não funcionando offline (depende do backend).
