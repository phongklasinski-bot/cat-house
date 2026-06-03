const { dropItems } = require('../../../data/items');
const { randomInt, pick } = require('../../../utils/random');
const { finishCatchCoinGame } = require('../../../utils/game-state');

const FIELD_WIDTH = 686;
const FIELD_HEIGHT = 760;
const CAT_SIZE = 112;
const ITEM_SIZE = 64;
const GAME_SECONDS = 30;
const FRAME_MS = 32;
const DROP_MS = 620;

Page({
  data: {
    status: 'ready',
    timeLeft: GAME_SECONDS,
    score: 0,
    coinsEarned: 0,
    catX: 287,
    items: [],
    result: null
  },

  onUnload() {
    this.clearTimers();
  },

  startGame() {
    this.clearTimers();
    this.itemId = 0;
    this.setData({
      status: 'playing',
      timeLeft: GAME_SECONDS,
      score: 0,
      coinsEarned: 0,
      catX: 287,
      items: [],
      result: null
    });
    this.frameTimer = setInterval(() => this.tick(), FRAME_MS);
    this.dropTimer = setInterval(() => this.spawnItem(), DROP_MS);
    this.clockTimer = setInterval(() => this.countdown(), 1000);
  },

  clearTimers() {
    clearInterval(this.frameTimer);
    clearInterval(this.dropTimer);
    clearInterval(this.clockTimer);
  },

  countdown() {
    const timeLeft = this.data.timeLeft - 1;
    if (timeLeft <= 0) {
      this.finishGame();
      return;
    }
    this.setData({ timeLeft });
  },

  spawnItem() {
    const type = pick(['coin', 'coin', 'coin', 'bigCoin', 'yarn']);
    const config = dropItems[type];
    const item = {
      id: this.itemId += 1,
      type,
      emoji: config.emoji,
      x: randomInt(16, FIELD_WIDTH - ITEM_SIZE - 16),
      y: -ITEM_SIZE,
      speed: config.speed + Math.floor((GAME_SECONDS - this.data.timeLeft) / 8),
      score: config.score,
      rewardCoins: config.rewardCoins
    };
    this.setData({ items: this.data.items.concat(item) });
  },

  tick() {
    const catLeft = this.data.catX;
    const catRight = catLeft + CAT_SIZE;
    const catTop = FIELD_HEIGHT - CAT_SIZE - 18;
    let score = this.data.score;
    let coinsEarned = this.data.coinsEarned;

    const items = this.data.items
      .map((item) => ({ ...item, y: item.y + item.speed * 2 }))
      .filter((item) => {
        const itemLeft = item.x;
        const itemRight = item.x + ITEM_SIZE;
        const itemBottom = item.y + ITEM_SIZE;
        const caught = itemBottom >= catTop && item.y <= FIELD_HEIGHT && itemRight >= catLeft && itemLeft <= catRight;

        if (caught) {
          score = Math.max(0, score + item.score);
          coinsEarned += item.rewardCoins;
          return false;
        }

        return item.y < FIELD_HEIGHT + ITEM_SIZE;
      });

    this.setData({ items, score, coinsEarned });
  },

  moveLeft() {
    if (this.data.status !== 'playing') {
      return;
    }
    this.setData({ catX: Math.max(0, this.data.catX - 44) });
  },

  moveRight() {
    if (this.data.status !== 'playing') {
      return;
    }
    this.setData({ catX: Math.min(FIELD_WIDTH - CAT_SIZE, this.data.catX + 44) });
  },

  touchMove(event) {
    if (this.data.status !== 'playing') {
      return;
    }
    const touch = event.touches[0];
    const query = wx.createSelectorQuery();
    query.select('.game-field').boundingClientRect((rect) => {
      if (!rect) {
        return;
      }
      const ratio = FIELD_WIDTH / rect.width;
      const x = (touch.clientX - rect.left) * ratio - CAT_SIZE / 2;
      this.setData({ catX: Math.max(0, Math.min(FIELD_WIDTH - CAT_SIZE, x)) });
    }).exec();
  },

  finishGame() {
    this.clearTimers();
    const result = {
      score: this.data.score,
      coinsEarned: this.data.coinsEarned
    };
    finishCatchCoinGame(result.score, result.coinsEarned);
    this.setData({ status: 'finished', result, items: [] });
  },

  goHome() {
    wx.navigateBack();
  }
});
