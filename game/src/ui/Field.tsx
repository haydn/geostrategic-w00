import { Organizable } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  inputId?: string;
  label: string;
};

const Field = ({ children, inputId, label }: Props) => (
  <Organizable>
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div>{children}</div>
    </div>
  </Organizable>
);

export default Field;
