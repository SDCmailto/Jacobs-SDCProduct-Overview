const { Pool, Client } = require("pg");


const pool = new Pool({
  user: "jametevia",
  host: "localhost",
  database: "amazon_products",
  port: "5432"
});



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

