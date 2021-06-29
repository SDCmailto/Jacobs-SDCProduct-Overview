const jsonSellers = require('./postgresSeed').jsonSellers;


function arrayToCSV(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

  return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
     }, str);
}

let jsonSellersCSV = arrayToCSV(jsonSellers);

const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.csv");
fastcsv
  .write(jsonSellers, { headers: true })
  .pipe(ws);