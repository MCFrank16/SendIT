
import uuid from 'uuid';
//const uuid = require('uuid');

class SendIT {
  /**
   * class constructor
   * @param {object} data
   * empty array to store in the parcels
   */
  constructor() {
    this.parcels = [];
  }
  /**
   * creation of a new Parcel method
   * @returns {object} Parcels object
   */
  create(data) {
    const newParcel = {
      id: uuid.v4(),
      Name: data.Name || '',
      Model: data.Model || '',
      From: data.From || '',
      To: data.To || '',
      NowAt: data.NowAt || '',
      Status: data.Status || '',
      UserID: data.UserID || '',
      CreatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    };
    this.parcels.push(newParcel);
    return newParcel
  }
  /**
   * get one parcel by Its ID
   * @param {uuid} id
   * @returns {object} parcel object
   */
  findOne(id) {
    return this.parcels.find(courier => courier.id === id);
  }
    
    /**
    * get one user based on his ID number
    * @ param UserID 
    */
  findUser(UserID){
      return this.parcels.find(zigo => zigo.UserID === UserID);
  }    
  /**
   * @returns {object} returns all Parcels
   */
  findAll() {
    return this.parcels;
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   * update a certain data required by the admin
   */
  update(id, data) {
    const Ucourier = this.findOne(id);
    const index = this.parcels.indexOf(Ucourier);
    this.parcels[index].Name = data['Name'] || Ucourier.Name;
    this.parcels[index].Model = data['Model'] || Ucourier.Model;
    this.parcels[index].From = data['From'] || Ucourier.From;
    this.parcels[index].To = data['To'] || Ucourier.To;
    this.parcels[index].NowAt = data['NowAt'] || Ucourier.NowAt;
    this.parcels[index].Status = data['Status'] || Ucourier.Status;
      
    return this.parcels[index];
  }
  /**
   * 
   * @param {uuid} id 
   * delete a parcel by its ID
   */
  delete(id) {
    const delet = this.findOne(id);
    const index = this.parcels.indexOf(delet);
    this.parcels.splice(index, 1);
    return {};
  }
}
export default new SendIT();