//var newrelic = require('newrelic');
////
const express = require('express');
const shrinkRay = require('shrink-ray-current');
const db = require('../database/index.js');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bug = String.fromCodePoint(0x1F41E);
const cluster = require('cluster')
const os = require('os')
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const  Overview = require('../client/src/index.jsx');
const renderToString = require('react-dom/server').renderToString;
var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211', {retries: 10, retry: 10000, remove: true});
//require('babel-register')({
   // presets: ['es2015', 'react']
//});


  const app = express();
  var urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.use(shrinkRay());

  app.use(express.static(path.join(__dirname, '/../client/dist'), {maxAge: '30d'}));
  
 // app.use('/', (req, res, next) => {
	     // var html = ReactDOMServer.renderToString(
       // React.createElement(Overview)
   // );
   // res.send(html);
   // });

  app.use( (req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
  });

  app.get('*/dp/:productid', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  });

  let cache = (req, res, next) => {memcached.get(req.url, function (err, data) {
    if (err) { res.status(500).send();}
    if (!data) {
      next();
    }
    if (data) {
      data = JSON.parse(data);
      res.status(200).json(data);
    }
  });
}
  app.get('/overview/:productid', (req, res) => {
    console.log(req.params.productid);
    return new Promise ((resolve, reject) => {
      if (!req.params.productid) {
        throw id;
      }
      db.getRecord(req.params.productid, resolve, reject);
    })
    .then(record => {
      if (JSON.stringify(record) === "[]") {
        throw new Error("Error!");
      }
      let stringifiedRecord = JSON.stringify(record);

      // memcached.set(req.url, stringifiedRecord, 36000, function (err, data) {
      //   if (err) {throw err;}
      // })
      res.status(200).json(record);
    })
    .catch(error => {
      console.log('error', error);
      res.status(404).send(error);
    })
  });


  app.post('/overview', jsonParser ,(req, res) => {
	console.log(req.body);
    return new Promise ((resolve, reject) => {
      if (JSON.stringify(req.body) === '{}') {
        throw 'error';
      }
      db.createRecord(req.body, resolve, reject);
    })
    .then(record => {
	    console.log(record);
      if (record === 201) {
	  // res.setHeader("Access-Control-Allow-Origin", "*");
   // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");      
        res.status(201).send();
      }
    })
    .catch(error => {
      res.status(404).send(error);
    })
  })

  app.delete('/overview/:productid', jsonParser, (req, res) => {
    return new Promise ((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.deleteRecord(req.params.productid, resolve, reject);
    })
    .then(deleteCount => {
      res.status(200).json('Successfully Deleted ' + deleteCount);
    })
    .catch(error => {
      res.status(404).send(error);
    })
  })

  app.put('/overview/products/:productid', jsonParser, (req, res) => {
    let filter = req.body;
    return new Promise ((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.updateRecordProducts(req.params.productid, filter, resolve, reject);
    })
    .then(record => {
      if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
        throw new Error ("error");
      }
      res.status(200).json('updated ' + JSON.stringify(record));
    })
    .catch(error => {
      res.status(404).send('An error has occured');
    })
  })

  app.put('/overview/other_sellers/:productid', jsonParser, (req, res) => {
    let filter = req.body;
    return new Promise ((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.updateRecordSellers(req.params.productid, filter, resolve, reject);
    })
    .then(record => {
      if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
        throw new Error ("error");
      }
      res.status(200).json('updated ' + JSON.stringify(record));
    })
    .catch(error => {
      res.status(404).send('An error has occured ' + error);
    })
  })

  app.put('/overview/forms/:productid', jsonParser, (req, res) => {
    let filter = req.body;
    return new Promise ((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.updateRecordForms(req.params.productid, filter, resolve, reject);
    })
    .then(record => {
      if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
        throw new Error ("error");
      }
      res.status(200).json('updated ' + JSON.stringify(record));
    })
    .catch(error => {
      res.status(404).send('An error has occured');
    })
  })

  const urlAPISeller = '/overview-api/otherseller/:productid';
  const urlAPIPrice = '/overview-api/price/:productid';
  const urlAPIInventory = '/overview-api/inventory/:productid';

  app.get(urlAPISeller, (req, res, next) => {

    return new Promise ((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.getOtherSellers(req.params.productid, resolve, reject);
    })
      .then(records => {
        res.send(records);
      })
      .catch(error => {
        res.send('An error has occurred');
      })
  })

  app.get(urlAPIPrice, (req, res, next) => {
    return new Promise((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.getPrice(req.params.productid, resolve, reject);
    })
      .then(price => {
        res.send(price);
      })
      .catch(error => {
        res.send('An error has occurred');
      })
  })

  app.get(urlAPIInventory, (req, res, next) => {
    return new Promise((resolve, reject) => {
      if (req.params.productid === undefined) {
        throw 'error';
      }
      db.getInventory(req.params.productid, resolve, reject);
    })
      .then(inventory => {
        res.send(inventory);
      })
      .catch(error => {
        res.send('An error has occurred');
      })
  })

  const port = process.env.PORT || 5984;


  const server = app.listen(port, () => console.log(`Listening at port ${port}`));
  module.exports = server;



