// item model

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Items = new Schema({
  images: String,
});

export default mongoose.models.items || mongoose.model("items", Items);
