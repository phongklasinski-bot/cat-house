const { ensureSaveData, defaultSaveData } = require('../../utils/storage');
const { furniture } = require('../../data/items');
const { houseLevels } = require('../../data/levels');

function getCurrentLevelName(level) {
  const currentLevel = houseLevels.find((item) => item.level === level) || houseLevels[0];
  return currentLevel.name;
}

Page({
  data: {
    saveData: defaultSaveData,
    furniture,
    currentLevelName: getCurrentLevelName(defaultSaveData.house.level)
  },

  onShow() {
    const saveData = ensureSaveData();
    this.setData({
      saveData,
      currentLevelName: getCurrentLevelName(saveData.house.level)
    });
  }
});
