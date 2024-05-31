import { Link, useRouteError } from "react-router-dom";
import { Layout } from "../Layout/Layout";

export function ErrorPage() {
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
        <Link to="/">Reload</Link>
      </div>
    </Layout>
  );
}
