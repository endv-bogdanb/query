import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout } from "@components/Layout";
import { getPublicUrl } from "@utils";
import { Divider, Grid, List, ListItem } from "semantic-ui-react";

export function Root() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const ab = new AbortController();

    fetch(getPublicUrl("version.txt"), {
      signal: ab.signal,
    })
      .then((response) => {
        if (response.status !== 200) {
          return Promise.resolve("");
        } else {
          return response.text();
        }
      })
      .then((txt) => setVersion(txt));

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
