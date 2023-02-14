import * as styles from "./ButtonList.module.css";

import { OrganizableContainer } from "@/utils/organizable";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  align?: "left" | "right";
  children: ReactNode;
};

const ButtonList = ({ align = "left", children }: Props) => (
  <OrganizableContainer
    containerClassName={clsx(styles.container, styles[align])}
  >
    {children}
  </OrganizableContainer>
);

export default ButtonList;
