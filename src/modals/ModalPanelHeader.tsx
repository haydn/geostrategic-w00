import PanelHeader from "@/panels/PanelHeader";
import Button from "@/ui/Button";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const ModalPanelHeader = ({ children, onClose }: Props) => (
  <PanelHeader actions={<Button onClick={onClose}>Close</Button>}>
    {children}
  </PanelHeader>
);

export default ModalPanelHeader;
