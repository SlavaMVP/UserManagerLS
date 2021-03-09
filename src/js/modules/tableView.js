import { domElements } from "./base";

export function clearTableBody() {
  domElements.subHeader.classList.add("hide");
  domElements.usersTable.classList.add("hide");
  domElements.tableBody.innerHTML = "";
}

export function showTable(state) {
  if (!state.totalUsersNumber) {
    domElements.subHeader.classList.remove("hide");
    domElements.usersTable.classList.add("hide");
  } else {
    domElements.subHeader.classList.add("hide");
    domElements.usersTable.classList.remove("hide");
  }
}

export function createTableRow(user) {
  const newRow = domElements.rowTemplate.content.cloneNode(true);
  newRow.querySelector("#uPhone").innerText = user.tel;
  newRow.querySelector("#uName").innerText = user.name;
  newRow.querySelector("#uEmail").innerText = user.email;
  newRow.querySelector("#uAddress").innerText = user.address;
  const operations = newRow.querySelector("#uButtons");
  operations.querySelector(".btn--edit").setAttribute("data-id", user.id);
  operations.querySelector(".btn--delete").setAttribute("data-id", user.id);

  domElements.tableBody.appendChild(newRow);
}
