/**
 * @param {int} x 
 * @param {int} y 
 * @param {uint} mapWidth 401 for -200|-200 -> 200|200 maps and 801 for -400|-400 -> 400|400 maps
 */
const coordinatesToMapId = (x, y, mapWidth) => {
  const quarterWidth = (mapWidth - 1) / 2;

  const xPart = x + quarterWidth + 1;
  const yPart = (quarterWidth - y) * mapWidth;

  const mapId = xPart + yPart;

  return mapId;
};

/**
 * @param {int} x 
 * @param {int} y 
 * @param {uint} mapWidth 401 for -200|-200 -> 200|200 maps and 801 for -400|-400 -> 400|400 maps
 */
const mapIdtoCoordinates = (id, mapWidth) => {
  const quarterWidth = (mapWidth - 1) / 2;

  const x = -quarterWidth + ((id - 1) % mapWidth);
  const y = quarterWidth - ((id - 1) / mapWidth - ((id - 1) % mapWidth) / mapWidth);

  return {x: x, y: y};
};

module.exports = {
  coordinatesToMapId,
  mapIdtoCoordinates,
};
