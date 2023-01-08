import { Link, useRouteError } from "react-router-dom";
import { createStyles, Text } from "@mantine/core";
import { Layout } from "./Layout";

export function ErrorPage() {
  const { classes } = useStyles();
  const error = useRouteError() as any;

  console.error(error);

  return (
    <Layout>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link className={classes.link} to="/">
          <Text c="red.9">Reload</Text>
        </Link>
      </div>
    </Layout>
  );
}

const useStyles = createStyles((theme) => ({
  link: {
    textDecorationColor: theme.colors.red[9],
  },
}));
