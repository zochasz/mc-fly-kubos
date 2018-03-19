const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;
const moment        = require("moment");

const NoteSchema  = new Schema({
  title          : { type: String, required: [true, "Note must have a title"] },
  text           : { type: String, required: [true, "Note must have text"] },
  _author        : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
