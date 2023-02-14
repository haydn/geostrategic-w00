import * as styles from "./FieldList.module.css";

import { OrganizableContainer } from "@/utils/organizable";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FieldList = ({ children }: Props) => (
  <OrganizableContainer containerClassName={styles.container}>
    {children}
  </OrganizableContainer>
);

export default FieldList;
