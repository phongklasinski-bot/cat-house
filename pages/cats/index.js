const cats = require('../../data/cats');
const { ensureSaveData } = require('../../utils/storage');

function buildCatList(saveData) {
  return cats.map((cat) => ({
    ...cat,
    owned: saveData.cats.owned.indexOf(cat.id) !== -1
  }));
}

Page({
  data: {
    cats: []
  },

  onShow() {
    const saveData = ensureSaveData();
    this.setData({ cats: buildCatList(saveData) });
  }
});
