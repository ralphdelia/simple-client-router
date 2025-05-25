class BoostedNav extends HTMLElement {
  constructor() {
    super();
    this.parser = new DOMParser();
    this.clickHandler = this.clickHandler.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  connectedCallback() {
    this.targetSelector = this.getAttribute("target") || "main";
    this.targetEle = document.querySelector(this.targetSelector);
    this.addEventListener("click", this.clickHandler);
    window.addEventListener("popstate", this.navigateBack);
  }

  async clickHandler(e) {
    const link = e.target.closest("a");
    if (!link || !link.href.startsWith(location.origin)) return;

    e.preventDefault();
    try {
      const res = await fetch(link.href);
      const text = await res.text();
      const doc = this.parser.parseFromString(text, "text/html");

      const fragment = doc.querySelector(this.targetSelector);
      if (fragment) {
        this.targetEle.innerHTML = fragment.innerHTML;
        history.pushState({}, "", link.href);
      }
    } catch (e) {
      console.error("Forward Nav Error:", e);
    }
  }

  async navigateBack(e) {
    const url = location.pathname;
    try {
      const res = await fetch(url);
      const text = await res.text();
      const doc = this.parser.parseFromString(text, "text/html");

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
