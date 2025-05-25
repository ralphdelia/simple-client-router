class BoostedNav extends HTMLElement {
  constructor() {
    super();
    this.parser = new DOMParser();
    this.pageCache = new Map();
    this.clickHandler = this.clickHandler.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.handlePrefetch = this.handlePrefetch.bind(this);
  }

  connectedCallback() {
    this.targetSelector = this.getAttribute("target") || "main";
    this.targetEle = document.querySelector(this.targetSelector);

    this.addEventListener("click", this.clickHandler);
    window.addEventListener("popstate", this.navigateBack);
    this.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", this.handlePrefetch);
    });
  }

  async fetchPage(url) {
    if (this.pageCache.has(url)) {
      return this.pageCache.get(url);
    }

    try {
      const res = await fetch(url, { headers: { "X-Boosted": "true" } });
      const html = await res.text();
      this.pageCache.set(url, html);
      return html;
    } catch (e) {
      console.error(`Error Fetching Page ${url}`, e);
    }
  }

  async handlePrefetch(e) {
    const url = e.currentTarget.href;
    if (this.pageCache.has(url)) return;
    this.fetchPage(url);
  }

  async clickHandler(e) {
    const link = e.target.closest("a");
    if (!link || !link.href.startsWith(location.origin)) return;

    e.preventDefault();
    try {
      const html = await this.fetchPage(link.href);
      const doc = this.parser.parseFromString(html, "text/html");

      const fragment = doc.querySelector(this.targetSelector);
      if (fragment) {
        this.targetEle.innerHTML = fragment.innerHTML;
        history.pushState({ boosted: true }, "", link.href);
      }
    } catch (e) {
      console.error("Forward Nav Error:", e);
    }
  }

  async navigateBack(e) {
    try {
      const html = await this.fetchPage(location.pathname);
      const doc = this.parser.parseFromString(html, "text/html");

      const fragment = doc.querySelector(this.targetSelector);
      if (fragment) {
        this.targetEle.innerHTML = fragment.innerHTML;
      }
    } catch (e) {
      console.error("Popstate Error:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  customElements.define("boosted-nav", BoostedNav);
});
