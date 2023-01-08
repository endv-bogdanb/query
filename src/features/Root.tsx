import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Divider, Space } from "@mantine/core";
import { Layout } from "@components/Layout";
import { getPublicUrl, httpClient, TokenRegistry, useSession } from "@utils";

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
  }, [version, setVersion]);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{version !== null ? <>version: {version}</> : null}</div>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/query">query</Link>
          <Link to="/swr">swr</Link>
          <Link to="/toolkit-query"> toolkit query </Link>
          {!!session && !!session.token && !!session.refreshToken && (
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                TokenRegistry.reset();
              }}
            >
              logout
            </Link>
          )}
        </nav>
      </div>
      <Divider />
      <Space h="xl" />
      <Outlet />
    </Layout>
  );
}
