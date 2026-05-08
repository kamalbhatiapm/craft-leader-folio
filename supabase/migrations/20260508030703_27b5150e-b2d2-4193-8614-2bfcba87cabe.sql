
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Visits
CREATE TABLE public.visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  path text NOT NULL,
  referrer text,
  user_agent text,
  device text,
  browser text,
  os text,
  ip text,
  country text,
  region text,
  city text,
  latitude double precision,
  longitude double precision,
  duration_seconds integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_visits_created_at ON public.visits (created_at DESC);
CREATE INDEX idx_visits_session ON public.visits (session_id);

ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view visits" ON public.visits
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- No insert policy needed; edge function uses service role to bypass RLS.
