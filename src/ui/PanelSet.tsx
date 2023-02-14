import * as styles from "./PanelSet.module.css";

import { OrganizableContainer } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PanelSet = ({ children }: Props) => (
  <OrganizableContainer containerClassName={styles.container}>
    {children}
  </OrganizableContainer>
);

export default PanelSet;
