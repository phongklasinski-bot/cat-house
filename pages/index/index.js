const { ensureSaveData, defaultSaveData } = require('../../utils/storage');
const { pick } = require('../../utils/random');
const cats = require('../../data/cats');

Page({
  data: {
    saveData: defaultSaveData,
    activeCat: cats[0],
    catLine: '今天也要把猫屋变得更舒服。',
    gameEntries: [
      {
        id: 'catchCoin',
        title: '猫猫接金币',
        subtitle: '左右移动，接住掉落金币',
        icon: '🪙',
        url: '/pages/games/catch-coin/index'
      },
      {
        id: 'fishing',
        title: '猫猫钓鱼',
        subtitle: '第二阶段开放',
        icon: '🎣',
        disabled: true
      },
      {
        id: 'catchMouse',
        title: '猫猫抓老鼠',
        subtitle: '第二阶段开放',
        icon: '🐭',
        disabled: true
      }
    ]
  },

  onShow() {
    this.loadHome();
  },

  loadHome() {
    const saveData = ensureSaveData();
    const activeCat = cats.find((cat) => cat.id === saveData.cats.activeCatId) || cats[0];
    this.setData({ saveData, activeCat });
  },

  tapCat() {
    const lines = [
      '喵，金币会自己掉下来吗？',
      '今天也想晒太阳。',
      '猫屋再软一点就好了。',
      '准备好接金币啦！'
    ];
    this.setData({ catLine: pick(lines) });
  },

  openGame(event) {
    const index = Number(event.currentTarget.dataset.index);
    const entry = this.data.gameEntries[index];

    if (!entry || entry.disabled || !entry.url) {
      wx.showToast({ title: '即将开放', icon: 'none' });
      return;
    }

    wx.navigateTo({ url: entry.url });
  },

  goHouse() {
    wx.navigateTo({ url: '/pages/cat-house/index' });
  },

  goCats() {
    wx.navigateTo({ url: '/pages/cats/index' });
  },

  goFish() {
    wx.navigateTo({ url: '/pages/fish/index' });
  }
});
