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

const SignUpModal = ({ id, onClose, onSuccess, open }: Props) => {
  const {
    auth: { signUp },
  } = useGameContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error | null>(null);

  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await signUp(email, password);
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
          <ModalPanelHeader onClose={onClose}>Sign Up</ModalPanelHeader>
          <PanelContent>
            <FieldList>
              {error ? <Organizable>{error.message}</Organizable> : null}
              <Field label="Email" inputId={`${id}-email`}>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  onChange={({ target: { value } }) => {
                    setEmail(value);
                  }}
                  value={email}
                  required
                  autoFocus
                />
              </Field>
              <Field label="Password" inputId={`${id}-password`}>
                <input
                  id={`${id}-password`}
                  name="password"
                  type="password"
                  onChange={({ target: { value } }) => {
                    setPassword(value);
                  }}
                  value={password}
                  required
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

export default SignUpModal;
