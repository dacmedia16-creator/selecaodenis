
# Landing page `/nova-carreira` — Para mães que querem recomeçar

Página dedicada a captar mulheres (especialmente mães) que pausaram a carreira e querem voltar ao mercado com flexibilidade e autonomia. Mesma identidade RE/MAX, tom mais acolhedor e humano. Mesmo formulário/destino do funil atual (`leads` no admin).

---

## Estrutura da página

1. **Header** — reaproveita `Header` existente
2. **Hero** — título emocional + foto/ilustração + CTA "Quero saber como"
3. **"Você se reconhece?"** — bloco de identificação (dores reais: rotina, filhos, escola, sensação de "estou fora há muito tempo")
4. **Histórias reais (anônimas)** — 3 depoimentos baseados nos contextos que você passou
5. **A virada — o que muda na RE/MAX** — flexibilidade, treinamento, ambiente, suporte
6. **Conquistas possíveis** — números reais (46+ vendas/ano, Clube do Milhão) com destaque emocional (escola particular, viagens, independência)
7. **Mitos que travam** — "sou velha demais", "preciso saber vender", "não tenho experiência" → derrubando objeções
8. **Formulário** — `LeadForm` existente (mesma tabela `leads`)
9. **CTA final + Footer**

---

## Conteúdo dos 3 depoimentos anônimos

Baseados nos contextos reais que você compartilhou — sem nomes, idades aproximadas, trajetória "antes → virada → depois":

**Depoimento 1 — A mãe que precisava de flexibilidade**
> "Tinha dois filhos em escola integral e achava impossível ter uma carreira de verdade. Precisava de uma rotina que não me prendesse das 8 às 18. Na RE/MAX descobri que podia organizar meu tempo do meu jeito — fechei 46 vendas no último ano e hoje pago a escola particular dos meus filhos com o meu trabalho."

**Depoimento 2 — A que entrou para o Clube do Milhão**
> "Passei anos achando que era 'só mãe'. Quando entrei na RE/MAX, não sabia nada do mercado imobiliário. Apliquei o método, confiei no processo e em pouco tempo entrei para o Clube do Milhão. Hoje viajo com a minha família sem precisar pedir autorização pra ninguém."

**Depoimento 3 — A que recuperou a independência**
> "Estava há mais de 8 anos fora do mercado de trabalho. Achei que ninguém ia me dar uma chance. A RE/MAX me deu treinamento, estrutura e um ambiente que respeita as minhas múltiplas responsabilidades. Hoje tenho minha renda, minhas escolhas e minha liberdade de volta."

Tom: emocional, real, específico (números e conquistas concretas), respeitando o anonimato.

---

## Bloco "Conquistas possíveis" (números)

Cards visuais destacando:
- **+46 vendas/ano** — meta real alcançada por mulheres da equipe
- **Clube do Milhão** — reconhecimento de alta performance
- **Escola particular dos filhos** — paga com o próprio trabalho
- **Viagens em família** — independência financeira real

---

## Detalhes técnicos

**Rota:** nova entrada em `src/App.tsx`:
```tsx
<Route path="/nova-carreira" element={<NovaCarreira />} />
```

**Arquivos novos:**
- `src/pages/NovaCarreira.tsx` — página principal (segue padrão de `Index.tsx`)
- `src/components/landing/nova-carreira/HeroMulheres.tsx`
- `src/components/landing/nova-carreira/VoceSeReconhece.tsx`
- `src/components/landing/nova-carreira/HistoriasReais.tsx`
- `src/components/landing/nova-carreira/AViradaRemax.tsx`
- `src/components/landing/nova-carreira/ConquistasPossiveis.tsx`
- `src/components/landing/nova-carreira/MitosQueTravam.tsx`

**Reaproveitados:** `Header`, `Footer`, `LeadForm` (`FormSection`), `FinalCTA` (com cópia adaptada se necessário, ou versão própria), `useRevealOnScroll`.

**Formulário:** usa `LeadForm` existente → mesma tabela `leads` no admin. Sem campos extras nem tag de origem (conforme aprovado).

**Visual:** mantém paleta RE/MAX (azul/vermelho/branco) + tokens existentes (`gradient-cta`, `gradient-soft`, `text-gradient-cta`), com mais respiro, tipografia mais humana e ícones temáticos (Heart, Home, Sparkles, Clock, GraduationCap do `lucide-react`).

**SEO:** `<title>` e meta description próprios para a rota (ex: "Recomeçar a carreira na RE/MAX — para mães que querem flexibilidade e independência").

---

## Não incluído neste plano

- Tag de origem do lead (você optou por mesma lista, sem distinção)
- Imagens novas (vou usar ícones + paleta; se quiser fotos representativas depois, geramos numa próxima rodada)
- Link no menu principal apontando para `/nova-carreira` (a página fica acessível por URL direta / campanha; me avise se quiser adicionar no menu)
