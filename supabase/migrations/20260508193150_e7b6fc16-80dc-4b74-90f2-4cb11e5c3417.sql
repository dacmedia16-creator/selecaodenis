CREATE TABLE public.cta_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source text NOT NULL,
  session_id text,
  path text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_cta_clicks_source ON public.cta_clicks(source);
CREATE INDEX idx_cta_clicks_created_at ON public.cta_clicks(created_at DESC);

ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a CTA click"
  ON public.cta_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view CTA clicks"
  ON public.cta_clicks FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.leads ADD COLUMN last_cta_source text;