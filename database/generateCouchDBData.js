const faker = require('faker');
const uuid = require('uuid');
const db = require('./index.js');
const fastcsv = require('fast-csv');
const fs = require('fs');
const couch = require('./couchDBConnection.js').couch;
var json2csv = require('json2csv').parse;
const Promise = require("bluebird");
const axios = require('axios');



// const sampleData = require('./overviews.json');
let productInfo = [];
let form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
let edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];



const sellerGenerator = () => {
  let sellers = [];
  const num = ~~(Math.random() * 8);
  for (let i = 0; i < num; i++) {
    let random = Math.random();
    let record = {};
    record['id'] = uuid.v1();
    record['discs'] = ~~(random * 50);
    record['price'] = ~~(random * 40) + 5;
    record['newfrom'] = ~~(random * 35) + 5;
    record['usedfrom'] = ~~(random * 30) + 3;
    record['edition'] = edition[~~(random * 6)];
    record['form'] = form[~~(random * 4)];
    record['release_date'] = faker.date.past();
    sellers.push(record);
  }
  return sellers;
};

form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];



const formGenerator = () => {
  let forms = [];
  for (let i = 0; i < 4; i++) {
    let obj = {};
    obj.id = uuid.v1();
    obj.price = ~~(Math.random() * 40) + 5;
    obj.form = form[i];
    forms.push(obj);
  }
  return forms;
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

const dataGenerator = (resolve, k) => {
  for (let i = k; i < k + 5000; i++) {
    // console.log(i);
    let random = Math.random();
    let secondRandom = Math.random() - .2;
    let record = {};
    record['_id'] = uuid.v1();
    record['product_id'] = (i + 1);
    record['product_name'] = productNames[~~(random * productNameLength)];
    record['package_name'] = productMaterials[~~(random * productMaterialsLength)];
    record['list_price'] = ~~(random * 40) + 7;
    record['price'] = ~~(random * 38) + 6;
    record.sellers = sellerGenerator();
    record.forms = formGenerator();
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

  }
  var t1 = performance.now()
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  resolve(k);
}



function generateData(i) {
  return new Promise(function(resolve, reject) {
      dataGenerator(resolve, i)
  })
  .then((i) => {
    let json = {"docs": productInfo};
    productInfo = [];
    i += 5000
    axios.post('http://admin:student123@127.0.0.1:5984/amazon-products/_bulk_docs', json, {'Content-Type': 'application/json'})
    .then(function (response) {
      if (i < 10000001) {
        console.log('i', i);
        generateData(i);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  })
  .catch((err) => {
    if (err) {
      console.log('Error', err);
    }
  })
};

generateData(9500000);



