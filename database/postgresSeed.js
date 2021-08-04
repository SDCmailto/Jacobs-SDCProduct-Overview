const faker = require('faker');
const uuid = require('uuid');
const db = require('./index.js');
const fastcsv = require('fast-csv');
const fs = require('fs');
// const { Parser } = require('json2csv');
var json2csv = require('json2csv').parse;
const Promise = require("bluebird");



// const sampleData = require('./overviews.json');
let sellers = [];
let forms = [];
let productInfo = [];
let products_other_sellers_table_data = [];
let form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
let edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];



const sellerGenerator = (numericProductId, uID) => {
  const num = ~~(Math.random() * 8);
  for (let i = 0; i < num; i++) {
    let random = Math.random();
    let record = {};
    record['id'] = uuid.v1();
    record['product_id'] = numericProductId;
    record['discs'] = ~~(random * 50);
    record['price'] = ~~(random * 40) + 5;
    record['newfrom'] = ~~(random * 35) + 5;
    record['usedfrom'] = ~~(random * 30) + 3;
    record['edition'] = edition[~~(random * 6)];
    record['form'] = form[~~(random * 4)];
    record['release_date'] = faker.date.past();
    sellers.push(record);

  }

};

form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];



const formGenerator = (numericProductId, uID) => {
  if (!numericProductId) {
    return;
  }
  for (let i = 0; i < 4; i++) {
    let obj = {};
    obj.id = uuid.v1();
    obj.price = ~~(Math.random() * 40) + 5;
    obj.form = form[i];
    obj.product_id = numericProductId;
    forms.push(obj);
  }

}

var t0 = performance.now()

const productNames = [];
const productMaterials = [];
const prime = [true, false];
const company = [];

for (let i = 0; i < 40; i++) {
  if (i % 2 === 0) {
    company.push('Amazon.com');
  } else {
    company.push(faker.company.companyName())
  }
}

for (let i = 0; i < 50; i++) {
  productNames.push(faker.commerce.productName());
}
for (let i = 0; i < 50; i++) {
  productMaterials.push(faker.commerce.productMaterial());
}

let productNameLength = productNames.length;
let productMaterialsLength = productMaterials.length
let primeLength = 2;
let companyLength = company.length;

const dataGenerator = (resolve, increment) => {
  for (let i = increment; i < increment + 50000; i++) {
    console.log(i);
    let random = Math.random();
    let secondRandom = Math.random() - .2;
    let record = {};
    record['id'] = uuid.v1();
    record['product_id'] = (i + 1);
    record['product_name'] = productNames[~~(random * productNameLength)];
    record['package_name'] = productMaterials[~~(random * productMaterialsLength)];
    record['list_price'] = ~~(random * 40) + 7;
    record['price'] = ~~(random * 38) + 6;
    record['prime'] = prime[~~(random * primeLength)];
    record['sold_by'] = company[~~(random * companyLength)];
    record['ships_from'] = company[~~(random * companyLength)];
    record['in_stock'] = prime[~~(secondRandom * primeLength)];
    if (record.in_stock === false) {
      record.inventory = 0;
    } else {
      record.inventory = ~~(random * 10000 + 1234)
    }
    productInfo.push(record);
    // console.log('record', record);
    sellerGenerator(i + 1, record.id);
    formGenerator(i + 1, record.id);
    //create products csv

  }
  var t1 = performance.now()
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  resolve('data');
}


