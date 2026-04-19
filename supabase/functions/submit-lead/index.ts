import { createClient } from "npm:@supabase/supabase-js@2.95.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2.95.0/cors";
import { z } from "npm:zod@3.23.8";

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  whatsapp: z.string().trim().min(10).max(20).regex(/^[0-9()+\-\s]+$/),
  email: z.string().trim().email().max(255),
  city: z.string().trim().min(2).max(80),
  isAgent: z.enum(["sim", "nao"]),
  attraction: z.string().trim().max(500).optional().or(z.literal("")),
});

const ZIONTALK_URL = "https://app.ziontalk.com/api/send_message/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const json = await req.json();
    const parsed = LeadSchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const lead = parsed.data;

    // 1) Persist lead in DB (use service role to bypass RLS reliably)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("leads").insert({
      name: lead.name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      city: lead.city,
      is_agent: lead.isAgent === "sim",
      attraction: lead.attraction || null,
    });

    if (dbError) {
      console.error("[submit-lead] DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar cadastro" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2) Notify Denis via ZionTalk WhatsApp API (best-effort)
    const apiKey = Deno.env.get("ZIONTALK_API_KEY");
    const denisPhone = Deno.env.get("DENIS_WHATSAPP");

    if (apiKey && denisPhone) {
      const msg = [
        "🔥 Novo lead — Landing RE/MAX",
        `Nome: ${lead.name}`,
        `WhatsApp: ${lead.whatsapp}`,
        `E-mail: ${lead.email}`,
        `Cidade: ${lead.city}`,
        `Já é corretor: ${lead.isAgent === "sim" ? "Sim" : "Não"}`,
        `Motivação: ${lead.attraction?.trim() ? lead.attraction.trim() : "—"}`,
      ].join("\n");

      const form = new FormData();
      form.append("msg", msg);
      form.append("mobile_phone", denisPhone);

      try {
        const zionRes = await fetch(ZIONTALK_URL, {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(apiKey + ":"),
          },
          body: form,
        });
        const text = await zionRes.text();
        if (!zionRes.ok) {
          console.error("[submit-lead] ZionTalk failed:", zionRes.status, text);
        } else {
          console.log("[submit-lead] ZionTalk OK:", zionRes.status);
        }
      } catch (zionErr) {
        console.error("[submit-lead] ZionTalk fetch error:", zionErr);
      }
    } else {
      console.warn("[submit-lead] ZIONTALK_API_KEY or DENIS_WHATSAPP not set; skipping notification.");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[submit-lead] Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Erro inesperado" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
