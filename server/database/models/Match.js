const {mongoose} = require('../mongoose');

const MatchScheme = new mongoose.Schema({
    _id: {type: String},
    board: {type: Array, required: true},
    turn: {type: String, required: true},
    lastMove: {type: Array, required: true},
    status: {type: String, enum: ['1', '2', '3'], required: true},
    players: {type: Array, required: true},
    winner: {type: String, required: true},
}, {strict: true});

const schema = mongoose.models.match || mongoose.model('match', MatchScheme);

module.exports = schema