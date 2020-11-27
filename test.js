const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  test1: {
    type: String,
    required: true, 
    minlength: 3,
    maxlength: 10,
    default: "default string"
  },
  test2: {
    type: Number,
    min: 3,
    max: 19,
    default: 11
  }
})

console.log(testSchema.obj);
// console.log(testSchema.path("test1").minlength());
// console.log(testSchema.path("test1").maxlength());
// console.log(testSchema.path("test1").default());