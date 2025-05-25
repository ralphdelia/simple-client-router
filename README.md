## simple-client-router
Project exploring MPA navigation using a web component implmentation `hx-boost`.

Start the development server with:
```
bun --watch src/index.tsx
```

## `<boosted-nav>`
Component in ./public/javasripts/nav.js
- Enables multi-page app (MPA) navigation without full page reloads
- Provides a content swapping target
- Updates the browser URL using the History API
- Implements backward navigation with popstate
- Implements in-memory response caching
- Prefetches links on hover
- Sets a custom request header (X-Boosted) to support partial rendering on the server
