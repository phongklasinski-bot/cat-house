const { updateSaveData } = require('./storage');
const { furniture } = require('../data/items');

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

function purchaseFurniture(furnitureId) {
  const item = furniture.find((entry) => entry.id === furnitureId);
  const result = {
    success: false,
    reason: item ? 'unknown' : 'notFound',
    saveData: null
  };

  if (!item) {
    return result;
  }

  result.saveData = updateSaveData((saveData) => {
    const unlockedFurniture = saveData.house.unlockedFurniture || [];
    const placedFurniture = saveData.house.placedFurniture || [];
    const owned = unlockedFurniture.indexOf(item.id) !== -1;

    if (owned) {
      result.reason = 'owned';
      return saveData;
    }

    if (saveData.player.coins < item.price) {
      result.reason = 'insufficientCoins';
      return saveData;
    }

    saveData.player.coins -= item.price;
    saveData.house.unlockedFurniture = unlockedFurniture.concat(item.id);
    saveData.house.placedFurniture = placedFurniture.concat(item.id);
    result.success = true;
    result.reason = 'purchased';
    return saveData;
  });

  return result;
}

module.exports = {
  addCoins,
  finishCatchCoinGame,
  purchaseFurniture
};
