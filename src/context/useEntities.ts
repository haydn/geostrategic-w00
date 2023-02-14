import type { Database } from "@/_types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import parsePosition from "../utils/parsePosition";

const unitRecordToEntity = (
  r: Database["public"]["Tables"]["units"]["Row"]
) => ({
  ...r,
  position: parsePosition(r.position as string),
});

const classificationRecordToEntity = (
  r: Database["public"]["Tables"]["classifications"]["Row"]
) => r;

const playerRecordToEntity = (
  r: Database["public"]["Tables"]["players"]["Row"]
) => r;

const actionRecordToEntity = (
  r: Database["public"]["Tables"]["actions"]["Row"]
) => r;

const entityToId = (r: { id: string }) => r.id;

const useEntities = (supabase: SupabaseClient<Database>) => {
  const units = useEntity({
    supabase,
    table: "units",
    recordToEntity: unitRecordToEntity,
    entityToId,
  });

  const classifications = useEntity({
    supabase,
    table: "classifications",
    recordToEntity: classificationRecordToEntity,
    entityToId,
  });

  const players = useEntity({
    supabase,
    table: "players",
    recordToEntity: playerRecordToEntity,
    entityToId,
  });

  const actions = useEntity({
    supabase,
    table: "actions",
    recordToEntity: actionRecordToEntity,
    entityToId,
  });

  return {
    units,
    classifications,
    players,
    actions,
  };
};

const useEntity = <
  TableName extends string & keyof Database["public"]["Tables"],
  Table extends Database["public"]["Tables"][TableName],
  Record extends Table["Row"],
  Entity
>({
  supabase,
  table,
  recordToEntity,
  entityToId,
}: {
  supabase: SupabaseClient<Database>;
  table: TableName;
  recordToEntity: (record: Record) => Entity;
  entityToId: (result: Entity) => string;
}) => {
  const [entities, setEntities] = useState<Array<Entity>>([]);

  useEffect(() => {
    const deleteChannel = supabase.channel(`${table}-delete`);
    const insertChannel = supabase.channel(`${table}-insert`);
    const updateChannel = supabase.channel(`${table}-update`);

    supabase
      .from(table)
      .select("*")
      .then(({ data }) => {
        if (data) {
          setEntities(
            (data as unknown as Array<Record>).map((r) => recordToEntity(r))
          );
        }
      });

    deleteChannel
      .on<Record>(
        "postgres_changes",
        {
          event: "DELETE",
          table,
          schema: "public",
        },
        (payload) => {
          setEntities((current) =>
            current.filter((record) => entityToId(record) !== payload.old.id)
          );
        }
      )
      .subscribe((status) => {
        console.log(deleteChannel.topic, status);
      });

    insertChannel
      .on<Record>(
        "postgres_changes",
        {
          event: "INSERT",
          table,
          schema: "public",
        },
        (payload) => {
          setEntities((current) => current.concat(recordToEntity(payload.new)));
        }
      )
      .subscribe((status) => {
        console.log(insertChannel.topic, status);
      });

    updateChannel
      .on<Record>(
        "postgres_changes",
        {
          event: "UPDATE",
          table,
          schema: "public",
        },
        (payload) => {
          setEntities((current) =>
            current.map((record) =>
              entityToId(record) === payload.new.id
                ? recordToEntity(payload.new)
                : record
            )
          );
        }
      )
      .subscribe((status) => {
        console.log(updateChannel.topic, status);
      });

    return () => {
      deleteChannel.unsubscribe();
      insertChannel.unsubscribe();
      updateChannel.unsubscribe();
    };
  }, [entityToId, recordToEntity, supabase, table]);

  return entities;
};

export default useEntities;
