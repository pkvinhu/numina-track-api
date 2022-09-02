const { csvToJsonList } = require("./parser");

const sortByHourByType = (type) => {
  // get json
  const jsonList = csvToJsonList("data");

  // create a map with a list of unique trackIds matching type per hour
  const byHourMap = {};

  for (var i = 0; i < 25; i++) {
    // use set so only unique values are stored – duplicates removed
    byHourMap[i] = new Set();
  }

  // iterate through json list to filter for type by hour
  jsonList.forEach((json) => {
    if (json.class === type) {
      const hour = Number(json.time.slice(0, 2));
      byHourMap[hour].add(json.trackid);
    }
  });

  // convert map hour sets to arrays
  return Object.keys(byHourMap).reduce(
    (map, hour) => ({
      ...map,
      [hour]: {
        count: byHourMap[hour].size,
        trackids: Array.from(byHourMap[hour]),
      },
    }),
    {}
  );
};

const getPointsByTrackId = (trackid) => {
  // get json
  const jsonList = csvToJsonList("data");

  // .filter checks against condition and returns whole value
  // but i just want to return track points so i'll use a tradition for loop
  const filteredTrackPoints = [];
  for (let track of jsonList) {
    if (track.trackid == trackid) {
      filteredTrackPoints.push({
        box: track.box,
        bottom_center: track.bottom_center,
        geo_bottom_center: track.geo_bottom_center,
      });
    }
  }

  return filteredTrackPoints;
};

module.exports = { sortByHourByType, getPointsByTrackId };
