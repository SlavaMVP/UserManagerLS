class User {
  constructor(tel, name, email, address) {
    this.tel = tel;
    this.name = name;
    this.email = email;
    this.address = address;
  }
}

export function createUser(form) {
  const user = new User(
    form.user_phone.value,
    form.user_fullname.value,
    form.user_email.value,
    form.user_address.value
  );
  return user;
}
