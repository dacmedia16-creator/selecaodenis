
-- 1) Deduplicar leads existentes mantendo o mais antigo por número (últimos 10 dígitos)
WITH ranked AS (
  SELECT id,
         right(regexp_replace(whatsapp, '\D', '', 'g'), 10) AS digits10,
         row_number() OVER (
           PARTITION BY right(regexp_replace(whatsapp, '\D', '', 'g'), 10)
           ORDER BY created_at ASC, id ASC
         ) AS rn
  FROM public.leads
  WHERE whatsapp IS NOT NULL
    AND length(regexp_replace(whatsapp, '\D', '', 'g')) >= 10
)
DELETE FROM public.leads l
USING ranked r
WHERE l.id = r.id AND r.rn > 1;

-- 2) Índice único funcional sobre os últimos 10 dígitos do whatsapp
CREATE UNIQUE INDEX IF NOT EXISTS leads_whatsapp_digits_unique
ON public.leads ( (right(regexp_replace(whatsapp, '\D', '', 'g'), 10)) )
WHERE whatsapp IS NOT NULL
  AND length(regexp_replace(whatsapp, '\D', '', 'g')) >= 10;
