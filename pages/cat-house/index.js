const { ensureSaveData, defaultSaveData } = require('../../utils/storage');
const { furniture } = require('../../data/items');
const { houseLevels } = require('../../data/levels');

function getCurrentLevelName(level) {
  const currentLevel = houseLevels.find((item) => item.level === level) || houseLevels[0];
  return currentLevel.name;
}

function getPurchasedFurniture(saveData) {
  return furniture.filter((item) => saveData.house.unlockedFurniture.indexOf(item.id) !== -1);
}

Page({
  data: {
    saveData: defaultSaveData,
    purchasedFurniture: [],
    currentLevelName: getCurrentLevelName(defaultSaveData.house.level)
  },

  onShow() {
    const saveData = ensureSaveData();
    this.setData({
      saveData,
      purchasedFurniture: getPurchasedFurniture(saveData),
      currentLevelName: getCurrentLevelName(saveData.house.level)
    });
  },

  openShop() {
    wx.navigateTo({ url: '/pages/cat-house/shop/index' });
  }
});
