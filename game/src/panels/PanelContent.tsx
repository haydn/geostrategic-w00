import * as styles from "./PanelContent.module.css";

import { Organizable } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PanelContent = ({ children }: Props) => (
  <Organizable>
    <div className={styles.container}>{children}</div>
  </Organizable>
);

export default PanelContent;
