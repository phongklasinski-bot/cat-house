const fish = [
  {
    id: 'fish_001',
    name: '小鲫鱼',
    rarity: 'normal',
    image: '/assets/images/fish/fish_001.png',
    description: '最常见的小鱼。',
    unlockCondition: {
      type: 'fishing',
      count: 1
    }
  },
  {
    id: 'fish_002',
    name: '金鳞鱼',
    rarity: 'rare',
    image: '/assets/images/fish/fish_002.png',
    description: '闪闪发光，能卖出不错的价格。',
    unlockCondition: {
      type: 'fishingRare'
    }
  }
];

module.exports = fish;
