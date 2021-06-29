const { Pool, Client } = require("pg");
const jsonSellers = require('./postgresSeed').jsonSellers;

const pool = new Pool({
  user: "jametevia",
  host: "localhost",
  database: "amazon_products",
  port: "5432"
});


// function arrayToCSV(objArray) {
//   const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
//   let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

//   return array.reduce((str, next) => {
//       str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
//       return str;
//      }, str);
// }

// let jsonSellersCSV = arrayToCSV(jsonSellers);

// const fastcsv = require('fast-csv');
// const fs = require('fs');
// const ws = fs.createWriteStream("out.csv");
// fastcsv
//   .write(jsonSellers, { headers: true })
//   .pipe(ws);

let query = `
COPY other_sellers(seller_id, discs, price, newfrom, usedfrom, edition, form, release_date)
FROM '/Users/jametevia/rpt/ProductOverview/database/out.csv'
DELIMITER ','
CSV HEADER;`;


pool.query(
  query,
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);

