import * as styles from "./Button.module.css";

import { Organizable } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  ref?: React.Ref<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, onClick, ref, type = "button" }: Props) => (
  <Organizable>
    <button ref={ref} className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  </Organizable>
);

export default Button;
