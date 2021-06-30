const { Pool, Client } = require("pg");


const pool = new Pool({
  user: "jametevia",
  host: "localhost",
  database: "amazon_products",
  port: "5432"
});


//do this first because of foreign key constraints


let sellerQuery = `
COPY other_sellers(id, discs, price, newfrom, usedfrom, edition, form, release_date)
FROM '/Users/jametevia/rpt/ProductOverview/sellers.csv'
DELIMITER ','
CSV HEADER;`;


pool.query(
  sellerQuery,
  (err, res) => {
    console.log(err, res);
    let productQuery = `
COPY products(id, product_id, product_name, package_name, list_price, price, prime, sold_by, ships_from, in_stock, inventory)
FROM '/Users/jametevia/rpt/ProductOverview/products.csv'
DELIMITER ','
CSV HEADER;`;


    pool.query(
      productQuery,
      (err, res) => {
        console.log(err, res);
        let formsQuery = `
COPY forms(id, price, form, id_products_foreign, product_id)
FROM '/Users/jametevia/rpt/ProductOverview/forms.csv'
DELIMITER ','
CSV HEADER;`;


        pool.query(
          formsQuery,
          (err, res) => {
            console.log(err, res);
            let products_other_sellers_table_data_query = `
COPY products_and_other_sellers(id, id_products_foreign, id_other_sellers_foreign, product_id)
FROM '/Users/jametevia/rpt/ProductOverview/products_other_sellers_table_data.csv'
DELIMITER ','
CSV HEADER;`;


            pool.query(
              products_other_sellers_table_data_query,
              (err, res) => {
                console.log(err, res);
                pool.end();
              }
            );

          }
        );
      }
    );
  }
);


//do this second because of foreign key constraints

// let productQuery = `
// COPY products(id, product_id, product_name, package_name, list_price, price, prime, sold_by, ships_from, in_stock, inventory)
// FROM '/Users/jametevia/rpt/ProductOverview/products.csv'
// DELIMITER ','
// CSV HEADER;`;


// pool.query(
//   productQuery,
//   (err, res) => {
//     console.log(err, res);
//   }
// );


//do this third because of foreign key constraints


// let formsQuery = `
// COPY forms(id, price, form, id_products_foreign, product_id)
// FROM '/Users/jametevia/rpt/ProductOverview/forms.csv'
// DELIMITER ','
// CSV HEADER;`;


// pool.query(
//   formsQuery,
//   (err, res) => {
//     console.log(err, res);
//   }
// );


//do this fourt because of foreign key constraints

// let products_other_sellers_table_data_query = `
// COPY products_and_other_sellers(id, id_products_foreign, id_other_sellers_foreign, product_id)
// FROM '/Users/jametevia/rpt/ProductOverview/products_other_sellers_table_data.csv'
// DELIMITER ','
// CSV HEADER;`;


// pool.query(
//   products_other_sellers_table_data_query,
//   (err, res) => {
//     console.log(err, res);
//     pool.end();
//   }
// );

