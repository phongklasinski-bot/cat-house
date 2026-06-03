const fish = require('../../data/fish');
const { ensureSaveData } = require('../../utils/storage');

Page({
  data: {
    fish,
    unlockedMap: {}
  },

  onShow() {
    const saveData = ensureSaveData();
    const unlockedMap = saveData.fish.unlocked.reduce((map, id) => {
      map[id] = true;
      return map;
    }, {});
    this.setData({ unlockedMap });
  }
});
