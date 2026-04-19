
The user wants me to test the form end-to-end. This requires browser automation (to fill the form) plus checking DB and edge function logs. All of this needs the browser tool + supabase tools — these are available in default mode after plan approval.

Let me present a concise plan for the test.

## Plano de teste end-to-end

**1. Abrir o preview no /#formulario (viewport mobile, já que o usuário está em 390x844)**

**2. Preencher o formulário com dados de teste**
- Nome: "Teste Lovable"
- WhatsApp: "(15) 99999-0000"
- E-mail: "teste-lovable@exemplo.com"
- Cidade: "Sorocaba/SP"
- Já é corretor: "Não, quero entrar"
- Motivação: "Teste automatizado de integração ZionTalk"

**3. Enviar e observar**
- Confirmar toast de sucesso
- Confirmar tela de sucesso ("Cadastro recebido!")
- Verificar se a aba do wa.me foi aberta (via console/network logs)

**4. Verificar persistência no banco**
- Query `SELECT * FROM leads WHERE email = 'teste-lovable@exemplo.com'`
- Confirmar que o registro existe com os dados certos

**5. Verificar disparo da ZionTalk**
- Ler logs da edge function `submit-lead`
- Procurar por `[submit-lead] ZionTalk OK: 201` (sucesso) ou `ZionTalk failed` (erro)
- Se falhar, reportar status code + body retornado pela ZionTalk

**6. Limpar (opcional)**
- Não vou deletar o lead de teste — fica no banco como prova do teste. Se você quiser, depois eu removo.

**7. Reportar resultados** com 3 checkmarks claros:
- [ ] Lead salvo no DB
- [ ] Notificação ZionTalk enviada (Denis precisa confirmar visualmente que chegou no WhatsApp dele)
- [ ] wa.me aberto pro lead

### Observação importante
Eu consigo confirmar (1) e (3) automaticamente. Para (2), só consigo confirmar que **a ZionTalk respondeu 201/sucesso** — a confirmação visual de que a mensagem chegou no WhatsApp do Denis depende dele olhar o celular. Vou reportar exatamente o que a API retornou.
