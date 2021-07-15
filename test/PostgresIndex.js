const { Client } = require('pg');
const { success, failure } = require('./handler');
require("babel-core/register");
require("babel-polyfill");

const getAlerts = async (event, context) => {

  const client = new Client({
    user: process.env.mockUser,
    host: process.env.mockHost,
    database: process.env.mockDatabase,
    port: process.env.mockPort
  });

  await client.connect();

  let query = `
DROP TABLE IF EXISTS products cascade;

CREATE TABLE products (
  id VARCHAR NULL DEFAULT NULL UNIQUE,
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
);`;

try {
  const result = await client.query(query);
  // const result2 = await client.query('describe products;');
  console.log(result);
  client.end();
  return success({ message: `${result.rowCount} item(s) returned`, data: result.rows, status: true });
} catch (e) {
  console.error(e.stack);
  client.end();
  return failure({ message: e, status: false });
}
};

module.exports.getAlerts = getAlerts;
