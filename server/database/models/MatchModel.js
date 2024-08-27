import pkg from "mongoose";
const { Schema, model, models } = pkg;

const MatchSchema = new Schema(
    {
        _id: {
            type: String,
        },
        boardID: {
            type: Array,
            required: true,
        },
        status: {
            type: String,
            enum: ["1", "2", "3"], // 1 = ongoing, 2 = draw, 3 = finished
            required: true,
        },
        players: {
            type: Array,
            required: true,
        },
        winner: {
            type: String,
            required: true,
        },
    },
    { strict: true },
    { collection: "matches" }
);

const Matches = models.matches || model("matches", MatchSchema);

export default Matches;
