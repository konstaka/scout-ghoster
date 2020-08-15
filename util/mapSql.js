const axios = require('axios');
const Village = require('../models/Village');

const updatedAt = async () => {
  const randomVillage = await Village.find().limit(1);
  if (!randomVillage || !randomVillage[0]) {
    return null;
  }
  return randomVillage[0].updatedAt;
};

const update = async () => {
  try {
    if (!process.env.TRAVIAN_URL || !process.env.TRAVIAN_URL.includes('travian')) {
      return null;
    }
    const mapRes = await axios.get(`https://${process.env.TRAVIAN_URL}/map.sql`);
    const mapData = mapRes.data.split('\n');
    console.log(`map.sql fetched, length ${mapData.length}`);

    const villages = [];
    const now = new Date();
    for (let i = 0; i < mapData.length; i++) {
      /*
       * Example line:
       * INSERT INTO `x_world` VALUES (1471,67,197,1,22611,'08',246,'Raven',0,'',127,NULL);
       * Strings may contain commas!
       */
      const firstNumbers = mapData[i]
        .substr(0, mapData[i].indexOf('\'') - 1)
        .substr(30)
        .split(',');
      const rest = mapData[i]
        .substr(mapData[i].indexOf('\''))
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
          population: parseInt(rest[6].split(',')[0], 10),
          updatedAt: now,
        }));
      } else {
        console.log(mapData[i]);
      }
    }

    if (villages.length === mapData.length - 1) {
      /*
       * All lines OK, last one is empty
       * Replace old data
       */
      try {
        await Village.collection.drop();
      } catch (err) {
        console.log(err);
      }
      const insertRes = await Village.collection
        .insertMany(villages, { ordered: false });
      console.log(`Saved ${insertRes.insertedCount} villages`);
      return insertRes.insertedCount;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

module.exports = {
  updatedAt,
  update,
};
