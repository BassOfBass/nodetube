const mongoose = require("mongoose");

class ModelInvitation extends mongoose.Document {
  /**
   * @param {string} code 
   * @param {string} title 
   * @param {string} description 
   * @param {Date} expirationDate 
   * @param {number} usesLeft 
   * @param {"active" | "expired" | "expended" | "disabled"} status 
   * @param {mongoose.Schema.Types.ObjectId} creator 
   * @param {mongoose.Schema.Types.ObjectId[]} guests 
   */
  constructor(code, title, description, expirationDate, usesLeft, status, creator, guests){
    this.code = code;
    this.title = title;
    this.description = description;
    this.expirationDate = expirationDate;
    this.usesLeft = usesLeft;
    this.status = status;
    this.creator = creator;
    this.guests = guests;
  }
}

module.exports = ModelInvitation;
