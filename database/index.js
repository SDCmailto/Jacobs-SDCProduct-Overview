// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://localhost/overview_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// // mongoose.connect('mongodb://localhost:27017/overview_db', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useFindAndModify: false,
// //   useCreateIndex: true
// // });

// const db = mongoose.connection;

// db.on('error', () => {
//   console.log('An error has occured in connecting with MongoDB.');
// });

// db.once('open', () => {
//   console.log('Connected with MongoDB successfully.');
// });

// const sellerSchema = {
//   seller_id: {
//     type: String,
//     unique: true
//   },
//   discs: Number,
//   price: Number,
//   newfrom: Number,
//   usedfrom: Number,
//   edition: String,
//   form: String,
//   release_date: Date
// };

// const priceSchema = {
//   list_price: Number,
//   price: Number
// };

// const inventorySchema = {
//   in_stock: Boolean,
//   inventory: Number
// };

// const shippingSchema = {
//   prime: Boolean,
//   ships_from: String,
//   sold_by: String
// }

// const formSchema = {
//   form: String,
//   price: Number
// }

// const OverviewSchema = {
//   product_id: {
//     type: String,
//     unique: true
//   },
//   product_name: String,
//   package_name: String,
//   price: priceSchema,
//   other_sellers: [sellerSchema],
//   shipping: shippingSchema,
//   inventory: inventorySchema,
//   form: [formSchema]
// }

const { Client } = require('pg');
const config = require ('../config.js');
const client = new Client(config);
client.connect();

const Overview = undefined;



const getRecord = async (id) => {
  let products = await client.query(`select * from (select * from products where product_id = ${id}) as p left join (select * from forms where product_id = ${id}) as f on p.product_id = f.product_id;`, (err, results) => {
    if (err) {console.log(err + ' products');}
    console.log('products', results.rows);
  });

  let sellers = await client.query(`select * from other_sellers where id in (select id_other_sellers_foreign from products_and_other_sellers as ps where ps.product_id = ${id});`, (err, result) => {
    if (err) {console.log(err + 'sellers'); }
    console.log('sellers', result.rows);
  });


};


module.exports.getRecord = getRecord;
module.exports.Overview = Overview;



