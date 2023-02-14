import * as styles from "./PanelHeader.module.css";

import { Organizable } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  actions?: ReactNode;
  children: ReactNode;
};

const PanelHeader = ({ actions, children }: Props) => (
  <Organizable>
    <div className={styles.container}>
      <div className={styles.title}>{children}</div>
      {actions ? <div>{actions}</div> : null}
    </div>
  </Organizable>
);

export default PanelHeader;
