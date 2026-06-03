function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function pick(list) {
  if (!list.length) {
    return null;
  }
  return list[randomInt(0, list.length - 1)];
}

module.exports = {
  randomBetween,
  randomInt,
  pick
};
