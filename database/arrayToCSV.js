// let other_sellers = require('./postgresSeed').other_sellers;
// let products = require('./postgresSeed').products;
// let forms = require('./postgresSeed').forms;
// let products_other_sellers_table_data = require('./postgresSeed').products_other_sellers_table_data;

//
// function arrayToCSV(objArray) {
//   const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
//   let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

//   return array.reduce((str, next) => {
//     str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
//     return str;
//   }, str);
// }


// const fastcsv = require('fast-csv');
// const fs = require('fs');
// let ws = fs.createWriteStream("sellers.csv");
// fastcsv
//   .write(other_sellers, { headers: true })
//   .pipe(ws);


// ws = fs.createWriteStream("products.csv");
// fastcsv
//   .write(products, { headers: true })
//   .pipe(ws);


// ws = fs.createWriteStream("forms.csv");
// fastcsv
//   .write(forms, { headers: true })
//   .pipe(ws);



// ws = fs.createWriteStream("products_other_sellers_table_data.csv");
// fastcsv
//   .write(products_other_sellers_table_data, { headers: true })
//   .pipe(ws);