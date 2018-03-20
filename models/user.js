const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema        = mongoose.Schema;
const moment        = require("moment");

const UserSchema  = new Schema({
  username        : { type: String, required: false },
  password        : { type: String, required: false },
  _favourites     : [ { type: Schema.Types.ObjectId, ref: 'Note' } ]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err); }
                else {
                    user.password = hash;
                    return next();
                }
            })
        }
    })
});

UserSchema.methods.checkPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
