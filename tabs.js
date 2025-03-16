/**
 * @typedef {Object} Tab
 * @property {string} id - The id of the tab
 * @property {string} title - The title of the tab
 * @property {string} content - The content of the tab
 *
 */

/**
 * tabs data has to come from CMS
 * @type {Tab[]}
 */
const tabs = [
  {
    id: "tab-1",
    title: "Tab 1",
    content:
      "<div><h3>Tab 1 content</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam. Praesentium obcaecati tempore quibusdam eveniet mollitia exercitationem debitis. Placeat, veritatis atque.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis voluptatem earum laudantium nam voluptate esse possimus incidunt laboriosam.</p></div>",
  },
  {
    id: "tab-2",
    title: "Tab 2",
    content:
      "<div><h3>Tab 2 content</h3><p>This is the description of tab 2</p></div>",
  },
  {
    id: "tab-3",
    title: "Tab 3",
    content:
      "<div><h3>Tab 3 content</h3><p>This is the description of tab 3</p></div>",
  },
  {
    id: "tab-4",
    title: "very looooong tab",
    content:
      "<div><h3>Tab 4 content</h3><p>This is the description of tab 4</p></div>",
  },
];

// Function to set the active tab
/**
 * @param {string} tabId - The id of the tab
 * @param {number} idx - The index of the tab
 */
function setActiveTab(tabId, idx) {
  /** @type {NodeListOf<HTMLButtonElement>} */
  const tabHeaders = document.querySelectorAll(".tab-header");
  /**  @type {NodeListOf<HTMLDivElement>} */
  const tabContents = document.querySelectorAll(".tab-content");

  tabHeaders.forEach((tabHeader) => {
    if (tabHeader.dataset.tab === tabId) {
      tabHeader.classList.add("active");
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

function main() {
  /**  @type {NodeListOf<HTMLDivElement>} */
  const tabsHeaders = document.querySelector(".tabs-headers");
  /**  @type {NodeListOf<HTMLDivElement>} */
  const tabsContents = document.querySelector(".tabs-contents");

  tabs.forEach((tab, i) => {
    const tabHeader = document.createElement("button");
    tabHeader.classList.add("tab-header");
    tabHeader.textContent = tab.title;
    tabHeader.dataset.tab = tab.id;
    tabsHeaders.appendChild(tabHeader);

    tabHeader.addEventListener("click", () => {
      setActiveTab(tab.id, i);
    });

    const tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");
    tabContent.innerHTML = tab.content;
    tabContent.dataset.tab = tab.id;
    tabsContents.appendChild(tabContent);
  });

  // default selected tab
  setActiveTab(tabs[0].id, 0);
}

document.addEventListener("DOMContentLoaded", main);
