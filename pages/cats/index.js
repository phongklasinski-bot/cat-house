const cats = require('../../data/cats');
const { ensureSaveData } = require('../../utils/storage');

Page({
  data: {
    cats,
    ownedMap: {}
  },

  onShow() {
    const saveData = ensureSaveData();
    const ownedMap = saveData.cats.owned.reduce((map, id) => {
      map[id] = true;
      return map;
    }, {});
    this.setData({ ownedMap });
  }
});
