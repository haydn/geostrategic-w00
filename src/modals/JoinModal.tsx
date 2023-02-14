"use client";

import useGameContext from "@/context/useGameContext";
import Modal from "@/modals/Modal";
import Panel from "@/panels/Panel";
import PanelContent from "@/panels/PanelContent";
import PanelFooter from "@/panels/PanelFooter";
import ButtonList from "@/ui/ButtonList";
import Field from "@/ui/Field";
import FieldList from "@/ui/FieldList";
import SubmitButton from "@/ui/SubmitButton";
import { Organizable } from "@/utils/organizable";
import { useState } from "react";
import ModalPanelHeader from "./ModalPanelHeader";

type Props = {
  id: string;
  onClose: () => void;
  onSuccess: () => void;
  open: boolean;
};

const JoinModal = ({ id, onClose, onSuccess, open }: Props) => {
  const {
    auth: { joinGame },
  } = useGameContext();

  const [name, setName] = useState("");
  const [error, setError] = useState<Error | null>(null);

  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await joinGame(name);
            onSuccess();
          } catch (error) {
            if (error instanceof Error) {
              setError(error);
            } else {
              throw error;
            }
          }
        }}
      >
        <Panel>
          <ModalPanelHeader onClose={onClose}>Join Game</ModalPanelHeader>
          <PanelContent>
            <FieldList>
              {error ? <Organizable>{error.message}</Organizable> : null}
              <Field label="Name" inputId={`${id}-name`}>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="name"
                  onChange={({ target: { value } }) => {
                    setName(value);
                  }}
                  value={name}
                  required
                  autoFocus
                />
              </Field>
            </FieldList>
          </PanelContent>
          <PanelFooter>
            <ButtonList align="right">
              <SubmitButton>Submit</SubmitButton>
            </ButtonList>
          </PanelFooter>
        </Panel>
      </form>
    </Modal>
  );
};

export default JoinModal;
