interface IValues {
  [key: string]: string;
}

type IFormElements = Array<HTMLFormElement> | Array<Element>;

type IFormElement = HTMLInputElement | HTMLButtonElement;

function initMenu() {
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
}

function initForm() {
  const form: HTMLFormElement = document.querySelector(".contacts-form");

  function validationFields(values: IValues) {
    let check = true;

    for (let key in values) {
      if (values[key].trim() === "") {
        document.getElementById(key).classList.add("contacts-field--error");
        check = false;
      } else {
        document.getElementById(key).classList.remove("contacts-field--error");
      }
    }

    return check;
  }

  function resetForm(fields: IFormElements) {
    fields.forEach((element: IFormElement) => {
      if (element.id) {
        element.value = "";
      }
    });
  }

  function makeFormValues(fields: IFormElements) {
    let formValues: IValues = {};

    fields.forEach((element: IFormElement) => {
      if (element.id) {
        const key = element.id;
        const value = element.value;
        formValues[key] = value;
      }
    });

    return formValues;
  }

  function submitHadler(e: SubmitEvent) {
    e.preventDefault();
    const formFields: IFormElements = Array.from(form.children);

    const formValues = makeFormValues(formFields);

    if (validationFields(formValues)) {
      console.log(formValues);
      resetForm(formFields);
    }
  }

  form?.addEventListener("submit", submitHadler);
}

window.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initForm();
  // initLinks();
});

// function initLinks() {
//   const homeYPos = document.getElementById("home").getBoundingClientRect().top;
//   const aboutYPos = document
//     .getElementById("about")
//     .getBoundingClientRect().top;
//   const blogYPos = document.getElementById("blog").getBoundingClientRect().top;
//   const teamYPos = document.getElementById("team").getBoundingClientRect().top;
//   const contactsYPos = document
//     .getElementById("contacts")
//     .getBoundingClientRect().top;
//   const footerYPos = document
//     .querySelector("footer")
//     .getBoundingClientRect().top;
//   const homeLink = document.getElementById("home-link");
//   const aboutLink = document.getElementById("about-link");
//   const blogLink = document.getElementById("blog-link");
//   const teamLink = document.getElementById("team-link");
//   const contactsLink = document.getElementById("contacts-link");

//   function checkPos(pos1: number, pos2: number, linkEl: Element) {
//     let windowYPos = window.scrollY;
//     let activeClassName = "header-link--active";

//     if (windowYPos >= pos1 && windowYPos < pos2) {
//       if (linkEl.className.includes(activeClassName)) {
//         return;
//       }
//       // location.href = "#home";
//       linkEl.classList.add(activeClassName);
//     } else {
//       linkEl.classList.remove(activeClassName);
//     }
//   }

//   window.addEventListener("scroll", () => {
//     checkPos(homeYPos, aboutYPos, homeLink);
//     checkPos(aboutYPos, blogYPos, aboutLink);
//     checkPos(blogYPos, teamYPos, blogLink);
//     checkPos(teamYPos, contactsYPos, teamLink);
//     checkPos(contactsYPos, footerYPos, contactsLink);
//   });
// }
