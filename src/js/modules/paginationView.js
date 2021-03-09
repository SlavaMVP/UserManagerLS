import { domElements } from "./base";

export function renderPagination(curentPage, usersNumber, usersPerPage) {
  const totalPages = Math.ceil(usersNumber / usersPerPage);

  if (curentPage === 1 && totalPages > 1) {
    domElements.nextPaginationBtn.classList.remove("hide");
    domElements.prevPaginationBtn.classList.add("hide");
  } else if (curentPage < totalPages) {
    domElements.nextPaginationBtn.classList.remove("hide");
    domElements.prevPaginationBtn.classList.remove("hide");
  } else if (curentPage === totalPages && totalPages > 1) {
    domElements.nextPaginationBtn.classList.add("hide");
    domElements.prevPaginationBtn.classList.remove("hide");
  } else {
    domElements.nextPaginationBtn.classList.add("hide");
    domElements.prevPaginationBtn.classList.add("hide");
  }
}
