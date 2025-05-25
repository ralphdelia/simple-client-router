import { Hono } from "hono";

import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "hono/bun";

import Layout from "./views/Layout";
import HomePage from "./views/pages/HomePage";
import Page from "./views/pages/Page";

const app = new Hono();

app.use("*", serveStatic({ root: "./public" }));

app.use("*", async (c, next) => {
  const isBoosted = c.req.header("X-Boosted") === "true";
  c.set("isBoosted", isBoosted);
  await next();
});

app.use(
  "*",
  jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>;
  }),
);

app.get("/", (c) => {
  const page = <HomePage />;
  console.log(c.get("isBoosted"));
  return c.get("isBoosted") ? c.html(page) : c.render(page);
});

app.get("/page/:number", (c) => {
  const page = <Page pageNumber={c.req.param("number")} />;
  return c.get("isBoosted") ? c.html(page) : c.render(page);
});

export default app;
