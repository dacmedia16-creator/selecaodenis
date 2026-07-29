import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const ZIONTALK_API_KEY = Deno.env.get('ZIONTALK_API_KEY') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY') ?? '';

const admin = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

// ==================== FUNIL DE PERGUNTAS ====================

const OPENING =
  'Oi, tudo bem? Vi que você se interessou pela oportunidade de carreira na RE/MAX. Antes de te explicar tudo, posso te fazer algumas perguntinhas rápidas para entender se faz sentido para você?';

type FunnelQuestion = { key: string; question: string };

const QUESTIONS: FunnelQuestion[] = [
  { key: 'nome', question: 'Qual seu nome?' },
  { key: 'trabalha_atualmente', question: 'Você trabalha atualmente?' },
  { key: 'renda_ou_profissao', question: 'Está buscando renda extra ou uma nova profissão?' },
  { key: 'experiencia_vendas', question: 'Já trabalhou com vendas ou atendimento?' },
  { key: 'disponibilidade_treinamento', question: 'Você tem disponibilidade para treinamento?' },
  { key: 'entende_comissao', question: 'Você entende que corretor trabalha por comissão, sem salário fixo no início?' },
  { key: 'interesse_conversa', question: 'Se fizer sentido, você teria interesse em participar de uma conversa para conhecer o plano de carreira da RE/MAX?' },
];

const FINAL_MESSAGE =
  'Perfeito! Acesse www.recrutamax.com.br para conhecer mais. Logo a RE/MAX vai entrar em contato com você. 🏡';

const ALREADY_DONE_MESSAGE =
  'Já recebemos seus dados por aqui 🙌 Em breve a RE/MAX entra em contato. Enquanto isso, dá uma olhada em www.recrutamax.com.br';

// ==================== HELPERS ====================

function pickName(payload: any): string {
  const n =
    payload?.contato?.nome ??
    payload?.contato?.primeiro_nome ??
    payload?.contact?.name ??
    payload?.name;
  if (typeof n === 'string' && n.trim().length > 0) return n.trim();
  return 'Contato WhatsApp';
}

function pickChannel(payload: any): string | null {
  const c = payload?.mensagem?.canal ?? payload?.message?.channel ?? payload?.channel;
  return typeof c === 'string' && c.trim().length > 0 ? c.trim() : null;
}

function pickMessageText(payload: any): string {
  const candidates = [
    payload?.mensagem?.texto,
    payload?.mensagem?.conteudo,
    payload?.message?.text,
    payload?.message?.body,
    payload?.message?.content,
    payload?.text,
    payload?.body,
    payload?.content,
    payload?.data?.message?.text,
    payload?.data?.text,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim().length > 0) return c.trim();
  }
  return '';
}

function digitsOnlyBR(mobilePhone: string, cd?: string): string {
  const raw = `${cd ?? ''}${mobilePhone}`.replace(/\D/g, '');
  if (raw.startsWith('55') && (raw.length === 12 || raw.length === 13)) return raw;
  if (raw.length === 10 || raw.length === 11) return `55${raw}`;
  return raw;
}

function toE164BR(digits: string): string {
  return `+${digits}`;
}

function normalizePhone(rawPhone: string): { mobilePhone: string; cd?: string } {
  const trimmed = rawPhone.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    return { mobilePhone: digits.slice(2), cd: '+55' };
  }
  if (trimmed.startsWith('+')) return { mobilePhone: trimmed };
  return { mobilePhone: digits || trimmed };
}

function pickPhone(payload: any): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const candidates = [
    payload.contato?.telefone,
    payload.contato?.phone,
    payload.contato?.mobile_phone,
    payload.mobile_phone,
    payload.phone,
    payload.telefone,
    payload.from,
    payload.sender,
    payload.contact?.phone,
    payload.contact?.mobile_phone,
    payload.message?.from,
    payload.message?.mobile_phone,
    payload.message?.phone,
    payload.data?.from,
    payload.data?.mobile_phone,
    payload.data?.phone,
    payload.data?.contato?.telefone,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim().length > 0) return c.trim();
  }
  return null;
}

