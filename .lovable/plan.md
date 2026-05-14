## Gerar HTML 100% offline com imagens em base64

**Objetivo:** Criar um arquivo HTML autocontido em `/mnt/documents/pagina_completa_offline.html` que possa ser aberto sem internet.

### Etapas

1. Ler o HTML existente em `/mnt/documents/pagina_completa.html`.
2. Rodar um script Python que:
   - Encontre todas as referências a imagens (`<img src>`, `srcset`, `<source>`, `background-image` em `style=`, `<link rel="icon">`, `og:image`, etc.).
   - Baixe cada recurso (HTTP/HTTPS) com `requests`.
   - Converta para `data:<mime>;base64,...` e substitua no HTML.
   - Faça o mesmo para fontes/CSS externos relevantes (Google Fonts) — opcional, para preservar a tipografia offline.
   - Remova/neutralize scripts que dependem de rede (analytics, etc.) para evitar erros offline.
3. Salvar o resultado em `/mnt/documents/pagina_completa_offline.html`.
4. Validar: verificar tamanho final e abrir uma prévia do arquivo para confirmar que renderiza.
5. Entregar via `<presentation-artifact>` para download.

### Observações
- O arquivo final pode ficar grande (vários MB) por causa do base64 — isso é esperado.
- Não altera nenhum código do projeto, é apenas geração de artefato.
