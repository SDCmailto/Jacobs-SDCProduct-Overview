
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

describe('PUT fail /overview/other_sellers', function() {
  it('responds with 404 for failing to update record ', function(done) {
    request(app)
      .put('/overview/other_sellers')
      .send({"price": 3, "product_name": "Hey there :) "})
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('failed DELETE /overview', function() {
  it('responds with 404 for failed delete ', function(done) {
    request(app)
      .delete('/overview/2832928')
      .send({"product_id": "-2"})
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('POST /overview', function() {
  it('responds with 200 for successful post request', function(done) {
      request(app)
        .post('/overview')
        .send({
          "id": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
          "list_price": 13,
          "price": 11,
          "prime": "true",
          "sold_by": "Amazon.com",
          "ships_from": "Amazon.com",
          "product_id": 203939,
          "package_name": "Wooden",
          "product_name": "Tasty Steel Hat",
          "in_stock": "true",
          "inventory": 2774,
          "sellers": [
              {
                  "id": "426dd3a3-dae2-11eb-b9e7-c3a86b9617fb",
                  "discs": 28,
                  "price": 28,
                  "newfrom": "25",
                  "usedfrom": "20",
                  "edition": "Special Extended Version",
                  "form": "4K",
                  "release_date": "2021-02-22T21:30:15.718Z"
              },
              {
                  "id": "426dd3a1-dae2-11eb-b9e7-c3a86b9617fb",
                  "discs": 14,
                  "price": 16,
                  "newfrom": "15",
                  "usedfrom": "11",
                  "edition": "Collector's Edition",
                  "form": "Blu-ray",
                  "release_date": "2021-06-15T01:48:29.295Z"
              },
              {
                  "id": "426dd3a4-dae2-11eb-b9e7-c3a86b9617fb",
                  "discs": 2,
                  "price": 6,
                  "newfrom": "6",
                  "usedfrom": "4",
                  "edition": "Special Edition",
                  "form": "DVD",
                  "release_date": "2021-01-29T07:11:45.479Z"
              },
              {
                  "id": "426dd3a0-dae2-11eb-b9e7-c3a86b9617fb",
                  "discs": 37,
                  "price": 34,
                  "newfrom": "31",
                  "usedfrom": "25",
                  "edition": "Limited Edition",
                  "form": "4K",
                  "release_date": "2020-07-28T04:48:14.956Z"
              },
              {
                  "id": "426dd3a2-dae2-11eb-b9e7-c3a86b9617fb",
                  "discs": 8,
                  "price": 11,
                  "newfrom": "10",
                  "usedfrom": "7",
                  "edition": "Special Edition",
                  "form": "DVD",
                  "release_date": "2020-10-23T19:06:20.526Z"
              }
          ],
          "forms": [
              {
                  "id": "426dd3a5-dae2-11eb-b9e7-c3a86b9617fb",
                  "price": 8,
                  "form": "DVD",
                  "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
                  "product_id": 203939
              },
              {
                  "id": "426dd3a6-dae2-11eb-b9e7-c3a86b9617fb",
                  "price": 20,
                  "form": "Blu-ray",
                  "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
                  "product_id": 203939
              },
              {
                  "id": "426dd3a7-dae2-11eb-b9e7-c3a86b9617fb",
                  "price": 37,
                  "form": "4K",
                  "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
                  "product_id": 203939
              },
              {
                  "id": "426dd3a8-dae2-11eb-b9e7-c3a86b9617fb",
                  "price": 38,
                  "form": "Prime Video",
                  "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
                  "product_id": 203939
              }
          ]
      })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /overview', function() {
    it('responds with 404 for failed post request', function(done) {
        request(app)
          .post('/overview')
          .send({"hi there": 92})
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
    });