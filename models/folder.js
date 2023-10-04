import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    ref: "User",
    path: "id",
    required: true,
  },
});


folderSchema.index({owner: 1});

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;