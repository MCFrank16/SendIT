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

  updateOneUser(UzaID, ser) {
    const idi = UzaID || this.id;
    const data = UserData.find(c => c.id === idi);
    const index = UserData.indexOf(data);
    if (index === -1) {
      return undefined;
    }
    UserData[index].firstName = ser.firstName;
    UserData[index].lastName = ser.lastName;
    UserData[index].email = ser.email;
    UserData[index].password = ser.password;
    UserData[index].userName = ser.userName;
    return UserData[index];
  }
}
export {
  User,
  UserData,
};
