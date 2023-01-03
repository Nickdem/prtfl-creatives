interface IValues {
  [key: string]: string;
}

type IFormElements = Array<HTMLFormElement> | Array<Element>;

type IFormElement = HTMLInputElement | HTMLButtonElement;

function initMenu() {
  const menuBtn = document.querySelector(".header-menu");
  const navigation = document.querySelector(".header-navigation");
  const menu = document.querySelector(".header-navigation");
  const body = document.querySelector("body");
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

function initForm() {
  const form: HTMLFormElement = document.querySelector(".contacts-form");
  const alert: HTMLDivElement = document.querySelector(".alert");
  const alertText: HTMLParagraphElement = alert.querySelector(".alert-text");
  const alertExitBtn: HTMLButtonElement = document.querySelector(".alert-exit");

  const errorFieldClassName = "contacts-field--error";
  const errorAlertClassName = "alert--error";
  const successAlertClassName = "alert--success";
  const showAlertClassName = "alert-show";

  function showHelper(type: string) {
    if (type === "error") {
      alertText.innerText = "Проверьте внимательно поля формы!";
      alert.classList.add(errorAlertClassName);
    } else if (type === "success") {
      alertText.innerText = "Данные успешно отправлены!";
      alert.classList.add(successAlertClassName);
    }

    alert.classList.add(showAlertClassName);
  }

  function hideHelper() {
    alert.classList.remove(showAlertClassName);
    alert.classList.remove(errorAlertClassName);
    alert.classList.remove(successAlertClassName);
    alertText.innerText = "...";
  }

  function validationFields(values: IValues) {
    let check = true;

    for (const key in values) {
      if (values[key].trim() === "") {
        document.getElementById(key).classList.add(errorFieldClassName);
        check = false;
      } else {
        document.getElementById(key).classList.remove(errorFieldClassName);
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
    const formValues: IValues = {};

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
    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;

    const formFields: IFormElements = Array.from(form.children);
    const formValues = makeFormValues(formFields);

    if (validationFields(formValues)) {
      console.log(formValues);
      showHelper("success");
      resetForm(formFields);
      submitBtn.disabled = false;
    } else {
      showHelper("error");
      submitBtn.disabled = false;
    }
  }

  form?.addEventListener("submit", submitHadler);
  alertExitBtn.addEventListener("click", hideHelper);
}

window.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initForm();
});
