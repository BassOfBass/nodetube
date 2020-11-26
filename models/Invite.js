const { Schema, model } = require("mongoose");

const inviteSchema = new Schema({
  code: String,
  expirationDate: Date,
  usesLeft: Number,

  /** 
   * The person creating the invite.
   */
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  /**
   * All users who entered the invite.
   */
  guests: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

}, { timestamps: true });

const Invite = model("Invite", inviteSchema);

module.exports = Invite;