import * as styles from "./PanelFooter.module.css";

import { Organizable } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PanelFooter = ({ children }: Props) => (
  <Organizable>
    <div className={styles.container}>{children}</div>
  </Organizable>
);

export default PanelFooter;
