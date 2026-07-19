CREATE FUNCTION update_timestamp(
  current TIMESTAMP WITH TIME ZONE,
  action_points INT
)
RETURNS TIMESTAMP WITH TIME ZONE
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN greatest(current, now() - '2 days'::INTERVAL) + action_points * (
    '1 millisecond'::INTERVAL
  ) * 2;
END;
$$;
