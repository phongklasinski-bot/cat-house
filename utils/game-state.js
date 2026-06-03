const { updateSaveData } = require('./storage');

function addCoins(amount) {
  return updateSaveData((saveData) => {
    saveData.player.coins += amount;
    return saveData;
  });
}

function finishCatchCoinGame(score, coinsEarned) {
  return updateSaveData((saveData) => {
    const stats = saveData.games.catchCoin;
    stats.totalPlays += 1;
    stats.totalCoinsEarned += coinsEarned;
    stats.highScore = Math.max(stats.highScore, score);
    saveData.player.coins += coinsEarned;
    return saveData;
  });
}

module.exports = {
  addCoins,
  finishCatchCoinGame
};
