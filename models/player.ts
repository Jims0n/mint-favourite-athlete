import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema (
    {
        // Define the schema fields here, e.g., id, name, image
        id: Number,
        name: {type: String},
        image: String,
      }
);

const Player  = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player