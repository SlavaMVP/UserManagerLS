export const domElements = {
  tableBody: document.querySelector("#table__body"),
  userForm: document.querySelector("#user-form"),
  submitButton: document.querySelector("#submit-button"),
  usersTable: document.querySelector("#user-table"),
  subHeader: document.querySelector("#sub-header"),
  loaderPlaceholder: document.querySelector("#loader"),
  totalUsersNum: document.querySelector(".info__total"),
  perPageUsersNum: document.querySelector(".info__perpage"),
  pagination: document.querySelector(".pagination"),
  nextPaginationBtn: document.querySelector(".button--next"),
  prevPaginationBtn: document.querySelector(".button--prev"),
  exitEditModeBtn: document.querySelector("#exit-btn"),

  rowTemplate: document.querySelector("#row-template"),
  errorMessageNode: document.querySelectorAll(".error-message"),
};

export const renderLoader = (parent) => {
  const loader = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(".lds-roller");
  if (loader) loader.parentElement.removeChild(loader);
  return false;
};

export function renderUsersInfo(state) {
  domElements.totalUsersNum.innerHTML = `<p>Всего в таблице <b>${state.totalUsersNumber}</b></p>`;
  domElements.perPageUsersNum.innerHTML = `<p>Показано на странице ${
    state.totalUsersNumber < state.usersPerPage
      ? state.totalUsersNumber
      : state.usersPerPage
  }</p>`;
}

export function showButtonText(val) {
  val
    ? domElements.exitEditModeBtn.classList.remove("hide")
    : domElements.exitEditModeBtn.classList.add("hide");
  domElements.submitButton.innerText = val
    ? "Сохранить изменения"
    : "Добавить нового пользователя";
}
