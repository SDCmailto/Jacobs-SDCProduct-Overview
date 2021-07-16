const uuid = require('uuid');
const { Client } = require('pg');
const config = require('../config.js');
const client = new Client(config);
client.connect();
const bug = String.fromCodePoint(0x1F41E);
require("babel-core/register");
require("babel-polyfill");


const createRecord = (body, resolve, reject) => {

  let productArray = [];
  let productID = uuid.v1();
  productArray.push(productID, body.list_price, body.price, body.prime, body.sold_by, body.ships_from, body.product_id, body.package_name, body.product_name, body.in_stock, body.inventory);
  if (!body.sellers) {
    reject('error')
    return;
  }
  if (!body.forms) {
    reject('error')
    return;
  }
  client.query(`insert into products (id, list_price, price, prime, sold_by, ships_from, product_id, package_name, product_name, in_stock, inventory) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, productArray, (err, result) => {
    if (err) { reject(err) }

    if (body.sellers.length) {
      for (let i = 0; i < body.sellers.length; i++) {
        let sellerArray = [];
        let sellerID = uuid.v1();
        sellerArray.push(body.sellers[i].discs, body.sellers[i].price, body.sellers[i].newfrom, body.sellers[i].usedfrom, body.sellers[i].edition, body.sellers[i].from, body.sellers[i].release_date, sellerID);

        client.query(`insert into other_sellers (discs, price, newfrom, usedfrom, edition, form, release_date, id) values ($1, $2, $3, $4, $5, $6, $7, $8)`, sellerArray, (err, result) => {
          if (err) { reject(err); }
          let productsAndOtherSellersArray = [uuid.v1(), productID, sellerID, body.product_id];

          client.query(`insert into products_and_other_sellers (id, id_products_foreign, id_other_sellers_foreign, product_id) values ($1, $2, $3, $4);`, productsAndOtherSellersArray, (err, results) => {
            if (err) { reject(err); }
          })
        })
      }
    }
    for (let i = 0; i < body.forms.length; i++) {
      let formArray = [];
      formArray.push(uuid.v1(), body.forms[i].price, body.forms[i].form, productID, body.forms[i].product_id);
      client.query(`insert into forms (id, price, form, id_products_foreign, product_id) values ($1, $2, $3, $4, $5)`, formArray, (err, results) => {
        if (err) { throw err; }
        resolve(201);
      })
    }
  })
};



const getRecord = async (id, resolve, reject) => {
  await client.query(`select * from products where product_id = $1`, [id], async (err, results) => {
    if (err) { throw err; }
    let products = results.rows[0];
    let sellers = await client.query(`select * from other_sellers where id in (select id_other_sellers_foreign from products_and_other_sellers as ps where ps.product_id = $1);`, [id], async (err, results) => {
      if (err) { throw err; }
      // console.log('sellers', results.rows);

      if (!products) { reject('error'); return}
      products['sellers'] = results.rows;
      let forms = await client.query(`select * from forms where product_id = $1;`, [id], (err, results) => {
        if (err) { throw err; }
        // console.log('forms', results.rows);
        products['forms'] = results.rows;
        resolve(products);
      });
    });
  });
};

const deleteRecord = (id, resolve, reject) => {
  let deleteCount = 0;
  client.query(`delete from products_and_other_sellers where product_id = $1`, [id], (err, results) => {
    deleteCount += results.rowCount;
    client.query(`delete from forms where product_id = $1`, [id], (err, results) => {
      deleteCount += results.rowCount;
      client.query(`delete from products where product_id = $1`, [id], (err, results) => {
        if (results.rowCount === 0) {
          reject(err);
        }
        deleteCount += results.rowCount;
        resolve(deleteCount);
      })
    })
  })
}

const updateRecordProducts = (id, filter, resolve, reject) => {

  let columns = '';
  let changes = '';
  for (let key in filter) {
    columns += key + ','
    if (typeof filter[key] === 'string') {
      changes += "\'" + filter[key] + "\'" + ",";
    } else {
      changes += filter[key] + ',';
    }
  }
  columns = columns.slice(0, columns.length - 1);
  changes = changes.slice(0, changes.length - 1);

  client.query(`update products SET (${columns}) = (${changes}) where product_id = $1;`, [id], (err, results) => {
    if (err) {reject(err); return;}
    resolve(results.rowCount);
  })
}

const updateRecordSellers = (id, filter, resolve, reject) => {
  let columns = '';
  let changes = '';
  let columnCount = 0;
  for (let key in filter) {
    columnCount ++;
    columns += key + ','
    if (typeof filter[key] === 'string') {
      changes += "\'" + filter[key] + "\'" + ",";
    } else {
      changes += filter[key] + ',';
    }
  }

  columns = columns.slice(0, columns.length - 1);
  changes = changes.slice(0, changes.length - 1);

  if (columnCount > 1) {
    client.query(`update other_sellers SET (${columns}) = (${changes}) where id = $1;`, [id], (err, results) => {
      if (err) {throw err;}
      resolve(results.rowCount);
    })
  } else {
    client.query(`update other_sellers SET ${columns} = ${changes} where id = $1;`, [id], (err, results) => {
      if (err) {throw err;}
      resolve(results.rowCount);
    })
  }
}

const updateRecordForms = (id, filter, resolve, reject) => {
  let columns = '';
  let changes = '';
  let columnCount = 0;
  for (let key in filter) {
    columns += key + ','
    if (typeof filter[key] === 'string') {
      changes += "\'" + filter[key] + "\'" + ",";
    } else {
      changes += filter[key] + ',';
    }
  }
  columns = columns.slice(0, columns.length - 1);
  changes = changes.slice(0, changes.length - 1);

  if (columnCount > 1) {
    client.query(`update forms SET (${columns}) = (${changes}) where id = $1`, [id], (err, results) => {
      if (err) {throw err;}
      resolve(results.rowCount);
    })
  } else {
    client.query(`update forms SET ${columns} = ${changes} where id = $1`, [id], (err, results) => {
      if (err) {throw err;}
      resolve(results.rowCount);
    })
  }
}

let getOtherSellers = (id, resolve, reject) => {
  client.query(`select * from other_sellers where id in (select id_other_sellers_foreign from products_and_other_sellers as ps where ps.product_id = $1);`, [id], async (err, results) => {
    if (err) { throw err; }
    resolve(results.rows)
  });
};

let getPrice = (id, resolve, reject) => {
  client.query(`select price from products where product_id = $1;`, [id], async (err, record) => {
    if (err) { throw err; }
    resolve(record.rows[0].price.toString())
  });
};


let getInventory = (id, resolve, reject) => {
  client.query(`select inventory from products where product_id = $1;`, [id], async (err, record) => {
    if (err) { throw err; }
    resolve(record.rows[0].inventory.toString())
  });
};

module.exports.getInventory = getInventory
module.exports.getPrice = getPrice;
module.exports.getOtherSellers = getOtherSellers;
module.exports.updateRecordProducts = updateRecordProducts;
module.exports.updateRecordSellers = updateRecordSellers;
module.exports.updateRecordForms = updateRecordForms;
module.exports.deleteRecord = deleteRecord;
module.exports.getRecord = getRecord;
module.exports.createRecord = createRecord;



