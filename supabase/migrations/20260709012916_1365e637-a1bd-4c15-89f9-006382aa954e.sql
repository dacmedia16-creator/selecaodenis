
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS funnel_step int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS funnel_answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS funnel_last_question_at timestamptz,
  ADD COLUMN IF NOT EXISTS funnel_retries int NOT NULL DEFAULT 0;
