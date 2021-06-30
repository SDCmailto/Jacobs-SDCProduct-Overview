const faker = require('faker');
const uuid = require('uuid');
const db = require('./index.js');
// const sampleData = require('./overviews.json');
let sellers = [];
let forms = [];
let productInfo = [];
let products_other_sellers_table_data = [];

const sellerGenerator = (numericProductId, uID) => {
  const num = ~~(Math.random() * 7);
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  const edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];
  for (let i = 0; i < num; i++) {
    let random = Math.random();
    let record = {};
    record['id'] = uuid.v1();
    record['seller_id'] = uuid.v4();
    record['discs'] = ~~(random * 50);
    record['price']= ~~(random * 40) + 5;
    record['newfrom'] = ~~(random * 35) + 5;
    record['usedfrom'] = ~~(random * 30) + 3;
    record['edition'] = edition[~~(random * edition.length)];
    record['form'] = form[~~(random * form.length)];
    record['release_date'] = faker.date.past();
    sellers.push(record);

    let joinTableId = uuid.v4();
    var products_other_sellers = {'id': joinTableId, 'id_products_foreign': uID, 'id_other_sellers_foreign': record.id, 'product_id': numericProductId};

    products_other_sellers_table_data.push(products_other_sellers);

  }
  // console.log(sellers);
  // console.log(products_other_sellers_table_data);
  return sellers;
};

// const priceGenerator = () => {
//   let record = {};
//   let random = Math.random();
//   record['list_price'] = ~~(random * 40) + 7;
//   record['price'] = record['list_price'] - ~~(random * 10 + 2);
//   if (record['price'] <= 0) {
//     record['price'] = record['list_price'];
//   }
//   return record;
// };

// const shippingGenerator = () => {
//   const prime = [true, false];
//   let record = {};
//   let random = Math.random();
//   const company = ['Amazon.com', faker.company.companyName()];
//   record['prime'] = prime[~~(random * prime.length)];
//   record['sold_by'] = company[~~(random * company.length)];
//   if (record['sold_by'] === 'Amazon.com') {
//     record['ships_from'] = 'Amazon.com';
//   } else {
//     record['ships_from'] = company[~~(random * company.length)];
//   }
//   return record;
// }

// const inventoryGenerator = () => {
//   const status = [true, false];
//   let random = Math.random();
//   let record = {};
//   record['in_stock'] = status[~~(random * status.length)];
//   if (record['in_stock']) {
//     record['inventory'] = ~~(random * 10000 + 1234);
//   } else {
//     record['inventory'] = 0;
//   }
//   return record;
// }

const formGenerator = (numericProductId, uID) => {
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];
  if (!numericProductId) {
    return;
  }
  for (let i = 0; i < form.length; i++) {
    let obj = {};
    obj.id = uuid.v1();
    obj.price = ~~(Math.random() * 40) + 5;;
    obj.form = form[i];
    obj.id_products_foreign = uID;
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

const dataGenerator = () => {
  [...Array(10000).keys()].forEach(idx => {
    console.log(idx);
    let random = Math.random();
    let secondRandom = Math.random();
    let record = {};
    record['id'] = uuid.v1();
    record['product_id'] = (idx + 1).toString();
    record['product_name'] = productNames[~~(random * productNames.length)];
    record['package_name'] = productMaterials[~~(random * productMaterials.length)];
    record['list_price'] = ~~(random * 40) + 7;
    record['price'] = ~~(random * 38) + 6;
    record['prime'] = prime[~~(random * prime.length)];
    record['sold_by'] = company[~~(random * company.length)];
    record['ships_from'] = company[~~(random * company.length)];
    record['in_stock'] = prime[~~(secondRandom * prime.length)];
    if (record.in_stock === false) {
      record.inventory = 0;
    } else {
      record.inventory = ~~(random * 10000 + 1234)
    }
    productInfo.push(record);
    // console.log('record', record);
    sellerGenerator(idx + 1, record.id);
    formGenerator(idx + 1, record.id);
  })

  // jsonSellers = JSON.stringify(sellers);
  // jsonForms = JSON.stringify(forms);
  // jsonProductInfo = JSON.stringify(productInfo);
  // products_other_sellers_table_data = JSON.stringify(products_other_sellers_table_data);

  module.exports.other_sellers = sellers;
  module.exports.forms = forms;
  module.exports.products = productInfo;
  module.exports.products_other_sellers_table_data = products_other_sellers_table_data;
  console.log(productInfo);
  var t1 = performance.now()
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}

// let other_sellers;
// let forms;
// let produts;
// let json_products_other_sellers_table_data

dataGenerator();


const save = (sampleData) => {

  let recordInsert = sampleData.map(record => ({
    updateOne: {
      filter: {product_id: record.product_id},
      update: {$set: record},
      upsert: true
    }
  }));

  db.Overview.bulkWrite(recordInsert)
    .then(() => {
      console.log('Data has been successfully saved into MongoDB');
    })
    .catch((error) => {
      console.log(error);
    })
}

// let sampleData = dataGenerator();
// console.log(JSON.stringify(sampleData));
// save(sampleData);
// save(sampleData);
// console.log('db', db);

// db.Overview.insertMany(sampleData);

// for (let i = 0; i < 100000; i++) {
//   console.log(i);
// }