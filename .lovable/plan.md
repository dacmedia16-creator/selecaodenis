## Trocar HashRouter por MemoryRouter no build offline

### Problema
Com `HashRouter`, links `<a href="#formulario">` mudam o hash para `#formulario`, e o router tenta navegar para a rota `/formulario` (que não existe), exibindo o 404. As âncoras de scroll quebram.

### Solução
1. Editar `scripts/react-router-dom-hash-shim.ts` para re-exportar `MemoryRouter` no lugar de `BrowserRouter` (com `initialEntries={["/"]}`).
   - `MemoryRouter` mantém o estado de rota em memória, sem tocar na URL → o `#formulario` continua sendo só uma âncora HTML pura.
2. Rebuild com `npx vite build --config vite.config.singlefile.ts`.
3. Substituir `/mnt/documents/site_offline_single.html` e entregar.

### Verificação
- Servir o arquivo via servidor local temporário e abrir no browser tool.
- Confirmar: página renderiza Hero, clicar no botão "Quero saber mais" rola até o formulário (`#formulario`).
- Confirmar links externos (WhatsApp `wa.me/...`) abrem normal.

### Limitação aceita
- Sem back/forward de rotas, sem deep link para `/nova-carreira` no offline. Vou avisar isso na entrega — se você quiser que `/nova-carreira` também funcione offline, posso gerar um segundo HTML específico para essa rota.
