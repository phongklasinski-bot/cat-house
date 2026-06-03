const cats = [
  {
    id: 'cat_001',
    name: '橘宝',
    rarity: 'normal',
    image: '/assets/images/cats/cat_001.png',
    description: '喜欢金币和晒太阳的小橘猫。',
    unlockCondition: {
      type: 'default'
    },
    bonus: {
      game: 'catchCoin',
      effect: 'coinRate',
      value: 0.05
    }
  },
  {
    id: 'cat_002',
    name: '雪球',
    rarity: 'rare',
    image: '/assets/images/cats/cat_002.png',
    description: '安静聪明，钓鱼时特别有耐心。',
    unlockCondition: {
      type: 'coins',
      value: 300
    },
    bonus: {
      game: 'fishing',
      effect: 'rareFishRate',
      value: 0.03
    }
  }
];

module.exports = cats;
