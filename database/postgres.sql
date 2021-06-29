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
DROP TABLE IF EXISTS products cascade;

CREATE TABLE products (
  id VARCHAR NULL DEFAULT NULL,
  list_price INTEGER NULL DEFAULT NULL,
  price INTEGER NULL DEFAULT NULL,
  prime VARCHAR NULL DEFAULT NULL,
  sold_by VARCHAR NULL DEFAULT NULL,
  ships_from VARCHAR NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  package_name VARCHAR NULL DEFAULT NULL,
  product_name VARCHAR NULL DEFAULT NULL,
  in_stock VARCHAR NULL DEFAULT NULL,
  inventory INTEGER NULL DEFAULT NULL,
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
DROP TABLE IF EXISTS forms cascade;

CREATE TABLE forms (
  id VARCHAR NULL DEFAULT NULL,
  price INTEGER NULL DEFAULT NULL,
  form VARCHAR NULL DEFAULT NULL,
  id_products_foreign VARCHAR NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
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
  id VARCHAR NULL DEFAULT NULL,
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
  id VARCHAR NULL DEFAULT NULL,
  id_products_foreign VARCHAR NULL DEFAULT NULL,
  id_other_sellers_foreign VARCHAR NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)

);`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table products_other_sellers is successfully created');

});

query = `
ALTER TABLE forms ADD FOREIGN KEY (id_products_foreign) REFERENCES products (id);
ALTER TABLE products_and_other_sellers ADD FOREIGN KEY (id_products_foreign) REFERENCES products (id);
ALTER TABLE products_and_other_sellers ADD FOREIGN KEY (id_other_sellers_foreign) REFERENCES other_sellers (id);
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Foreign Keys successfully created');
})

