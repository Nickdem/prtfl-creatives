window.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".header-menu");
  const navigation = document.querySelector(".header-navigation");
  const menu = document.querySelector(".header-navigation");

  const showMenu = () => {
    menu?.classList.add("header-navigation--show");
  };

  menuBtn?.addEventListener("click", showMenu);

  function hideMenu() {
    menu?.classList.remove("header-navigation--show");
  }

  navigation?.addEventListener("click", hideMenu);
});
