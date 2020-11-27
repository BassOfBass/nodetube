const mongoose = require("mongoose");

const { ModelInvite } = require("../lib/jsdocTypes/index");

const inviteSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true,
    required: true,
    immutable: true
  },

  usesLeft: Number,
  expirationDate: Date,

  /**
   * The state of the invite.
   */
  status: {
    type: String,
    enum: ["active", "expired", "expended", "disabled"],
    default: "active"
  },

  /** 
   * The person creating the invite.
   */
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true
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