import { ReactNode } from "react";

export interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  return <div>{children}</div>;
}
