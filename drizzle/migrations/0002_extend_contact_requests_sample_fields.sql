ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS delivery_address text,
  ADD COLUMN IF NOT EXISTS products text[],
  ADD COLUMN IF NOT EXISTS design_link text;