import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout } from "@components/Layout";
import { getPublicUrl } from "@utils";

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
      <nav className="flex px-8 justify-between">
        <div className="flex items-center">
          {version !== null ? <>version: {version}</> : null}
        </div>
        <div className="flex gap-4 h-8 items-center">
          <ul>
            <Link to="/query">query</Link>
          </ul>
          <ul>
            <Link to="/swr">swr</Link>
          </ul>
          <ul>
            <Link to="/toolkit-query">toolkit query</Link>
          </ul>
        </div>
      </nav>
      <div className="border bg-dark-500" />
      <Outlet />
    </Layout>
  );
}
