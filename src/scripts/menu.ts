function initMenu(body: HTMLBodyElement) {
  const menuBtn = document.querySelector(".header-menu");
  const navigation = document.querySelector(".header-navigation");
  const menu = document.querySelector(".header-navigation");
  const menuActiveClassName = "header-navigation--show";

  function showMenu() {
    menu?.classList.add(menuActiveClassName);
    body.style.overflowY = "hidden";
  }

  menuBtn?.addEventListener("click", showMenu);

  function hideMenu() {
    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
  }

  navigation?.addEventListener("click", hideMenu);

  window.addEventListener("resize", function () {
    if (getComputedStyle(body).overflowY === "scroll") {
      return;
    }

    menu?.classList.remove(menuActiveClassName);
    body.style.overflowY = "scroll";
  });
}
