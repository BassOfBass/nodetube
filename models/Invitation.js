const mongoose = require("mongoose");

const { ModelInvitation } = require("../lib/jsdocTypes/index");

const invitationSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true,
    required: true,
    immutable: true,
    // `nanoid` gives 21 character strings
    minlength: 21,
    maxlength: 21
  },

  title: {
    type: String,
    maxlength: 15
  },

  description: {
    type: String,
    maxlength: 200
  },

  usesLeft: {
    type: Number,
    default: 1
  },
  expirationDate: Date,

  /**
   * The state of the invitation.
   */
  status: {
    type: String,
    enum: ["active", "expired", "expended", "disabled"],
    default: "active"
  },

  /** 
   * The person creating the invitation.
   */
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true
  },

  /**
   * All users who entered the invitation.
   */
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]

}, { timestamps: true });

/**
 * @type mongoose.Model<ModelInvitation, {}>
 */
const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = {Invitation, invitationSchema};