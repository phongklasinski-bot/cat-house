const { ensureSaveData, defaultSaveData } = require('../../utils/storage');
const { pick } = require('../../utils/random');
const { furniture } = require('../../data/items');
const cats = require('../../data/cats');

const SPEECH_DURATION = 3000;

function getPurchasedFurniture(saveData) {
  const ownedFurniture = saveData.house.unlockedFurniture || [];
  return furniture.filter((item) => ownedFurniture.indexOf(item.id) !== -1);
}

Page({
  data: {
    saveData: defaultSaveData,
    activeCat: cats[0],
    purchasedFurniture: [],
    showSpeech: true,
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

  onHide() {
    this.clearSpeechTimer();
  },

  onUnload() {
    this.clearSpeechTimer();
  },

  loadHome() {
    const saveData = ensureSaveData();
    const activeCat = cats.find((cat) => cat.id === saveData.cats.activeCatId) || cats[0];
    const purchasedFurniture = getPurchasedFurniture(saveData);
    this.setData({ saveData, activeCat, purchasedFurniture, showSpeech: true });
    this.scheduleSpeechHide();
  },

  scheduleSpeechHide() {
    this.clearSpeechTimer();
    this.speechTimer = setTimeout(() => {
      this.setData({ showSpeech: false });
    }, SPEECH_DURATION);
  },

  clearSpeechTimer() {
    clearTimeout(this.speechTimer);
    this.speechTimer = null;
  },

  hideSpeech() {
    this.clearSpeechTimer();
    this.setData({ showSpeech: false });
  },

  tapCat() {
    const lines = [
      '喵，金币会自己掉下来吗？',
      '今天也想晒太阳。',
      '猫屋再软一点就好了。',
      '准备好接金币啦！'
    ];
    this.setData({ catLine: pick(lines), showSpeech: true });
    this.scheduleSpeechHide();
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
