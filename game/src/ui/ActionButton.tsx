import type { ReactNode } from "react";
import { useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
  onClick: () => void | Promise<void>;
};

const ActionButton = ({ children, onClick }: Props) => {
  const [pending, setPending] = useState(false);
  return (
    <Button
      onClick={async () => {
        setPending(true);
        try {
          await onClick();
        } catch (error) {
          // TODO: Display error to user.
          console.error(error);
        }
        setPending(false);
      }}
    >
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export default ActionButton;
