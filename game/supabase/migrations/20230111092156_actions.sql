CREATE TYPE action_type AS ENUM ('move');

CREATE TABLE actions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  classification_id uuid NOT NULL,
  type action_type NOT NULL,
  name text NOT NULL,
  action_point_cost INT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (classification_id) REFERENCES classifications (id)
);

ALTER TABLE IF EXISTS public.actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.actions
AS PERMISSIVE
FOR SELECT
TO PUBLIC
USING (TRUE);

ALTER PUBLICATION supabase_realtime
ADD TABLE public.actions;
