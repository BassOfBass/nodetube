const mongoose = require("mongoose");

class ModelInvite extends mongoose.Document {
  /**
   * @param {string} code 
   * @param {Date} expirationDate 
   * @param {number} usesLeft 
   * @param {"active" | "expired" | "expended" | "disabled"} status 
   * @param {mongoose.Schema.Types.ObjectId} creator 
   * @param {mongoose.Schema.Types.ObjectId[]} guests 
   */
  constructor(code, expirationDate, usesLeft, status, creator, guests){
    this.code = code;
    this.expirationDate = expirationDate;
    this.usesLeft = usesLeft;
    this.status = status;
    this.creator = creator;
    this.guests = guests;
  }
}

module.exports = ModelInvite;