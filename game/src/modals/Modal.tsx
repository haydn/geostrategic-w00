import * as styles from "./Modal.module.css";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
};

const Modal = ({ children, onClose, open }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog) {
      dialog.addEventListener("close", onClose);
      return () => {
        dialog.removeEventListener("close", onClose);
      };
    }
  }, [onClose]);

  return (
    <dialog ref={ref} className={styles.container}>
      {children}
    </dialog>
  );
};

export default Modal;
