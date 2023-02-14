import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type Props = {
  children: ReactNode;
  containerClassName?: string;
  containerTagName?: keyof JSX.IntrinsicElements;
  itemClassName?: string;
  itemTagName?: keyof JSX.IntrinsicElements;
};

export const OrganizableContainer = ({
  children,
  containerClassName,
  containerTagName: ContainerTag = "div",
  itemClassName,
  itemTagName: ItemTag = "div",
}: Props) => (
  <OrganizableContext.Provider
    value={{
      renderItem: (children) => (
        <OrganizableContext.Provider value={{ renderItem: undefined }}>
          <ItemTag className={itemClassName}>{children}</ItemTag>
        </OrganizableContext.Provider>
      ),
    }}
  >
    <ContainerTag className={containerClassName}>{children}</ContainerTag>
  </OrganizableContext.Provider>
);

export const Organizable = ({ children }: { children: ReactNode }) => {
  const { renderItem } = useContext(OrganizableContext);
  return renderItem ? renderItem(children) : children;
};

export const OrganizableContext = createContext({
  renderItem: undefined as undefined | ((children: ReactNode) => ReactNode),
});
