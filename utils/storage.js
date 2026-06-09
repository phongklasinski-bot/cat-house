const { STORAGE_KEY } = require('./constants');

const defaultSaveData = {
  version: 1,
  player: {
    coins: 0,
    fishSnacks: 0,
    stamina: 5,
    lastLoginDate: ''
  },
  house: {
    level: 1,
    unlockedFurniture: [],
    placedFurniture: []
  },
  cats: {
    owned: ['cat_001'],
    activeCatId: 'cat_001',
    affection: {
      cat_001: 0
    }
  },
  fish: {
    unlocked: []
  },
  games: {
    catchCoin: {
      highScore: 0,
      totalPlays: 0,
      totalCoinsEarned: 0
    },
    fishing: {
      highScore: 0,
      totalPlays: 0
    },
    catchMouse: {
      highScore: 0,
      totalPlays: 0
    }
  },
  settings: {
    soundEnabled: true,
    musicEnabled: true
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeSaveData(base, patch) {
  const next = clone(base);
  Object.keys(patch || {}).forEach((key) => {
    if (patch[key] && typeof patch[key] === 'object' && !Array.isArray(patch[key])) {
      next[key] = mergeSaveData(next[key] || {}, patch[key]);
      return;
    }
    next[key] = patch[key];
  });
  return next;
}

function readSaveData() {
  return wx.getStorageSync(STORAGE_KEY) || null;
}

function writeSaveData(saveData) {
  wx.setStorageSync(STORAGE_KEY, saveData);
  return saveData;
}

function ensureSaveData() {
  const current = readSaveData();
  const saveData = current ? mergeSaveData(defaultSaveData, current) : clone(defaultSaveData);
  return writeSaveData(saveData);
}

function updateSaveData(updater) {
  const current = ensureSaveData();
  const next = typeof updater === 'function' ? updater(clone(current)) : mergeSaveData(current, updater);
  return writeSaveData(next);
}

module.exports = {
  defaultSaveData,
  ensureSaveData,
  readSaveData,
  writeSaveData,
  updateSaveData
};
