const { Client } = require('pg');

const client = new Client({
    user: 'jametevia',
    host: 'localhost',
    database: 'amazon_products',
    port: 5432,
});

client.connect();

console.log('connected');

let query = `
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id serial,
  list_price INTEGER NULL DEFAULT NULL,
  price INTEGER NULL DEFAULT NULL,
  prime VARCHAR NULL DEFAULT NULL,
  sold_by VARCHAR NULL DEFAULT NULL,
  ships_from VARCHAR NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  package_name VARCHAR NULL DEFAULT NULL,
  product_name VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table products is successfully created');

});


query = `
DROP TABLE IF EXISTS forms;

CREATE TABLE forms (
  id Serial,
  price INTEGER NULL DEFAULT NULL,
  form VARCHAR NULL DEFAULT NULL,
  id_products INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table forms is successfully created');

});

query = `
DROP TABLE IF EXISTS other_sellers cascade;

CREATE TABLE other_sellers (
  id serial,
  seller_id VARCHAR NULL DEFAULT NULL,
  discs INTEGER NULL DEFAULT NULL,
  price INTEGER NULL DEFAULT NULL,
  newfrom VARCHAR NULL DEFAULT NULL,
  usedfrom VARCHAR NULL DEFAULT NULL,
  edition VARCHAR NULL DEFAULT NULL,
  form VARCHAR NULL DEFAULT NULL,
  release_date VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table other_sellers successfully created');

});

query = `DROP TABLE IF EXISTS products_and_other_sellers cascade;

CREATE TABLE products_and_other_sellers (
  id serial,
  id_products INTEGER NULL DEFAULT NULL,
  id_other_sellers INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)

);`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table products_other_sellers is successfully created');

});

