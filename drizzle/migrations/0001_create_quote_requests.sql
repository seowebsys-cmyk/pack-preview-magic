CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 200),
  contact_person text NOT NULL CHECK (char_length(contact_person) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 50),
  delivery_country text NOT NULL CHECK (char_length(delivery_country) BETWEEN 1 AND 100),
  product_form text NOT NULL CHECK (char_length(product_form) <= 50),
  fill_weights text[] NOT NULL DEFAULT '{}',
  fill_weight_other text CHECK (fill_weight_other IS NULL OR char_length(fill_weight_other) <= 100),
  bag_type text NOT NULL CHECK (char_length(bag_type) <= 50),
  design_file text NOT NULL CHECK (char_length(design_file) <= 50),
  design_link text CHECK (design_link IS NULL OR char_length(design_link) <= 500),
  bag_size text CHECK (bag_size IS NULL OR char_length(bag_size) <= 200),
  material text NOT NULL CHECK (char_length(material) <= 50),
  features text[] NOT NULL DEFAULT '{}',
  sku_count text NOT NULL CHECK (char_length(sku_count) <= 20),
  quantity_per_design text NOT NULL CHECK (char_length(quantity_per_design) <= 100),
  finish text NOT NULL CHECK (char_length(finish) <= 50),
  effects text[] NOT NULL DEFAULT '{}',
  deadline date,
  notes text CHECK (notes IS NULL OR char_length(notes) <= 2000),
  CHECK (cardinality(fill_weights) <= 10 AND cardinality(features) <= 10 AND cardinality(effects) <= 5)
);

GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
ON public.quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);