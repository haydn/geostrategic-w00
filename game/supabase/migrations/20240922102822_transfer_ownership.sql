CREATE FUNCTION transfer_ownership(unit_id uuid, new_owner_id uuid)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE units
  SET owner_id = new_owner_id
  FROM
    (
      SELECT
        units.id AS unit_id,
        players.user_id AS user_id
      FROM
        units
        JOIN classifications ON units.classification_id = classifications.id
        LEFT JOIN players ON units.owner_id = players.id
      WHERE classifications.autonomous = TRUE
    ) AS candidate_units
  WHERE
    units.id = candidate_units.unit_id
    AND candidate_units.unit_id = transfer_ownership.unit_id
    AND (
      candidate_units.user_id = auth.uid()
      OR candidate_units.user_id IS NULL
    );
END;
$$;
