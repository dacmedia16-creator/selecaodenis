import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const ZIONTALK_API_KEY = Deno.env.get('ZIONTALK_API_KEY') ?? '';
const REPLY_MESSAGE =
  'Logo a RecrutaMax vai entrar em contato, aproveita e veja www.recrutamax.com.br';

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
  // Try to detect direction; default true if unknown so we don't miss real messages.
  const direction =
    payload?.direction ??
    payload?.message?.direction ??
    payload?.data?.direction ??
    payload?.type ??
    payload?.message?.type;

  if (typeof direction === 'string') {
    const d = direction.toLowerCase();
    if (['outbound', 'out', 'sent', 'outgoing'].includes(d)) return false;
  }

  // Some payloads use a boolean like from_me / is_from_me
  const fromMe =
    payload?.from_me ??
    payload?.is_from_me ??
    payload?.message?.from_me ??
    payload?.data?.from_me;
  if (fromMe === true) return false;

  return true;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

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
      try {
        payload = JSON.parse(raw);
      } catch {
        payload = { raw };
      }
    }

    console.log('[ziontalk-webhook] payload:', JSON.stringify(payload));

    // Only respond to inbound "mensagem.recebida" events
    const evento = (payload?.evento ?? payload?.event ?? '').toString().toLowerCase();
    if (evento && evento !== 'mensagem.recebida' && evento !== 'message.received') {
      console.log(`[ziontalk-webhook] ignored: evento=${evento}`);
      return new Response(JSON.stringify({ ok: true, ignored: 'wrong_event', evento }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!isInbound(payload)) {
      console.log('[ziontalk-webhook] ignored: not inbound');
      return new Response(JSON.stringify({ ok: true, ignored: 'not_inbound' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const phone = pickPhone(payload);
    if (!phone) {
      console.log('[ziontalk-webhook] ignored: phone not found in payload');
      return new Response(JSON.stringify({ ok: true, ignored: 'no_phone' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!ZIONTALK_API_KEY) {
      console.error('[ziontalk-webhook] ZIONTALK_API_KEY not configured');
      return new Response(JSON.stringify({ ok: false, error: 'api_key_missing' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const form = new FormData();
    form.append('msg', REPLY_MESSAGE);
    form.append('mobile_phone', phone);

    const auth = 'Basic ' + btoa(`${ZIONTALK_API_KEY}:`);

    const resp = await fetch('https://app.ziontalk.com/api/send_message/', {
      method: 'POST',
      headers: { Authorization: auth },
      body: form,
    });

    const bodyText = await resp.text();
    console.log(
      `[ziontalk-webhook] send_message -> ${resp.status} to ${phone} | body: ${bodyText.slice(0, 500)}`,
    );

    return new Response(
      JSON.stringify({ ok: resp.ok, status: resp.status, to: phone }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('[ziontalk-webhook] error:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
