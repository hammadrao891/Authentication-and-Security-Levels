const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password:
    {
        type:String
    }
  },
  { timestamps: true }
);
// const secret = "secret";
// UserSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"] })

module.exports = mongoose.model("User", UserSchema);