const faker = require('faker');
const uuid = require('uuid');
const db = require('./index.js');
// const sampleData = require('./overviews.json');

const sellerGenerator = (idx) => {
  const num = Math.floor(Math.random() * 20);
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  const edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];
  let sellers = [];
  let products_other_sellers_table_data = [];
  for (let i = 0; i < num; i++) {
    let record = {};
    record['seller_id'] = uuid.v1();
    record['discs'] = Math.floor(Math.random() * 50);
    record['price']= Math.floor(Math.random() * 40) + 5;
    record['newfrom'] = Math.floor(Math.random() * 35) + 5;
    record['usedfrom'] = Math.floor(Math.random() * 30) + 3;
    record['edition'] = edition[Math.floor(Math.random() * edition.length)];
    record['form'] = form[Math.floor(Math.random() * form.length)];
    record['release_date'] = faker.date.past();
    sellers.push(record);

    var products_other_sellers = {'id_products': idx, 'id_other_sellers': record.seller_id};
    products_other_sellers_table_data.push(products_other_sellers);
  }
  // console.log(sellers);
  // console.log(products_other_sellers_table_data);
  return sellers;
};

const priceGenerator = () => {
  let record = {};
  record['list_price'] = Math.floor(Math.random() * 40) + 7;
  record['price'] = record['list_price'] - Math.floor(Math.random() * 10 + 2);
  if (record['price'] <= 0) {
    record['price'] = record['list_price'];
  }
  return record;
};

const shippingGenerator = () => {
  const prime = [true, false];
  let record = {};
  const company = ['Amazon.com', faker.company.companyName()];
  record['prime'] = prime[Math.floor(Math.random() * prime.length)];
  record['sold_by'] = company[Math.floor(Math.random() * company.length)];
  if (record['sold_by'] === 'Amazon.com') {
    record['ships_from'] = 'Amazon.com';
  } else {
    record['ships_from'] = company[Math.floor(Math.random() * company.length)];
  }
  return record;
}

const inventoryGenerator = () => {
  const status = [true, false];
  let record = {};
  record['in_stock'] = status[Math.floor(Math.random() * status.length)];
  if (record['in_stock']) {
    record['inventory'] = Math.floor(Math.random() * 10000 + 1234);
  } else {
    record['inventory'] = 0;
  }
  return record;
}

const formGenerator = (idx) => {
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];
  let result = [];
  if (!idx) {
    return;
  }
  for (let i = 0; i < form.length; i++) {
    let obj = {};
    obj.price = Math.floor(Math.random() * 40) + 5;;
    obj.form = form[i];
    obj.id_products = idx;
    result.push(obj);
  }
  // console.log(result);
  return result;
}

const dataGenerator = () => {
  let data = [];
  [...Array(10).keys()].forEach(idx => {
    let record = {};
    record['product_id'] = (idx + 1).toString();
    record['product_name'] = faker.commerce.productName();
    record['package_name'] = faker.commerce.productMaterial();
    record['list_price'] = priceGenerator().list_price;
    record['price'] = priceGenerator().price;
    record['prime'] = shippingGenerator().prime;
    record['sold_by'] = shippingGenerator().sold_by;
    record['ships_from'] = shippingGenerator().ships_from;
    record['in_stock'] = inventoryGenerator().in_stock;
    record['inventory'] = inventoryGenerator().inventory;
    data.push(record);
    // console.log('record', record);
    sellers = sellerGenerator(idx + 1);
    forms = formGenerator(idx + 1);
  })
  // console.log('data', data);
  return data;
}

dataGenerator();
formGenerator();

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

