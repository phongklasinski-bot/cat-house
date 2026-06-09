const { furniture } = require('../../../data/items');
const { ensureSaveData } = require('../../../utils/storage');
const { purchaseFurniture } = require('../../../utils/game-state');

function buildShopItems(saveData) {
  return furniture.map((item) => ({
    ...item,
    owned: saveData.house.unlockedFurniture.indexOf(item.id) !== -1
  }));
}

Page({
  data: {
    coins: 0,
    shopItems: []
  },

  onShow() {
    this.refreshShop();
  },

  refreshShop(saveData) {
    const currentSave = saveData || ensureSaveData();
    this.setData({
      coins: currentSave.player.coins,
      shopItems: buildShopItems(currentSave)
    });
  },

  buyFurniture(event) {
    const index = Number(event.currentTarget.dataset.index);
    const item = this.data.shopItems[index];

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

    this.refreshShop(result.saveData);
    wx.showToast({ title: '购买成功', icon: 'success' });
  }
});
