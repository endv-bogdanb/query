import { ReactNode } from "react";
import { Container } from "semantic-ui-react";

export interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  return <Container>{children}</Container>;
}
