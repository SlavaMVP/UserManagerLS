export function setUserFormInputs(form, data) {
  form.user_phone.value = data.tel;
  form.user_fullname.value = data.name;
  form.user_email.value = data.email;
  form.user_address.value = data.address;
}

export function clearUserFormInputs(form) {
  form.user_phone.value = "";
  form.user_fullname.value = "";
  form.user_email.value = "";
  form.user_address.value = "";
}
