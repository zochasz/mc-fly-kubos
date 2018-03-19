const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;
const moment        = require("moment");

const UserSchema  = new Schema({
  username        : { type: String, required: true, unique: true },
  password        : { type: String, required: true },
  name            : { type: String, required: true },
  email           : { type: String, required: true, unique: true },
  _favourites     : [ { type: Schema.Types.ObjectId, ref: 'Note' } ],
  _myNotes        : [ { type: Schema.Types.ObjectId, ref: 'Note' } ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
