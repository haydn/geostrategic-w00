import Button from "@/ui/Button";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
  content: (open: boolean, onClose: () => void) => ReactNode;
};

const Disclosure = ({ children, content }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Button>
      {content(open, () => {
        setOpen(false);
      })}
    </>
  );
};

Disclosure.displayName = "Disclosure";

export default Disclosure;
