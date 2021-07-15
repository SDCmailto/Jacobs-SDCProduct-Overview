
import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import PropTypes from 'prop-types';
const request = require('supertest');
const app = require('../server/index.js');
require("babel-polyfill");
Enzyme.configure({ adapter: new Adapter() });

// app.listen(5984);
app.close()
afterEach(done => {
  app.close();
  done()
})


describe('GET /overview', function() {
  it('responds with 200', function(done) {
    request(app)
      .get('/overview/19')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('error for false GET /overview', function() {
  it('responds with 404', function(done) {
    request(app)
      .get('/overview/-1')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('PUT /overview/products/500', function() {
  it('responds with 200 updating record ', function(done) {
    request(app)
      .put('/overview/products/500')
      .send({"price": 3, "product_name": "Hey there :) "})
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

// describe('PUT /overview', function() {
//   it('responds with 200 updating record ', function(done) {
//     request(app)
//       .put('/overview')
//       .send([{"product_id": "-2"}, {"product_name": "Hey there :) "}])
//       .set('Accept', 'application/json')
//       .expect(404, done);
//   });
// });

// describe('failed DELETE /overview', function() {
//   it('responds with 404 for failed delete ', function(done) {
//     request(app)
//       .delete('/overview')
//       .send({"product_id": "-2"})
//       .set('Accept', 'application/json')
//       .expect(404, done);
//   });
// });

// describe('POST /overview', function() {
//   it('responds with 404 for repeat post request', function(done) {
//       request(app)
//         .post('/overview')
//         .send({"product_id":"105","product_name":"Small Cotton Tuna","package_name":"Cotton","other_sellers":[{"seller_id":"de6c8c30-d5fd-11eb-aad4-8d3981060c25","discs":6,"price":6,"newfrom":35,"usedfrom":23,"edition":null,"form":"DVD","release_date":"2020-07-02T19:23:50.858Z"},{"seller_id":"de6cb340-d5fd-11eb-aad4-8d3981060c25","discs":9,"price":36,"newfrom":15,"usedfrom":31,"edition":"Collector's Edition","form":"4K","release_date":"2020-07-05T23:43:05.581Z"},{"seller_id":"de6cb341-d5fd-11eb-aad4-8d3981060c25","discs":5,"price":30,"newfrom":30,"usedfrom":31,"edition":"Collector's Edition","form":"DVD","release_date":"2020-09-16T15:31:05.096Z"},{"seller_id":"de6cb342-d5fd-11eb-aad4-8d3981060c25","discs":29,"price":21,"newfrom":5,"usedfrom":16,"edition":null,"form":"DVD","release_date":"2021-06-07T00:33:57.545Z"},{"seller_id":"de6cb343-d5fd-11eb-aad4-8d3981060c25","discs":16,"price":42,"newfrom":25,"usedfrom":11,"edition":"Special Edition","form":"DVD","release_date":"2020-09-20T02:07:06.756Z"},{"seller_id":"de6cb344-d5fd-11eb-aad4-8d3981060c25","discs":15,"price":28,"newfrom":19,"usedfrom":12,"edition":"Special Edition","form":"DVD","release_date":"2020-08-12T22:06:45.768Z"},{"seller_id":"de6cb345-d5fd-11eb-aad4-8d3981060c25","discs":5,"price":36,"newfrom":27,"usedfrom":14,"edition":"Special Extended Version","form":"Blu-ray","release_date":"2020-08-20T15:54:09.853Z"},{"seller_id":"de6cb346-d5fd-11eb-aad4-8d3981060c25","discs":29,"price":20,"newfrom":8,"usedfrom":26,"edition":"Limited Edition","form":"DVD","release_date":"2021-01-05T20:40:21.359Z"},{"seller_id":"de6cb347-d5fd-11eb-aad4-8d3981060c25","discs":35,"price":11,"newfrom":22,"usedfrom":28,"edition":"Collector's Edition","form":"DVD","release_date":"2020-09-08T19:28:11.269Z"}],"price":{"list_price":34,"price":28},"shipping":{"prime":true,"sold_by":"Ullrich, Konopelski and Cole","ships_from":"Ullrich, Konopelski and Cole"},"inventory":{"in_stock":true,"inventory":3359},"form":[{"price":26,"form":"DVD"},{"price":18,"form":"Blu-ray"},{"price":10,"form":"4K"},{"price":23,"form":"Prime Video"}]})
//         .expect(404)
//         .end(function(err, res) {
//           if (err) return done(err);
//           return done();
//         });
//     });
//   });