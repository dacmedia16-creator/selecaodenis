import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const ZIONTALK_API_KEY = Deno.env.get('ZIONTALK_API_KEY') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const MSG_30MIN = 'Oi, ainda tá por aí? 👀';
const MSG_24H = 'Oi! Ainda tem interesse em conhecer a oportunidade da RE/MAX?';

const admin = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

function whatsappToMobile(whatsapp: string): { mobilePhone: string; cd?: string } {
  const digits = whatsapp.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    return { mobilePhone: digits.slice(2), cd: '+55' };
  }
  return { mobilePhone: digits };
}

async function sendWhatsapp(mobilePhone: string, cd: string | undefined, msg: string) {
  if (!ZIONTALK_API_KEY) return { ok: false };
  const form = new FormData();
  form.append('msg', msg);
  form.append('mobile_phone', mobilePhone);
  if (cd) form.append('cd', cd);
  const auth = 'Basic ' + btoa(`${ZIONTALK_API_KEY}:`);
  const resp = await fetch('https://app.ziontalk.com/api/send_message/', {
    method: 'POST',
    headers: { Authorization: auth },
    body: form,
  });
  const bodyText = await resp.text();
  console.log(`[funnel-followup] send -> ${resp.status} to ${mobilePhone} | "${msg.slice(0, 60)}" | ${bodyText.slice(0, 150)}`);
  return { ok: resp.ok };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (!admin) {
    return new Response(JSON.stringify({ ok: false, error: 'admin_not_configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const now = Date.now();
  const t30 = new Date(now - 30 * 60 * 1000).toISOString();
  const t24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  try {
    // Buscar leads ativos no funil
    const { data: leads, error } = await admin
      .from('leads')
      .select('id, whatsapp, funnel_step, funnel_last_question_at, funnel_followup_stage')
      .gte('funnel_step', 1)
      .lte('funnel_step', 7)
      .not('funnel_last_question_at', 'is', null)
      .lt('funnel_followup_stage', 2)
      .limit(200);

    if (error) throw error;

    let sent30 = 0;
    let sent24 = 0;

    for (const lead of leads ?? []) {
      const lastAt = new Date(lead.funnel_last_question_at as string).getTime();
      const stage: number = lead.funnel_followup_stage ?? 0;
      const { mobilePhone, cd } = whatsappToMobile(lead.whatsapp as string);
      if (!mobilePhone) continue;

      // 24h vem primeiro (pula direto pro final se aplicável)
      if (stage < 2 && lastAt <= new Date(t24h).getTime()) {
        const r = await sendWhatsapp(mobilePhone, cd, MSG_24H);
        if (r.ok) {
          await admin.from('leads').update({ funnel_followup_stage: 2 }).eq('id', lead.id);
          sent24++;
        }
        continue;
      }
      if (stage < 1 && lastAt <= new Date(t30).getTime()) {
        const r = await sendWhatsapp(mobilePhone, cd, MSG_30MIN);
        if (r.ok) {
          await admin.from('leads').update({ funnel_followup_stage: 1 }).eq('id', lead.id);
          sent30++;
        }
      }
    }

    return new Response(
      JSON.stringify({ ok: true, checked: leads?.length ?? 0, sent_30min: sent30, sent_24h: sent24 }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('[funnel-followup] error:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
