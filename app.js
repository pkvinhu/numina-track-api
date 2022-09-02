const express = require("express");
const app = express();
const PORT = 3000;
const { csvToJsonList } = require("./utils/parser");
const { sortByHourByType, getPointsByTrackId } = require("./utils/filter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handleError = (err, req, res, next) => {
  res.status(500).send({ error: err.message });
};

app.get(
  "/csvData",
  (req, res) => {
    const json = csvToJsonList("data");
    res.send(json);
  },
  handleError
);

app.get(
  "/volumes-by-hour/:type",
  (req, res, next) => {
    // class of track
    const { type } = req.params;
    try {
      // filter by hour for unique trackids matching the specific type
      const volumesByHour = sortByHourByType(type);
      res.send(volumesByHour);
    } catch (err) {
      next(err);
    }
  },
  handleError
);

app.get(
  "/track-points/:trackid",
  (req, res, next) => {
    const { trackid } = req.params;
    try {
      const trackPointsPerId = getPointsByTrackId(trackid);
      res.send(trackPointsPerId);
    } catch (err) {
      next(err);
    }
  },
  handleError
);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
