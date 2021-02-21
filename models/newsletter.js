// newsletter model

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Newsletters = new Schema({
  name: String,
  email: String,
});

export default mongoose.models.newsletters ||
  mongoose.model("newsletters", Newsletters);
