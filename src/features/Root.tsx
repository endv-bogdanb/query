import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout } from "@components/Layout";
import { getPublicUrl, httpClient } from "@utils";
import { Divider, Grid, List, ListItem } from "semantic-ui-react";

export function Root() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const ab = new AbortController();

    httpClient(getPublicUrl("version.txt"), {
      signal: ab.signal,
    })
      .then((txt) => {
        if (typeof txt === "string") {
          setVersion(txt);
        }
      })
      .catch(() => setVersion(""));

    return () => {
      ab.abort();
    };
  });

  return (
    <Layout>
      <Grid columns={2}>
        <Grid.Column>
          {version !== null ? <>version: {version}</> : null}
        </Grid.Column>
        <Grid.Column textAlign="right">
          <List as="nav" horizontal>
            <ListItem as={Link} to="/query">
              query
            </ListItem>
            <ListItem as={Link} to="/swr">
              swr
            </ListItem>
            <ListItem as={Link} to="/toolkit-query">
              toolkit query
            </ListItem>
          </List>
        </Grid.Column>
      </Grid>
      <Divider />
      <Outlet />
    </Layout>
  );
}
