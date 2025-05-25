import type { FC } from "hono/jsx/dom";

const Layout: FC = (props) => {
  const navPages = [
    { href: "/", name: "Home" },
    { href: "/page/1", name: "First Page" },
    { href: "/page/2", name: "Second Page" },
    { href: "/page/3", name: "Thrid Page" },
  ];
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        {/* <link rel="stylesheet" href="/static/style.css" /> */}
        <script src="/javascripts/nav.js" defer></script>
      </head>
      <body>
        <boosted-nav target="main">
          <ul>
            {navPages.map((page) => {
              return (
                <li>
                  <a href={page.href}>{page.name}</a>
                </li>
              );
            })}
          </ul>
        </boosted-nav>
        <main>{props.children}</main>
        <footer></footer>
      </body>
    </html>
  );
};

export default Layout;
