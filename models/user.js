const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;
const moment        = require("moment");

const UserSchema  = new Schema({
  username        : { type: String, required: false },
  password        : { type: String, required: false },
  googleID        : String,
  _favourites     : [ { type: Schema.Types.ObjectId, ref: 'Note' } ],
  _myNotes        : [ { type: Schema.Types.ObjectId, ref: 'Note' } ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
