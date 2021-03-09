import {
  domElements,
  renderLoader,
  clearLoader,
  renderUsersInfo,
  showButtonText,
} from "./modules/base";

import {
  appState,
  deleteUserDataFromState,
  addUserDataToState,
  setEditMode,
  setCurentUserId,
  filterUsersData,
  countTotalUsers,
  countTotalPages,
} from "./modules/appStateManager";

import {
  getUsersDataFromClientStorage,
  deleteUserDataFromClientStorage,
  addUserDataToLocalStorage,
  saveDataToClientStorage,
  getDataFromClientStorage,
} from "./modules/clientStorageManager";

import { clearTableBody, createTableRow, showTable } from "./modules/tableView";
import { setUserFormInputs, clearUserFormInputs } from "./modules/formView";
import { renderPagination } from "./modules/paginationView";
import { createUser } from "./modules/userModel";
import { validateForm } from "./modules/formValidations";

/* Styles */
import "../sass/style.scss";

const LS = localStorage;
const SS = sessionStorage;

document.addEventListener("DOMContentLoaded", initApp);
domElements.usersTable.addEventListener("click", tableActionsHandler);
domElements.submitButton.addEventListener("click", submitHandler);
domElements.exitEditModeBtn.addEventListener("click", exitEditModeHandler);
domElements.nextPaginationBtn.addEventListener("click", paginationHandler);
domElements.prevPaginationBtn.addEventListener("click", paginationHandler);

function initApp() {
  if (LS.length) {
    appState.userList = getUsersDataFromClientStorage(LS);
    appState.curentPage =
      +getDataFromClientStorage("onPage", SS) || appState.curentPage;
    appState.filteredBy =
      getDataFromClientStorage("filter", SS) || appState.filteredBy;
    filterUsersData(appState, appState.filteredBy);
    redrawTable(appState);
  }
}

function submitHandler(evt) {
  evt.preventDefault();
  appState.isFormValid = validateForm(domElements.userForm);

  if (appState.isFormValid) {
    const user = createUser(domElements.userForm);

    addUserData(appState.curentUserId, user, LS);

    filterUsersData(appState, appState.filteredBy);
    clearUserFormInputs(domElements.userForm);

    redrawTable(appState);
  }
}

function exitEditModeHandler(evt) {
  evt.preventDefault();
  setCurentUserId(null, appState);
  clearUserFormInputs(domElements.userForm);
  setEditMode(false, appState);
  showButtonText(false);
}

function tableActionsHandler(evt) {
  const action = evt.target.dataset.action || null;
  const userId = evt.target.dataset.id || null;
  const sortBy = evt.target.dataset.sortBy || null;

  if (action === "delete") {
    deleteUserData(userId, LS, appState);
    redrawTable(appState);
  } else if (action === "edit") {
    editUserData(userId, LS, appState);
    validateForm(domElements.userForm);
    showButtonText(true);
  }

  if (sortBy) {
    appState.filteredBy = sortBy;
    filterUsersData(appState, sortBy);
    redrawTable(appState);
    saveDataToClientStorage("filter", sortBy, SS);
  }
}

function paginationHandler(evt) {
  const goTo = evt.target.dataset.goTo;

  if (goTo === "forward" && appState.curentPage !== appState.totalPages) {
    appState.curentPage = appState.curentPage + 1;
  } else if (goTo === "backward" && appState.curentPage !== 1) {
    appState.curentPage = appState.curentPage - 1;
  }

  redrawTable(appState);
}

////////////////////////////////////////////////////////////////////////////////

function addUserData(key, data, storage) {
  let id = key;

  //? if user exists updates existing one
  if (id !== null) {
    deleteUserDataFromState(id, appState);
    setEditMode(false, appState);
    showButtonText(false);
  } else {
    id = new Date().getTime();
  }
  addUserDataToLocalStorage(data, id, storage);
  addUserDataToState(appState, data, id);
  setCurentUserId(null, appState);
}

function editUserData(key, storage, state) {
  const userData = getDataFromClientStorage(key, storage);
  setUserFormInputs(domElements.userForm, userData);
  setCurentUserId(key, state);
  setEditMode(true, state);
}

function deleteUserData(key, storage, state) {
  deleteUserDataFromClientStorage(key, storage);
  deleteUserDataFromState(key, state);
}

function redrawTable(state) {
  state.isLoading = true;

  if (state.isLoading) {
    countTotalUsers(state);
    countTotalPages(state);
    renderUsersInfo(state);

    renderLoader(domElements.loaderPlaceholder);

    new Promise((res, rej) => {
      //! just for immitation of some loading process
      setTimeout(() => {
        res(clearLoader());
      }, 50);
    }).then((res) => {
      state.isLoading = res;
      showTable(state);
    });
  }

  //? If we had deleted all users from current page
  if (state.totalPagesNumber < state.curentPage) {
    state.curentPage = state.totalPagesNumber;
  }
  clearTableBody();
  displayUsers(state.userList, state.usersPerPage, state.curentPage);
}

function displayUsers(users, perPage, curentPage) {
  const start = (curentPage - 1) * perPage;
  const end = curentPage * perPage;

  users.slice(start, end).forEach(createTableRow);

  renderPagination(
    curentPage,
    appState.totalUsersNumber,
    appState.usersPerPage
  );
  saveDataToClientStorage("onPage", curentPage, SS);
}
