export function GameIDGenerator(userID) {
    let time = new Date().toISOString();
    let random = Math.floor(Math.random() * 1000);

    let gameCode = `${userID}-${time}-${random}`;

    return gameCode;
}
