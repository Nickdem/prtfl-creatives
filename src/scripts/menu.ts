type IToDisElems =
  | NodeListOf<HTMLButtonElement>
  | NodeListOf<HTMLLinkElement>
  | NodeListOf<HTMLInputElement>
  | NodeListOf<HTMLTextAreaElement>;

function initMenu(body: HTMLBodyElement) {
  const menuBtn = document.querySelector(".header-menu");
  const menu = document.querySelector(".header-navigation");
  const menuActiveClassName = "header-navigation--show";
  const activeLinkClassName = "header-link--active";
  const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
    "button:not(.navigation-close)"
  );
  const inputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("input");
  const textAreas = document.querySelectorAll("textarea");
  const sectionLinks: NodeListOf<HTMLLinkElement> = document.querySelectorAll(
    "a:not(.header-link)"
  );
  const headerLinks: NodeListOf<HTMLLinkElement> =
    document.querySelectorAll(".header-link");
  const closeMenu: HTMLButtonElement =
    document.querySelector(".navigation-close");

  function disabledForElements(
    elements: IToDisElems,
    disabled = true,
    tabIndex = -1
  ) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = disabled;
      elements[i].tabIndex = tabIndex;
    }
  }

  function showMenu() {
    menu?.classList.add(menuActiveClassName);
    body.style.overflowY = "hidden";
    disabledForElements(btns);
    disabledForElements(inputs);
    disabledForElements(sectionLinks);
    disabledForElements(textAreas);
    closeMenu.disabled = false;
    disabledForElements(headerLinks, false, 1);
  }

  menuBtn?.addEventListener("click", showMenu);

  function makeActiveLink(el: Element) {
    const activeLink = menu.querySelector("." + activeLinkClassName);

    if (el.className === activeLink.className) {
      return;
    }

    activeLink.classList.remove(activeLinkClassName);
    el.classList.add(activeLinkClassName);
  }

  function hideMenu() {
    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
    disabledForElements(btns, false, 1);
    disabledForElements(inputs, false, 1);
    disabledForElements(sectionLinks, false, 1);
    disabledForElements(textAreas, false, 1);
    closeMenu.disabled = true;
    disabledForElements(headerLinks);
  }

  function clickHandler(e: Event) {
    const targetEl = e.target as Element;

    if (targetEl.tagName === "NAV" || targetEl.tagName === "BUTTON") {
      hideMenu();
      return;
    }

    if (targetEl.tagName === "A") {
      makeActiveLink(targetEl);
      hideMenu();
    }
  }

  menu?.addEventListener("click", clickHandler);

  if (window.innerWidth <= tabletWidth) {
    // нужна логика после перехода на таблет
    disabledForElements(headerLinks);
    closeMenu.disabled = true;
  }

  window.addEventListener("resize", function () {
    if (getComputedStyle(body).overflowY === "scroll") {
      return;
    }

    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
    disabledForElements(headerLinks, false, 1);
  });
}
