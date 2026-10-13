CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  form TEXT NOT NULL,
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  annual_volume TEXT,
  delivery_date DATE,
  message TEXT
);

GRANT INSERT ON public.contact_requests TO anon;
GRANT INSERT ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact request"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);