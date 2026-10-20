import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Sends ONE queued partial lead per call to managers. Cron calls it hourly (7x/day) to avoid WhatsApp bans.
const MANAGERS = ['5515981788214', '5515996370990'];
const TOTAL = 42;
const Q: [string, string][] = [
  ['nome', 'Qual seu nome?'],
  ['cidade', 'Qual cidade você mora?'],
  ['trabalha_atualmente', 'Trabalha atualmente?'],
  ['renda_ou_profissao', 'Renda extra ou nova profissão?'],
  ['experiencia_vendas', 'Experiência com vendas/atendimento?'],
  ['disponibilidade_treinamento', 'Disponibilidade para treinamento?'],
  ['entende_comissao', 'Entende que é por comissão?'],
  ['interesse_conversa', 'Interesse em conversa sobre plano de carreira?'],
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const key = Deno.env.get('ZIONTALK_API_KEY')!;

  const { data: item } = await db.from('manager_notify_queue').select('*').is('sent_at', null)
    .order('position').limit(1).maybeSingle();
  if (!item) return Response.json({ done: true }, { headers: corsHeaders });

  const { data: l } = await db.from('leads').select('*').eq('id', item.lead_id).single();
  const site = l.funnel_step === 0;
  const a = (l.funnel_answers ?? {}) as Record<string, string>;
  const h = new Date(l.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '');
  const lines = [
    `📋 Lead incompleto — RE/MAX (envio ${item.position} de ${TOTAL})`, '',
    `Nome: ${l.name}`, `WhatsApp: ${l.whatsapp}`, `Cidade: ${l.city}`, `Entrou em: ${h}`,
    `Origem: ${site ? 'Formulário do site' : 'WhatsApp'}`,
  ];
  if (site) {
    lines.push(`E-mail: ${l.email}`, '', `O que a atraiu: ${l.attraction || '—'}`, '', 'Obs.: não respondeu às perguntas do funil no WhatsApp.');
  } else {
    const ans = Q.filter(([k]) => a[k]).map(([k, q]) => `- ${q}: ${a[k]}`);
    lines.push('', 'Respostas:', ...(ans.length ? ans : ['- (nenhuma)']), '', `Parou na pergunta ${l.funnel_step} de 8.`);
  }
  const msg = lines.join('\n');

  for (const m of MANAGERS) {
    const form = new FormData();
    form.append('msg', msg);
    form.append('mobile_phone', m);
    const r = await fetch('https://app.ziontalk.com/api/send_message/', {
      method: 'POST', headers: { Authorization: 'Basic ' + btoa(key + ':') }, body: form,
    });
    const t = await r.text();
    if (!r.ok) {
      console.error('[manager-notify-queue] fail', m, r.status, t);
      return Response.json({ error: r.status }, { status: 500, headers: corsHeaders });
    }
    await new Promise((res) => setTimeout(res, 5000));
  }
  await db.from('manager_notify_queue').update({ sent_at: new Date().toISOString() }).eq('lead_id', item.lead_id);
  return Response.json({ sent: item.position }, { headers: corsHeaders });
});
