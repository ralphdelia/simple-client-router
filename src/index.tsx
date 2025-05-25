import { Hono } from "hono";

import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "hono/bun";

import Layout from "./views/Layout";
import HomePage from "./views/pages/HomePage";
import Page from "./views/pages/Page";

const app = new Hono();

app.use("*", serveStatic({ root: "./public" }));
app.use(
  "*",
  jsxRenderer(({ children }) => <Layout>{children}</Layout>),
);

app.get("/", (c) => {
  return c.render(<HomePage />);
});

app.get("/page/:number", (c) => {
  return c.render(<Page pageNumber={c.req.param("number")} />);
});

export default app;
