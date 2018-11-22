
const ParcelData = [];
class Parcel {
  constructor({
    id,
    name,
    from,
    to,
    status,
    plocation,
    createdDate,
    modifiedDate,
    userID,
  } = {}) {
    this.id = id;
    this.name = name;
    this.from = from;
    this.to = to;
    this.status = status;
    this.plocation = plocation;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.userID = userID;
  }

  findOne(parcelId) {
    const id = parcelId || this.id;
    const parcel = ParcelData.find(p => p.id === id);
    return parcel;
  }

  updateStatus(ParcelID) {
    const id = ParcelID || this.id;
    const parcel = ParcelData.find(p => p.id === id);
    const index = ParcelData.indexOf(parcel);
    if (index === -1) {
      return undefined;
    }
    ParcelData[index].status = 'cancelled';
    return ParcelData[index];
  }

  findUser(UserID) {
    const userid = UserID || this.userID;
    const parcel = ParcelData.filter(uz => uz.UserID === userid);
    return parcel;
  }
}
export {
  Parcel,
  ParcelData,
};
