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

function main() {
  const tabsHeaders = document.querySelector(".tabs-headers");
  const tabsContents = document.querySelector(".tabs-contents");

  tabs.forEach((tab) => {
    const tabHeader = document.createElement("button");
    tabHeader.classList.add("tab-header");
    tabHeader.textContent = tab.title;
    tabsHeaders.appendChild(tabHeader);

    const tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");
    tabContent.innerHTML = tab.content;
    tabsContents.appendChild(tabContent);
  });
}

document.addEventListener("DOMContentLoaded", main);
