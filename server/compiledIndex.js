"use strict";

//var newrelic = require('newrelic');
////
var express = require('express');

var shrinkRay = require('shrink-ray-current');

var db = require('../database/index.js');

var Promise = require('bluebird');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var bug = String.fromCodePoint(0x1F41E);

var cluster = require('cluster');

var os = require('os');

var path = require('path');

var fs = require('fs');

var React = require('react');

var ReactDOMServer = require('react-dom/server');

var Overview = require('../client/src/index.jsx');

var renderToString = require('react-dom/server').renderToString;

var Memcached = require('memcached');

var memcached = new Memcached('localhost:11211', {
  retries: 10,
  retry: 10000,
  remove: true
});

require('babel-register')({
  presets: ['es2015', 'react']
});

var app = express();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.use(shrinkRay());
app.use(express["static"](path.join(__dirname, '/../client/dist'), {
  maxAge: '30d'
}));
app.use('/', function (req, res, next) {
  var html = ReactDOMServer.renderToString(React.createElement(Overview));
  res.send(html);
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});
app.get('*/dp/:productid', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

var cache = function cache(req, res, next) {
  memcached.get(req.url, function (err, data) {
    if (err) {
      res.status(500).send();
    }

    if (!data) {
      next();
    }

    if (data) {
      data = JSON.parse(data);
      res.status(200).json(data);
    }
  });
};

app.get('/overview/:productid', function (req, res) {
  console.log(req.params.productid);
  return new Promise(function (resolve, reject) {
    if (!req.params.productid) {
      throw id;
    }

    db.getRecord(req.params.productid, resolve, reject);
  }).then(function (record) {
    if (JSON.stringify(record) === "[]") {
      throw new Error("Error!");
    }

    var stringifiedRecord = JSON.stringify(record); // memcached.set(req.url, stringifiedRecord, 36000, function (err, data) {
    //   if (err) {throw err;}
    // })

    res.status(200).json(record);
  })["catch"](function (error) {
    console.log('error', error);
    res.status(404).send(error);
  });
});
app.post('/overview', jsonParser, function (req, res) {
  return new Promise(function (resolve, reject) {
    if (JSON.stringify(req.body) === '{}') {
      throw 'error';
    }

    db.createRecord(req.body, resolve, reject);
  }).then(function (record) {
    console.log(record);

    if (record === 201) {
      res.status(201).send();
    }
  })["catch"](function (error) {
    res.status(404).send(error);
  });
});
app["delete"]('/overview/:productid', jsonParser, function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.deleteRecord(req.params.productid, resolve, reject);
  }).then(function (deleteCount) {
    res.status(200).json('Successfully Deleted ' + deleteCount);
  })["catch"](function (error) {
    res.status(404).send(error);
  });
});
app.put('/overview/products/:productid', jsonParser, function (req, res) {
  var filter = req.body;
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.updateRecordProducts(req.params.productid, filter, resolve, reject);
  }).then(function (record) {
    if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
      throw new Error("error");
    }

    res.status(200).json('updated ' + JSON.stringify(record));
  })["catch"](function (error) {
    res.status(404).send('An error has occured');
  });
});
app.put('/overview/other_sellers/:productid', jsonParser, function (req, res) {
  var filter = req.body;
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.updateRecordSellers(req.params.productid, filter, resolve, reject);
  }).then(function (record) {
    if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
      throw new Error("error");
    }

    res.status(200).json('updated ' + JSON.stringify(record));
  })["catch"](function (error) {
    res.status(404).send('An error has occured ' + error);
  });
});
app.put('/overview/forms/:productid', jsonParser, function (req, res) {
  var filter = req.body;
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.updateRecordForms(req.params.productid, filter, resolve, reject);
  }).then(function (record) {
    if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
      throw new Error("error");
    }

    res.status(200).json('updated ' + JSON.stringify(record));
  })["catch"](function (error) {
    res.status(404).send('An error has occured');
  });
});
var urlAPISeller = '/overview-api/otherseller/:productid';
var urlAPIPrice = '/overview-api/price/:productid';
var urlAPIInventory = '/overview-api/inventory/:productid';
app.get(urlAPISeller, function (req, res, next) {
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.getOtherSellers(req.params.productid, resolve, reject);
  }).then(function (records) {
    res.send(records);
  })["catch"](function (error) {
    res.send('An error has occurred');
  });
});
app.get(urlAPIPrice, function (req, res, next) {
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.getPrice(req.params.productid, resolve, reject);
  }).then(function (price) {
    res.send(price);
  })["catch"](function (error) {
    res.send('An error has occurred');
  });
});
app.get(urlAPIInventory, function (req, res, next) {
  return new Promise(function (resolve, reject) {
    if (req.params.productid === undefined) {
      throw 'error';
    }

    db.getInventory(req.params.productid, resolve, reject);
  }).then(function (inventory) {
    res.send(inventory);
  })["catch"](function (error) {
    res.send('An error has occurred');
  });
});
var port = process.env.PORT || 5984;
var server = app.listen(port, function () {
  return console.log("Listening at port ".concat(port));
});
module.exports = server;
