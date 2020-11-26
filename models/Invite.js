const mongoose = require("mongoose");

const { ModelInvite } = require("../lib/jsdocTypes/index");

const inviteSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true,
  },

  expirationDate: Date,
  usesLeft: Number,

  /** 
   * The person creating the invite.
   */
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  /**
   * All users who entered the invite.
   */
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]

}, { timestamps: true });

/**
 * @type mongoose.Model<ModelInvite, {}>
 */
const Invite = mongoose.model("Invite", inviteSchema);

module.exports = Invite;