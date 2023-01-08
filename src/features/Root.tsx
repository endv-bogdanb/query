import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout } from "@components/Layout";
import { getPublicUrl, httpClient, TokenRegistry, useSession } from "@utils";
import { Divider, Grid, Label, List, ListItem } from "semantic-ui-react";

export function Root() {
  const [version, setVersion] = useState<string | null>(null);

  const session = useSession();

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
            {!!session && !!session.token && !!session.refreshToken && (
              <ListItem
                style={{
                  cursor: "pointer",
                  color: "#1e70bf",
                  fontWeight: "lighter",
                }}
                onClick={() => TokenRegistry.reset()}
              >
                logout
              </ListItem>
            )}
          </List>
        </Grid.Column>
      </Grid>
      <Divider />
      <Outlet />
    </Layout>
  );
}
