interface IValues {
  [key: string]: string;
}

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

  const form = document.querySelector(".contacts-form");

  function submitHadler(e: SubmitEvent) {
    e.preventDefault();

    const values: IValues = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    Array.from(form.children).forEach((element: HTMLFormElement) => {
      if (element.id in values) {
        const key = element.id;
        const value = element.value;
        values[key] = value;
      }
    });

    console.log(values);
  }

  form?.addEventListener("submit", submitHadler);
});
