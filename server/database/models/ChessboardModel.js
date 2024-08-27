import pkg from "mongoose";
const { Schema, model, models } = pkg;

const chessBoardSchema = new Schema(
    {
        boardState: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[prnbqkPRNBQK1-8\.]{64}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid board state!`,
            },
        },
        currentPlayer: {
            type: String,
            enum: ["white", "black"],
            required: true,
        },
        moveHistory: [
            {
                from: { type: String, required: true },
                to: { type: String, required: true },
                piece: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { strict: true },
    { Collection: "chessboards" }
);

const ChessBoard = models.chessboards || model("chessboards", chessBoardSchema);

export default ChessBoard;
