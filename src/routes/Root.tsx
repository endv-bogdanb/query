import { Link, Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";

export function Root() {
  return (
    <Layout>
      <nav className="flex gap-4 h-8 items-center">
        <ul>
          <Link to="/query">query</Link>
        </ul>
        <ul>
          <Link to="/swr">swr</Link>
        </ul>
        <ul>
          <Link to="/toolkit-query">toolkit query</Link>
        </ul>
      </nav>
      <div className="border bg-dark-500" />
      <Outlet />
    </Layout>
  );
}
