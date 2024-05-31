import { ReactNode } from "react";
import { Container } from "@mantine/core";
import { createStyles } from "@mantine/emotion";

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
