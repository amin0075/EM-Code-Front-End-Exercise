/**
 * @typedef {Object} Tab
 * @property {string} id - The id of the tab
 * @property {string} title - The title of the tab
 * @property {string} content - The content of the tab
 *
 */

/**
 * CustomTabs - A web component for creating tabs with custom content
 * @extends HTMLElement
 */
class CustomTabs extends HTMLElement {
  constructor() {
    super();

    /**
     * tabs data has to come from CMS
     * @type {Tab[]}
     */
    this._tabs = [];
    this._touchstartX = 0;
  }

  /**
   * Set tabs data
   * @param {Tab[]} tabs - The tabs data
   * @example
   * myTabs.tabs = [
   *  {
   *   id: "tab-1",
   *  title: "Tab 1",
   * content: "<p>Tab 1 content</p>"
   * },
   * {
   * id: "tab-2",
   * title: "Tab 2",
   * content: "<p>Tab 2 content</p>"
   * }
   * ];
   */
  set tabs(tabs) {
    this._tabs = Array.isArray(tabs) ? tabs : [];
    this._renderTabs();
  }

  /**
   * Get tabs data
   * @returns {Tab[]}
   * @example
   * const tabs = myTabs.tabs;
   */
  get tabs() {
    return [...this._tabs];
  }

  connectedCallback() {
    // Create the base structure when element is added to DOM
    this.innerHTML = `
      <div class="tabs">
        <div class="tabs-headers"></div>
        <div class="tabs-contents"></div>
      </div>
    `;

    // Set up touch event listeners
    /**  @type {NodeListOf<HTMLDivElement>} */
    const tabsContents = this.querySelector(".tabs-contents");
    tabsContents.addEventListener(
      "touchstart",
      (e) => this._handleSwipe(e, "start"),
      false
    );
    tabsContents.addEventListener(
      "touchend",
      (e) => this._handleSwipe(e, "end"),
      false
    );
  }

  // Private methods
  _renderTabs() {
    if (!this._tabs || this._tabs.length === 0) return;
    /**  @type {NodeListOf<HTMLDivElement>} */
    const tabsHeaders = this.querySelector(".tabs-headers");
    /**  @type {NodeListOf<HTMLDivElement>} */
    const tabsContents = this.querySelector(".tabs-contents");

    // Create tab headers and contents
    this._tabs.forEach((tab, i) => {
      const tabHeader = document.createElement("button");
      tabHeader.classList.add("tab-header");
      tabHeader.textContent = tab.title;
      tabHeader.dataset.tab = tab.id;
      tabHeader.addEventListener("click", () => {
        this._setActiveTab(tab.id, i);
      });
      tabsHeaders.appendChild(tabHeader);

      const tabContent = document.createElement("div");
      tabContent.classList.add("tab-content", "prose");
      tabContent.innerHTML = tab.content;
      tabContent.dataset.tab = tab.id;
      tabsContents.appendChild(tabContent);
    });

    // default selected tab
    this._setActiveTab(this._tabs[0].id, 0);
  }

  _setActiveTab(tabId, idx) {
    const tabHeaders = this.querySelectorAll(".tab-header");
    const tabContents = this.querySelectorAll(".tab-content");

    tabHeaders.forEach((tabHeader) => {
      if (tabHeader.dataset.tab === tabId) {
        tabHeader.classList.add("active");
        tabHeader.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      } else {
        tabHeader.classList.remove("active");
      }
    });

    tabContents.forEach((tabContent) => {
      tabContent.style.transform = `translateX(-${idx * 100}%)`;

      if (tabContent.dataset.tab === tabId) {
        tabContent.classList.add("active");
      } else {
        tabContent.classList.remove("active");
      }
    });
  }

  /**
   * @param {TouchEvent} event - The touch event
   * @param {"start" | "end"} state - The type of the touch event
   */
  _handleSwipe(event, state) {
    if (state === "start") {
      this._touchstartX = event.changedTouches[0].screenX;
    } else {
      const touchendX = event.changedTouches[0].screenX;
      const currentActiveTab = this.querySelector(".tab-header.active");

      if (!currentActiveTab) return;

      const idx = this._tabs.findIndex(
        (tab) => tab.id === currentActiveTab.dataset.tab
      );

      if (touchendX < this._touchstartX && idx < this._tabs.length - 1) {
        this._setActiveTab(this._tabs[idx + 1].id, idx + 1);
      }

      if (touchendX > this._touchstartX && idx > 0) {
        this._setActiveTab(this._tabs[idx - 1].id, idx - 1);
      }
    }
  }
}

// Register the custom element
customElements.define("custom-tabs", CustomTabs);

function main() {
  // Get reference to the custom element
  const tabs1 = document.getElementById("tabs-1");
  const tabs2 = document.getElementById("tabs-2");

  // data from CMS
  tabs1.tabs = [
    {
      id: "tab-1",
      title: "Tab 1",
      content:
        "<div class='prose'><h3>Tab 1 content</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam. Praesentium obcaecati tempore quibusdam eveniet mollitia exercitationem debitis. Placeat, veritatis atque.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam.</p></div>",
    },
    {
      id: "tab-2",
      title: "Tab 2",
      content:
        "<div class='prose'><h3>Tab 2 content</h3><p>This is the description of tab 2</p></div>",
    },
    {
      id: "tab-3",
      title: "Tab 3",
      content:
        "<div class='prose'><h3>Tab 3 content</h3><p>This is the description of tab 3</p></div>",
    },
    {
      id: "tab-4",
      title: "very looooong tab",
      content:
        "<div class='prose'><h3>Tab 4 content</h3><p>This is the description of tab 4</p></div>",
    },
  ];

  // data from CMS
  tabs2.tabs = [
    {
      id: "different-tab-1",
      title: "Different Tab 1",
      content:
        "<div class='prose'><h3>Different Tab 1 content</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam. Praesentium obcaecati tempore quibusdam eveniet mollitia exercitationem debitis. Placeat, veritatis atque.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam.</p></div>",
    },
    {
      id: "different-tab-2",
      title: "Different Tab 2",
      content:
        "<div class='prose'><h3>Different Tab 2 content</h3><p>This is the description of tab 2</p></div>",
    },
  ];
}

document.addEventListener("DOMContentLoaded", main);