function generateData(resolve1, increment) {
  return new Promise(function(resolve, reject) {
      dataGenerator(resolve, increment)
  })
  .then((data) => {
    let newLine = '\n'

      var productFields = ['id', 'product_id', 'product_name', 'package_name', 'list_price', 'price', 'prime', 'sold_by', 'ships_from', 'in_stock', 'inventory'];
      var sellerFields = ['id', 'product_id', 'discs', 'price', 'newfrom', 'usedfrom', 'edition', 'form', 'release_date'];
      var formFields = ['id', 'price', 'form', 'product_id'];


      productFields = productFields + newLine;
      sellerFieldsData = sellerFields + newLine;
      formFieldsData = formFields + newLine;

      fs.writeFile('products1.csv', productFields, function (err) {
        if (err) throw err;
        console.log('file saved');
      });

      fs.writeFile('sellers1.csv', sellerFieldsData, function (err) {
        if (err) throw err;
      });

      fs.writeFile('forms1.csv', formFieldsData, function (err) {
        if (err) throw err;
      });

      return 'data';
  })
  .then((data) => {
    let newLine = '\n';
    fields = ['id', 'product_id', 'product_name', 'package_name', 'list_price', 'price', 'prime', 'sold_by', 'ships_from', 'in_stock', 'inventory'];

    var appendThis = productInfo;
    productInfo = [];
    var toCsv = {
      fields: fields,
      header: false,
    };

    var csv = json2csv(appendThis, toCsv) + newLine;
    fs.appendFile('products1.csv', csv, function (err) {
      if (err) throw err;
    });

    //appending sellers to csv

    fields = ['id', 'product_id', 'discs', 'price', 'newfrom', 'usedfrom', 'edition', 'form', 'release_date'];

    var appendThisSeller = sellers;
    sellers = [];
    var sellerToCsv = {
      fields: fields,
      header: false,
    };

    var sellerCsv = json2csv(appendThisSeller, sellerToCsv) + newLine;
    fs.appendFile('sellers1.csv', sellerCsv, function (err) {
      if (err) throw err;
    });

    //appending forms csv

    fields = ['id', 'price', 'form', 'product_id'];
    var appendThisForm = forms;
    forms = [];
    var formsToCSV = {
      fields: fields,
      header: false,
    };

    var formToCSV = json2csv(appendThisForm, formsToCSV) + newLine;
    fs.appendFile('forms1.csv', formToCSV, function (err) {
      if (err) throw err;
    });

    //join table sellers and products appending



    return 'data';
  })
  .then(() => {
    const { Pool, Client } = require("pg");
    const config = require('../config.js');


    const pool = new Pool(config);


    //do this first because of foreign key constraints


    let sellerQuery = `
    COPY other_sellers(id, product_id, discs, price, newfrom, usedfrom, edition, form, release_date)
    FROM '/Users/jametevia/rpt/ProductOverview/sellers1.csv'
    DELIMITER ','
    CSV HEADER;`;


    pool.query(
      sellerQuery,
      (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log('copied ' + res.rowCount + ' seller entries');
        }
        let productQuery = `
        COPY products(id, product_id, product_name, package_name, list_price, price, prime, sold_by, ships_from, in_stock, inventory)
        FROM '/Users/jametevia/rpt/ProductOverview/products1.csv'
        DELIMITER ','
        CSV HEADER;`;


        pool.query(
          productQuery,
          (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log('copied ' + res.rowCount + ' product entries');
        }
        let formsQuery = `
        COPY forms(id, price, form, product_id)
        FROM '/Users/jametevia/rpt/ProductOverview/forms1.csv'
        DELIMITER ','
        CSV HEADER;`;


        pool.query(
          formsQuery,
          (err, res) => {
            if (err) {
              console.log(err)
            } else {
              console.log('copied ' + res.rowCount + ' form entries');
            }
            pool.end()
            resolve1('End');
          }
          );
        }
        );
      }
      );

    })
    .catch((error) => {
      console.log(error);
    })
  }


  const promiseGenerateData = (increment) => {
    return new Promise(resolve1 => {
    generateData(resolve1, increment);
  })
}

  for (let i = 1, p = Promise.resolve(); i < 500000; i+= 50000) {
    p = p.then(() => promiseGenerateData(i))
}





      // fields = ['id', 'id_products_foreign', 'id_other_sellers_foreign', 'product_id'];



  // var appendThisJoin = products_other_sellers_table_data;
  // products_other_sellers_table_data = [];
// var productsOtherSellersToCSV = {
//   fields: fields,
//   header: false,
// };

// var joinToCSV = json2csv(appendThisJoin, productsOtherSellersToCSV) + newLine;
// fs.appendFile('products_other_sellers_table_data1.csv', joinToCSV, function (err) {
//   if (err) throw err;
// });


//*********** products and other sellers data ^^

// const json2csvParser = new Parser();
// const productcsv = json2csvParser.parse(productInfo);

// productInfo = [];
// fs.writeFile('products.csv', productcsv, (err) => {
  //   if (err) throw new Error('Couldn\'t write the data to a file');
  //   console.log('The data was appended to file!');
  // });
  // //**** */
  // let ws = fs.createWriteStream("sellers.csv", { flags: 'a', autoClose: 'false', rowDelimiter: '\n'});
  // fastcsv
  //   .write(sellers, { headers: true })
  //   .pipe(ws);
  // sellers = [];

  // ws = fs.createWriteStream("forms.csv", { flags: 'a', autoClose: 'false', rowDelimiter: '\n'});
  // fastcsv
  //   .write(forms, { headers: true })
  //   .pipe(ws);
  // forms = [];


  // ws = fs.createWriteStream("products_other_sellers_table_data.csv", { flags: 'a', autoClose: 'false', rowDelimiter: '\n'});
  // fastcsv
  //   .write(products_other_sellers_table_data, { headers: true })
  //   .pipe(ws);
  // products_other_sellers_table_data = [];

  // } else {
    // const json2csvParser = new Parser( { header: false });
    // const productcsv = json2csvParser.parse(productInfo);
    // productInfo = [];

    // fs.appendFile('products.csv', productcsv, (err) => {
  //   if (err) throw new Error('Couldn\'t write the data to a file');
  //   console.log('The data was appended to file!');
  // });

  // let ws = fs.createWriteStream("sellers.csv", { flags: 'a', autoClose: 'false',  rowDelimiter: '\n'});
  // fastcsv
  //   .write(sellers, { writeHeaders: false })
  //   .pipe(ws);
  // sellers = [];

  // ws = fs.createWriteStream("forms.csv", { flags: 'a', autoClose: 'false',  rowDelimiter: '\n'});
  // fastcsv
  //   .write(forms, { writeHeaders: false })
  //   .pipe(ws);
  // forms = [];


  // ws = fs.createWriteStream("products_other_sellers_table_data.csv", { flags: 'a', autoClose: 'false', rowDelimiter: '\n'});
  // fastcsv
  //   .write(products_other_sellers_table_data, { writeHeaders: false })
  //   .pipe(ws);
  // products_other_sellers_table_data = [];







