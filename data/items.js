const furniture = [
  {
    id: 'basic_bed',
    name: '软软猫窝',
    type: 'bed',
    level: 1,
    price: 0,
    image: '/assets/images/ui/basic_bed.png',
    description: '第一只猫咪带来的小猫窝。'
  },
  {
    id: 'sun_window',
    name: '晒太阳窗台',
    type: 'decor',
    level: 2,
    price: 120,
    image: '/assets/images/ui/sun_window.png',
    description: '让猫屋变得更暖和。'
  }
];

const dropItems = {
  coin: {
    type: 'coin',
    label: '金币',
    score: 1,
    rewardCoins: 1,
    speed: 3,
    emoji: '🪙'
  },
  bigCoin: {
    type: 'bigCoin',
    label: '大金币',
    score: 5,
    rewardCoins: 5,
    speed: 4,
    emoji: '💰'
  },
  yarn: {
    type: 'yarn',
    label: '毛线团',
    score: -3,
    rewardCoins: 0,
    speed: 4,
    emoji: '🧶'
  }
};

module.exports = {
  furniture,
  dropItems
};
