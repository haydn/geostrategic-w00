import * as styles from "./Panel.module.css";

import type { ReactNode } from "react";
import { Organizable, OrganizableContainer } from "@/utils/organizable";

type Props = {
  children: ReactNode;
};

const Panel = ({ children }: Props) => (
  <Organizable>
    <OrganizableContainer containerClassName={styles.container}>
      {children}
    </OrganizableContainer>
  </Organizable>
);

export default Panel;