function isInbound(payload: any): boolean {
  const direction =
    payload?.direction ?? payload?.message?.direction ?? payload?.data?.direction ??
    payload?.type ?? payload?.message?.type;
  if (typeof direction === 'string') {
    const d = direction.toLowerCase();
    if (['outbound', 'out', 'sent', 'outgoing'].includes(d)) return false;
  }
  const fromMe =
    payload?.from_me ?? payload?.is_from_me ??
    payload?.message?.from_me ?? payload?.data?.from_me;
  if (fromMe === true) return false;
  return true;
}

// ==================== SEND ====================

async function sendWhatsapp(mobilePhone: string, cd: string | undefined, msg: string) {
  if (!ZIONTALK_API_KEY) {
    console.error('[ziontalk-webhook] ZIONTALK_API_KEY not configured');
    return { ok: false, status: 500 };
  }
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
  console.log(
    `[ziontalk-webhook] send -> ${resp.status} to ${mobilePhone}${cd ? ` cd=${cd}` : ''} | msg="${msg.slice(0, 80)}" | body: ${bodyText.slice(0, 200)}`,
  );
  return { ok: resp.ok, status: resp.status };
}

const FINAL_VIDEO_URL =
  'https://recrutamax.com.br/__l5e/assets-v1/7650928e-cea2-40a8-ba1b-b544cb0803ce/video-boas-vindas.mp4';
const FINAL_VIDEO_CAPTION = 'Dá uma olhada nesse vídeo rapidinho 👇';

async function sendWhatsappVideo(mobilePhone: string, cd: string | undefined, msg: string) {
  if (!ZIONTALK_API_KEY) {
    console.error('[ziontalk-webhook] ZIONTALK_API_KEY not configured');
    return { ok: false, status: 500 };
  }
  const videoResp = await fetch(FINAL_VIDEO_URL);
  if (!videoResp.ok) {
    console.error(`[ziontalk-webhook] falha ao baixar vídeo: ${videoResp.status}`);
    return { ok: false, status: videoResp.status };
  }
  const blob = await videoResp.blob();
  const form = new FormData();
  form.append('msg', msg);
  form.append('mobile_phone', mobilePhone);
  if (cd) form.append('cd', cd);
  form.append('attachments', new File([blob], 'video-boas-vindas.mp4', { type: 'video/mp4' }));
  const auth = 'Basic ' + btoa(`${ZIONTALK_API_KEY}:`);
  const resp = await fetch('https://app.ziontalk.com/api/send_message/', {
    method: 'POST',
    headers: { Authorization: auth },
    body: form,
  });
  const bodyText = await resp.text();
  console.log(
    `[ziontalk-webhook] send video -> ${resp.status} to ${mobilePhone} | ${blob.size} bytes | body: ${bodyText.slice(0, 200)}`,
  );
  return { ok: resp.ok, status: resp.status };
}

// ==================== IA VALIDATION ====================

async function validateAnswerWithAI(
  question: string,
  userAnswer: string,
): Promise<{ faz_sentido: boolean; resposta_normalizada: string; pergunta_reformulada: string }> {
  if (!LOVABLE_API_KEY) {
    console.warn('[ziontalk-webhook] LOVABLE_API_KEY missing — aceitando resposta sem validação');
    return { faz_sentido: true, resposta_normalizada: userAnswer, pergunta_reformulada: question };
  }
  try {
    const systemPrompt = `Você é um assistente de triagem para recrutar corretores de imóveis da RE/MAX no Brasil.
Recebe UMA pergunta feita ao candidato e a resposta dele.
Decide se a resposta faz sentido/responde à pergunta (mesmo curta como "sim", "não", um nome, "tenho experiência", etc).
Se a resposta for evasiva, vazia, sem sentido, ou fugir totalmente do assunto, marque faz_sentido=false e reformule a pergunta de forma mais clara e simpática (mesmo teor).
Responda APENAS com JSON válido no formato:
{"faz_sentido": boolean, "resposta_normalizada": "texto limpo da resposta", "pergunta_reformulada": "reformulação da pergunta se faz_sentido=false, senão repita a original"}`;

    const userPrompt = `Pergunta: "${question}"\nResposta do candidato: "${userAnswer}"`;

    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Lovable-API-Key': LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      console.error(`[ziontalk-webhook] AI validation failed ${resp.status}: ${t.slice(0, 200)}`);
      return { faz_sentido: true, resposta_normalizada: userAnswer, pergunta_reformulada: question };
    }
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content);
    return {
      faz_sentido: !!parsed.faz_sentido,
      resposta_normalizada:
        typeof parsed.resposta_normalizada === 'string' && parsed.resposta_normalizada.trim().length > 0
          ? parsed.resposta_normalizada.trim()
          : userAnswer,
      pergunta_reformulada:
        typeof parsed.pergunta_reformulada === 'string' && parsed.pergunta_reformulada.trim().length > 0
          ? parsed.pergunta_reformulada.trim()
          : question,
    };
  } catch (e) {
    console.error('[ziontalk-webhook] AI validation exception:', String(e));
    return { faz_sentido: true, resposta_normalizada: userAnswer, pergunta_reformulada: question };
  }
}

