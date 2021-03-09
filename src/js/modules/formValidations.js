import { domElements } from "./base";

const validationData = {
  telephone: { inputVal: "", required: true, minLength: 11, valid: false },
  name: { inputVal: "", required: true, fullName: true, valid: false },
  email: {
    inputVal: "",
    required: true,
    valid: false,
    regexp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  address: { inputVal: "", required: true, valid: false },
};

export function validateForm(form) {
  let index = 0;
  //1 collect data from inputs
  collectDataFromInputs(form);
  //2 validate inputs
  for (let key in validationData) {
    validateInput(key, index);
    index++;
  }
  //3 check if form valid
  if (
    validationData.name.valid &&
    validationData.email.valid &&
    validationData.telephone.valid &&
    validationData.address.valid
  ) {
    domElements.userForm.classList.remove("invalid");
    return true;
  }
}

function collectDataFromInputs(form) {
  validationData.name.inputVal = form["user-name"].value;
  validationData.email.inputVal = form["user-email"].value;
  validationData.address.inputVal = form["user-address"].value;
  validationData.telephone.inputVal = form["user_phone"].value;
}

function validateInput(key, index) {
  let errorMessage = "";
  let isValid = true;
  const inputData = validationData[key].inputVal;

  if (validationData[key].minLength) {
    isValid =
      inputData.length < validationData[key].minLength ||
      inputData.length > validationData[key].minLength;

    if (isValid) {
      validationData[key].valid = false;
      errorMessage = `Длина номера должна быть ${validationData[key].minLength} цифр`;
      domElements.userForm.classList.add("invalid");
    }
  }
  if (validationData[key].regexp) {
    isValid = validationData[key].regexp.test(String(inputData).toLowerCase());

    if (!isValid) {
      validationData[key].valid = false;
      errorMessage = "Введите валидный эмейл (name@gmail.com)";
      domElements.userForm.classList.add("invalid");
    }
  }

  if (validationData[key].fullName) {
    isValid = inputData.trim().split(" ").length !== 2;

    if (isValid) {
      validationData[key].valid = false;
      errorMessage = "Введите имя и фамилию (Игорь Петров)";
      domElements.userForm.classList.add("invalid");
    }
  }

  if (validationData[key].required) {
    isValid = !inputData.trim();

    if (isValid) {
      validationData[key].valid = false;
      errorMessage = "Поле не должно быть пустым";
      domElements.userForm.classList.add("invalid");
    }
  }
  if (!errorMessage.trim()) {
    validationData[key].valid = true;
  }
  showErrorMessage(errorMessage, index);
}

function showErrorMessage(message, index) {
  domElements.errorMessageNode[index].innerText = message;
}
