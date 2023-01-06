function initMenu(body: HTMLBodyElement) {
  const menuBtn = document.querySelector(".header-menu");
  const menu = document.querySelector(".header-navigation");
  const menuActiveClassName = "header-navigation--show";
  const activeLinkClassName = "header-link--active";

  function showMenu() {
    menu?.classList.add(menuActiveClassName);
    body.style.overflowY = "hidden";
  }

  menuBtn?.addEventListener("click", showMenu);

  function makeActiveLink(el: Element) {
    // разобраться с двойным нажатием и добавить нажатие на стрелку
    const activeLink = menu.querySelector("." + activeLinkClassName);

    if (el.className === activeLink.className) {
      return;
    }

    (el.children[0] as HTMLElement).click();
    activeLink.classList.remove(activeLinkClassName);
    el.classList.add(activeLinkClassName);
  }

  function hideMenu() {
    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
  }

  function clickHandler(e: Event) {
    let targetEl = e.target as Element;

    if (targetEl.className.indexOf("header-navigation") >= 0) {
      hideMenu();
      return;
    }

    if (targetEl.tagName === "A") {
      targetEl = targetEl.parentElement;
    }

    if (targetEl.id.indexOf("link") >= 0) {
      makeActiveLink(targetEl);
      hideMenu();
    }
  }

  menu?.addEventListener("click", clickHandler);

  window.addEventListener("resize", function () {
    if (getComputedStyle(body).overflowY === "scroll") {
      return;
    }

    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
  });
}