// ==================== LEAD / FUNNEL ====================

async function upsertLeadAndGetState(payload: any, mobilePhone: string, cd?: string) {
  if (!admin) return null;
  const digits = digitsOnlyBR(mobilePhone, cd);
  const last10 = digits.slice(-10);
  if (last10.length < 10) return null;
  const whatsapp = toE164BR(digits);

  const { data: existing, error: selErr } = await admin
    .from('leads')
    .select('id, whatsapp, funnel_step, funnel_answers, funnel_retries')
    .ilike('whatsapp', `%${last10}`)
    .limit(1);
  if (selErr) {
    console.error('[ziontalk-webhook] lead lookup error:', selErr.message);
    return null;
  }
  if (existing && existing.length > 0) return existing[0];

  const name = pickName(payload);
  const channel = pickChannel(payload);
  const emailPlaceholder = `${digits}@whatsapp.recrutamax.lead`;
  const { data: inserted, error: insErr } = await admin
    .from('leads')
    .insert({
      name,
      whatsapp,
      email: emailPlaceholder,
      city: 'Não informado',
      is_agent: false,
      attraction: 'WhatsApp Inbound',
      last_cta_source: channel ?? 'whatsapp_inbound',
      funnel_step: 0,
      funnel_answers: {},
      funnel_retries: 0,
    })
    .select('id, whatsapp, funnel_step, funnel_answers, funnel_retries')
    .single();
  if (insErr) {
    if ((insErr as any).code === '23505') {
      // race — re-lookup
      const { data: again } = await admin
        .from('leads')
        .select('id, whatsapp, funnel_step, funnel_answers, funnel_retries')
        .ilike('whatsapp', `%${last10}`)
        .limit(1);
      return again && again.length > 0 ? again[0] : null;
    }
    console.error('[ziontalk-webhook] lead insert error:', insErr.message);
    return null;
  }
  console.log(`[ziontalk-webhook] lead cadastrado: ${name} ${whatsapp}`);
  return inserted;
}

async function updateLeadFunnel(leadId: string, patch: Record<string, any>) {
  if (!admin) return;
  const { error } = await admin.from('leads').update(patch).eq('id', leadId);
  if (error) console.error('[ziontalk-webhook] lead update error:', error.message);
}

