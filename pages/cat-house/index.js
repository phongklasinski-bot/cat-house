const { ensureSaveData } = require('../../utils/storage');
const { furniture } = require('../../data/items');
const { houseLevels } = require('../../data/levels');

Page({
  data: {
    saveData: null,
    furniture,
    houseLevels
  },

  onShow() {
    this.setData({ saveData: ensureSaveData() });
  }
});
