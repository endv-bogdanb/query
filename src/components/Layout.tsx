import { ReactNode } from "react";
import { Container, createStyles } from "@mantine/core";

export interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  const { classes } = useStyles();
  return <Container className={classes.wrapper}>{children}</Container>;
}

const useStyles = createStyles(() => ({
  wrapper: { height: "100vh" },
}));