async function runFunnel(
  lead: any,
  userMessage: string,
  mobilePhone: string,
  cd: string | undefined,
) {
  const step: number = lead.funnel_step ?? 0;
  const answers: Record<string, any> = lead.funnel_answers ?? {};
  const retries: number = lead.funnel_retries ?? 0;

  // Step 0: envia abertura + primeira pergunta
  if (step === 0) {
    await sendWhatsapp(mobilePhone, cd, OPENING);
    await new Promise((r) => setTimeout(r, 600));
    await sendWhatsapp(mobilePhone, cd, QUESTIONS[0].question);
    await updateLeadFunnel(lead.id, {
      funnel_step: 1,
      funnel_last_question_at: new Date().toISOString(),
      funnel_retries: 0,
    });
    return;
  }

  // Funil finalizado
  if (step > QUESTIONS.length) {
    await sendWhatsapp(mobilePhone, cd, ALREADY_DONE_MESSAGE);
    return;
  }

  // Steps 1..N: valida resposta da pergunta atual (step-1 no array)
  const currentQ = QUESTIONS[step - 1];
  const trimmedMsg = userMessage.trim();

  if (!trimmedMsg) {
    // sem texto — repete a pergunta atual
    await sendWhatsapp(mobilePhone, cd, currentQ.question);
    return;
  }

  const validation = await validateAnswerWithAI(currentQ.question, trimmedMsg);

  if (!validation.faz_sentido && retries < 2) {
    await updateLeadFunnel(lead.id, { funnel_retries: retries + 1, funnel_followup_stage: 0 });
    await sendWhatsapp(mobilePhone, cd, validation.pergunta_reformulada);
    return;
  }

  // Aceita resposta (válida OU esgotou tentativas)
  const newAnswers = { ...answers, [currentQ.key]: validation.resposta_normalizada };
  const nextStep = step + 1;
  const patch: Record<string, any> = {
    funnel_answers: newAnswers,
    funnel_step: nextStep,
    funnel_retries: 0,
    funnel_followup_stage: 0,
    funnel_last_question_at: new Date().toISOString(),
  };

  // Se resposta 1 (nome), atualiza também o name principal do lead
  if (currentQ.key === 'nome' && validation.resposta_normalizada) {
    patch.name = validation.resposta_normalizada.slice(0, 120);
  }

  await updateLeadFunnel(lead.id, patch);

  if (nextStep > QUESTIONS.length) {
    await sendWhatsapp(mobilePhone, cd, FINAL_MESSAGE);
    // Notifica gestor com resumo do lead + respostas
    await notifyManager(lead, newAnswers, mobilePhone, cd);
  } else {
    await sendWhatsapp(mobilePhone, cd, QUESTIONS[nextStep - 1].question);
  }
}

const MANAGER_PHONES = ['15981788214', '15981888214'];
const MANAGER_CD = '+55';

async function notifyManager(
  lead: any,
  answers: Record<string, any>,
  leadMobile: string,
  leadCd: string | undefined,
) {
  const leadWhatsapp = leadCd ? `${leadCd} ${leadMobile}` : leadMobile;
  const name = answers['nome'] || lead.name || 'Sem nome';
  const lines = [
    '📋 Novo lead qualificado — RE/MAX',
    '',
    `Nome: ${name}`,
    `WhatsApp: ${leadWhatsapp}`,
    '',
    'Respostas:',
    ...QUESTIONS.map((q, i) => `${i + 1}. ${q.question} ${answers[q.key] ?? '—'}`),
  ];
  const msg = lines.join('\n');
  for (const phone of MANAGER_PHONES) {
    try {
      await sendWhatsapp(phone, MANAGER_CD, msg);
    } catch (e) {
      console.error(`[ziontalk-webhook] falha ao notificar gestor ${phone}:`, String(e));
    }
    await new Promise((r) => setTimeout(r, 500));
  }
}


// ==================== HTTP HANDLER ====================

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    let payload: any = null;
    const ctype = req.headers.get('content-type') || '';
    if (ctype.includes('application/json')) {
      payload = await req.json().catch(() => null);
    } else if (
      ctype.includes('application/x-www-form-urlencoded') ||
      ctype.includes('multipart/form-data')
    ) {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
    } else {
      const raw = await req.text();
      try { payload = JSON.parse(raw); } catch { payload = { raw }; }
    }

    console.log('[ziontalk-webhook] payload:', JSON.stringify(payload));

    const evento = (payload?.evento ?? payload?.event ?? '').toString().toLowerCase();
    if (evento && evento !== 'mensagem.recebida' && evento !== 'message.received') {
      return new Response(JSON.stringify({ ok: true, ignored: 'wrong_event', evento }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!isInbound(payload)) {
      return new Response(JSON.stringify({ ok: true, ignored: 'not_inbound' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const phone = pickPhone(payload);
    if (!phone) {
      return new Response(JSON.stringify({ ok: true, ignored: 'no_phone' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { mobilePhone, cd } = normalizePhone(phone);
    const userMessage = pickMessageText(payload);

    const lead = await upsertLeadAndGetState(payload, mobilePhone, cd);
    if (lead) {
      await runFunnel(lead, userMessage, mobilePhone, cd);
    } else {
      console.error('[ziontalk-webhook] sem lead — não foi possível rodar funil');
    }

    return new Response(JSON.stringify({ ok: true, to: phone }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[ziontalk-webhook] error:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
