const mongoose = require("mongoose");
const { Schema } = mongoose; // ES2015

// mongoose want to know in advance what properties we might need 
const userSchema = new Schema({
  googleID: String
});

mongoose.model("users", userSchema);
