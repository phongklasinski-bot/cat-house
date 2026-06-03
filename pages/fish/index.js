const fish = require('../../data/fish');
const { ensureSaveData } = require('../../utils/storage');

function buildFishList(saveData) {
  return fish.map((item) => {
    const unlocked = saveData.fish.unlocked.indexOf(item.id) !== -1;
    return {
      ...item,
      unlocked,
      cardClass: unlocked ? 'fish-card' : 'fish-card locked',
      displayDescription: unlocked ? item.description : '尚未钓到'
    };
  });
}

Page({
  data: {
    fish: []
  },

  onShow() {
    const saveData = ensureSaveData();
    this.setData({ fish: buildFishList(saveData) });
  }
});
