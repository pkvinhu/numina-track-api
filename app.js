const express = require("express");
const app = express();
const PORT = 3000;
const { csvToJsonList } = require("./utils/parser");
const { sortByHourByType, getPointsByTrackId } = require("./utils/filter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

app.get("/csvData", (req, res) => {
  const json = csvToJsonList("data");
  res.send(json);
});

app.get("/volumes-by-hour/:type", (req, res) => {
  // class of track
  const { type } = req.params;
  try {
    // filter by hour for unique trackids matching the specific type
    const volumesByHour = sortByHourByType(type);
    res.send(volumesByHour);
  } catch (err) {
    next(err);
  }
});

app.get("/track-points/:trackid", (req, res) => {
  const { trackid } = req.params;
  try {
    const trackPointsPerId = getPointsByTrackId(trackid);
    res.send(trackPointsPerId);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
