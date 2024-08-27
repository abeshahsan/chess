import { Error } from "mongoose";
import MatchModel from "./models/MatchModel.js";

export async function CreateNewMatch(id, boardID, players) {
    const newMatch = new MatchModel({
        _id: id,
        boardID,
        status: "1",
        players,
        winner: "n/a",
    });

    const match = await newMatch.save();

    return match;
}

export async function GetMatchById(matchId) {
    try {
        const match = await MatchModel.findById(matchId);

        if (!match) {
            console.error("Match not found!");
            return null;
        }

        return match;
    } catch (err) {
        console.error("Failed to get match: ", err);
        return null;
    }
}

export async function UpdateMatch(matchId, update) {
    try {
        const match = await MatchModel.findByIdAndUpdate(matchId, update, { new: true });

        if (!match) {
            console.error("Match not found!");
            return null;
        }

        return match;
    } catch (err) {
        console.error("Failed to update match: ", err);
        return null;
    }
}
