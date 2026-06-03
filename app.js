const { ensureSaveData } = require('./utils/storage');

App({
  globalData: {
    saveData: null
  },

  onLaunch() {
    this.globalData.saveData = ensureSaveData();
  }
});
