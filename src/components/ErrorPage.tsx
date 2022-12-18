import { useRouteError } from "react-router-dom";
import { z } from "zod";
import { Layout } from "./Layout";

const errorSchema = z.object({
  statusText: z.string().optional(),
  message: z.string().optional(),
});

export function ErrorPage() {
  const error = useRouteError() as any;

  console.error(error);

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Layout>
  );
}
