# Enviar aos gestores os 42 leads de outubro que não finalizaram

## O que vou fazer
Envio único, manual. O funil não muda.

Para cada um dos 42 leads de outubro (01/10 a 20/10) que não terminaram o questionário, mando **uma mensagem** pelo WhatsApp (ZionTalk) para os dois gestores, **15 98178-8214** e **15 99637-0990**.

Modelo da mensagem:

```text
📋 Lead incompleto — RE/MAX (envio X de 42)

Nome: ...
WhatsApp: ...
Cidade: ...
Entrou em: DD/MM HH:MM
Origem: WhatsApp / Formulário do site

Respostas:
- Pergunta 1: resposta
- ...

Parou na pergunta N de 8.
```

Para leads do formulário do site, a mensagem inclui o e-mail e o que a pessoa escreveu no formulário.

## Envio aos poucos, para o WhatsApp não ser banido
- Envio um lead de cada vez, do mais antigo para o mais recente.
- Espero **de 60 a 90 segundos** (variando) entre um lead e o próximo. Entre o envio para um gestor e o envio para o outro, espero alguns segundos.
- O envio é feito em blocos de cerca de 7 leads, com uma pausa entre os blocos. Leva uns **60 a 70 minutos** no total.
- Se der erro em algum envio, paro, anoto e retomo de onde parou. Assim ninguém recebe a mesma mensagem duas vezes.
- No fim, aviso quantos foram enviados com sucesso.

## Detalhes técnicos
- Os dados vêm da lista de leads, com o filtro: criados em outubro de 2026 (horário de Brasília) e que não chegaram ao fim do funil.
- As respostas guardadas são associadas ao texto de cada pergunta, na mesma ordem usada pelo funil.
- O envio usa o mesmo serviço de mensagens e a mesma chave já usados pelo funil, chamados por um script temporário fora do projeto. O andamento fica salvo para o envio poder ser retomado.
