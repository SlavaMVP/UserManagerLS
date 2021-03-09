export const appState = {
  userList: [],
  isFormValid: true,
  isEditMode: false,
  curentUserId: null,
  isLoading: true,
  totalUsersNumber: 0,
  totalPagesNumber: 1,
  usersPerPage: 5,
  curentPage: 1,
  filteredBy: "phone-number",
};

export function deleteUserDataFromState(id, state) {
  //! Did in immutable way
  let userList = [...state.userList];
  userList = userList.filter((el) => el.id != id);
  state.userList = userList;
}

export function addUserDataToState(state, data, key) {
  state.userList.push({ ...data, id: key });
}

export function setEditMode(val, state) {
  state.isEditMode = val;
}

export function setCurentUserId(id, state) {
  if (id) {
    state.curentUserId = id;
  } else {
    state.curentUserId = null;
  }
}

export function filterUsersData(state, filterBy) {
  if (filterBy === "phone-number") {
    state.userList.sort((a, b) => a.tel - b.tel);
  } else if (filterBy) {
    state.userList.sort(function (a, b) {
      //in Case if email in diff registers
      const x = a[filterBy].toLowerCase();
      const y = b[filterBy].toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }
}

export function countTotalUsers(state) {
  state.totalUsersNumber = state.userList.length;
}

export function countTotalPages(state) {
  if (!state.totalUsersNumber) {
    state.totalPagesNumber = 1;
  } else {
    state.totalPagesNumber = Math.ceil(
      state.totalUsersNumber / state.usersPerPage
    );
  }
}
