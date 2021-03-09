export function getUsersDataFromClientStorage(storage) {
  let parsedData = [];
  let userData;

  for (let key in storage) {
    userData = storage.getItem(key);

    if (userData) {
      userData = JSON.parse(userData);
      //? set key as id for a user
      userData.id = key;
      parsedData.push(userData);
    }
  }
  return parsedData;
}

export function deleteUserDataFromClientStorage(key, storage) {
  storage.removeItem(key);
}

export function addUserDataToLocalStorage(data, key, storage) {
  const userData = JSON.stringify(data);
  saveDataToClientStorage(key, userData, storage);
}

export function saveDataToClientStorage(key, data, storage) {
  storage.setItem(key, data);
}

export function getDataFromClientStorage(key, storage) {
  let data = storage.getItem(key);
  if (storage === localStorage) {
    data = JSON.parse(data);
  }
  return data;
}
