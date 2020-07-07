const Village = require('../models/Village');
const axios = require('axios');

const updatedAt = async () => {
  const randomVillage = await Village.find().limit(1);
  return randomVillage.updatedAt;
}

const getVillage = async (x, y) => {
  const village = await Village.findOne({ xCoord: x, yCoord: y });
  return village;
}

const update = async () => {
  try {
    if (!process.env.TRAVIAN_URL || !process.env.TRAVIAN_URL.includes('travian')) {
      return null;
    }
    const mapRes = await axios.get(`https://${process.env.TRAVIAN_URL}/map.sql`);
    const mapData = mapRes.data.split('\n');
    console.log('map.sql fetched, length ' + mapData.length);

    const villages = [];
    const now = new Date();
    for (const village of mapData) {
      // Example line:
      // INSERT INTO `x_world` VALUES (1471,67,197,1,22611,'08',246,'Raven',0,'',127);
      // Strings may contain commas!
      const firstNumbers = village
        .substr(0, village.indexOf('\'') - 1)
        .substr(30)
        .split(',');
      const rest = village
        .substr(village.indexOf('\''))
        .split('\'');

      if (firstNumbers.length === 5 && rest.length === 7) {
        villages.push(new Village({
          coordId: parseInt(firstNumbers[0], 10),
          xCoord: parseInt(firstNumbers[1], 10),
          yCoord: parseInt(firstNumbers[2], 10),
          tribe: parseInt(firstNumbers[3], 10),
          villageId: parseInt(firstNumbers[4], 10),
          villageName: rest[1],
          playerId: parseInt(rest[2].substr(1, rest[1].length - 1), 10),
          playerName: rest[3],
          allyId: parseInt(rest[4].substr(1, rest[3].length - 1), 10),
          allyName: rest[5],
          population: parseInt(rest[6].substr(1, rest[5] - 2), 10),
          updatedAt: now
        }));
      } else {
        console.log(village);
      }
    }

    if (villages.length === mapData.length - 1) {
      // All lines OK, last one is empty
      // Replace old data
      const dropped = await Village.collection.drop();
      if (dropped) {
        const insertRes = await Village.collection
          .insertMany(villages, { ordered: false });
        console.log('Saved ' + insertRes.insertedCount + ' villages');
      } else {
        console.log('Could not delete old data.');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  updatedAt,
  getVillage,
  update
}
