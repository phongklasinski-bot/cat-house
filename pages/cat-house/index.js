const { ensureSaveData, defaultSaveData } = require('../../utils/storage');
const { furniture } = require('../../data/items');
const { houseLevels } = require('../../data/levels');
const { purchaseFurniture } = require('../../utils/game-state');

function getCurrentLevelName(level) {
  const currentLevel = houseLevels.find((item) => item.level === level) || houseLevels[0];
  return currentLevel.name;
}

function getPurchasedFurniture(saveData) {
  return furniture.filter((item) => saveData.house.unlockedFurniture.indexOf(item.id) !== -1);
}

function buildFurnitureCatalog(saveData) {
  return furniture.map((item) => ({
    ...item,
    owned: saveData.house.unlockedFurniture.indexOf(item.id) !== -1
  }));
}

Page({
  data: {
    saveData: defaultSaveData,
    purchasedFurniture: [],
    furnitureCatalog: [],
    currentLevelName: getCurrentLevelName(defaultSaveData.house.level)
  },

  onShow() {
    this.refreshHouse();
  },

  refreshHouse(saveData) {
    const currentSave = saveData || ensureSaveData();
    this.setData({
      saveData: currentSave,
      purchasedFurniture: getPurchasedFurniture(currentSave),
      furnitureCatalog: buildFurnitureCatalog(currentSave),
      currentLevelName: getCurrentLevelName(currentSave.house.level)
    });
  },

  buyFurniture(event) {
    const index = Number(event.currentTarget.dataset.index);
    const item = this.data.furnitureCatalog[index];

    if (!item) {
      return;
    }

    const result = purchaseFurniture(item.id);

    if (!result.success) {
      if (result.reason === 'insufficientCoins') {
        wx.showToast({ title: '金币不足', icon: 'none' });
      } else if (result.reason === 'owned') {
        wx.showToast({ title: '已经拥有', icon: 'none' });
      }
      return;
    }

    this.refreshHouse(result.saveData);
    wx.showToast({ title: '购买成功', icon: 'success' });
  },

  openShop() {
    wx.navigateTo({ url: '/pages/cat-house/shop/index' });
  }
});
