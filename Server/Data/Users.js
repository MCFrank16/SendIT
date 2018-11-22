const UserData = [];
class User {
  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    userName,
    createdDate,
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.createdDate = createdDate;
  }

  findOneUser(userId) {
    const id = userId || this.id;
    const uuser = UserData.find(p => p.id === id);
    return uuser;
  }

  updateoneUser(UzaID) {
    const id = UzaID || this.id;
    const user = UserData.find(k => k.id === id);
    const index = UserData.indexOf(user);
    UserData[index].firstName = this.firstName || user.firstName;
    UserData[index].lastName = this.lastName || user.lastName;
    UserData[index].email = this.email || user.email;
    UserData[index].userName = this.userName || user.userName;
    return UserData[index];
  }
}
export {
  User,
  UserData,
};
