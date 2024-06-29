import type { ComponentProps } from "react";
import Button from "./Button";

type Props = Omit<ComponentProps<typeof Button>, "type">;

const SubmitButton = ({ children, ...props }: Props) => (
  <Button {...props} type="submit">
    {children}
  </Button>
);

export default SubmitButton;
