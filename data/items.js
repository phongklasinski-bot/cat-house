const furniture = [
  {
    id: 'cat_bed',
    name: '猫窝',
    type: 'bed',
    price: 100,
    icon: '🧺',
    description: '橘小豆最喜欢的柔软休息角。'
  },
  {
    id: 'scratching_board',
    name: '猫抓板',
    type: 'play',
    price: 200,
    icon: '🪵',
    description: '保护家具，也让猫爪保持好心情。'
  },
  {
    id: 'house_window',
    name: '窗户',
    type: 'decor',
    price: 300,
    icon: '🪟',
    description: '阳光和风景都会来到猫屋。'
  },
  {
    id: 'cat_tree',
    name: '猫爬架',
    type: 'play',
    price: 500,
    icon: '🌳',
    description: '可以攀爬、眺望和偷偷打盹。'
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
