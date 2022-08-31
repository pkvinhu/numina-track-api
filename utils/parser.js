const papaparse = require("papaparse");
const path = require("path");
const fs = require("fs");

const csvToJsonList = (fileName) => {
  const csvData = fs.readFileSync(
    path.resolve(__dirname, `../csvData/${fileName}.csv`),
    "utf8"
  );
  const csvJson = papaparse.parse(csvData, { header: true });
  return csvJson.data;
};

module.exports = { csvToJsonList };
