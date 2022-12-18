import { ReactNode } from "react";

export interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  return <div className="h-screen w-screen bg-gray-50">{children}</div>;
}
