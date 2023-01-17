const tabletWidth = 767;

function headerInit() {
  const header: HTMLBaseElement = document.querySelector(".header");
  const hero: HTMLBaseElement = document.querySelector(".hero");

  const mobHeaderHeight = 90;
  const headerHeight = 108;

  const headerStaticClassName = "header-static";
  const headerFixedClassName = "header-fixed";

  function getHeaderHeight() {
    if (window.innerWidth >= tabletWidth) {
      return headerHeight;
    } else {
      return mobHeaderHeight;
    }
  }

  function addHeroStyles(height: string, paddingTop: string) {
    hero.style.paddingTop = paddingTop;
    hero.style.height = height;
  }

  function addHeaderClassName(addClassName: string, removeClassName: string) {
    header.classList.remove(removeClassName);
    header.classList.add(addClassName);
  }

  function checkHeaderClassName(cn: string) {
    return header.className.includes(cn);
    // return header.className.indexOf(cn) >= 0;
  }

  function scrollHandler() {
    if (window.scrollY > getHeaderHeight()) {
      if (checkHeaderClassName(headerFixedClassName)) {
        return;
      }

      addHeroStyles("100vh", getHeaderHeight() + "px");
      addHeaderClassName(headerFixedClassName, headerStaticClassName);
    } else {
      if (checkHeaderClassName(headerStaticClassName)) {
        return;
      }

      addHeroStyles(window.innerHeight - getHeaderHeight() + "px", "0");
      addHeaderClassName(headerStaticClassName, headerFixedClassName);
    }
  }

  scrollHandler();

  document.addEventListener("scroll", scrollHandler);
}
