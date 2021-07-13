const express = require('express');
const app = express();
const shrinkRay = require('shrink-ray-current');
const db = require('../database/index.js');
const path = require('path');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(shrinkRay());

app.use(express.static(path.join(__dirname, '/../client/dist'), {maxAge: '30d'}));

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});

app.get('*/dp/:productid', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/overview/:productid', (req, res) => {
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
    res.json(record);
  })
  .catch(error => {
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
    if (record === 201) {
      res.status(201).json("Success");
    }
  })
  .catch(error => {
    res.status(404).send(error);
  })
})

app.delete('/overview', jsonParser, (req, res) => {
  Promise.resolve(req.body)
  .then(body => {
    if (!body) {
      throw body;
    }
    return db.Overview.deleteOne(body);
  })
  .then(record => {
    if (JSON.stringify(record) === '{"n":0,"ok":1,"deletedCount":0}') {
      throw new Error("Error");
    }
    res.status(200).json('deleted' + JSON.stringify(record));
  })
  .catch(error => {
    res.status(404).send(error);
  })
})

app.put('/overview', jsonParser, (req, res) => {
  Promise.resolve(req.body)
  .then(body => {
    if (!body) {
      throw body;
    }
    return db.Overview.updateOne(body[0], body[1]);
  })
  .then(record => {
    if (JSON.stringify(record) === '{"n":0,"nModified":0,"ok":1}') {
      throw new Error ("error");
    }
    res.status(200).json('updated' + JSON.stringify(record));
  })
  .catch(error => {
    res.status(404).send('An error has occured');
  })
})

const urlAPISeller = '/overview-api/otherseller/:productid';
const urlAPIPrice = '/overview-api/price/:productid';
const urlAPIInventory = '/overview-api/inventory/:productid';

app.get(urlAPISeller, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].other_sellers);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get(urlAPIPrice, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].price);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get(urlAPIInventory, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].inventory);
      next();
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

const port = process.env.PORT || 5984;
// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// })

const server = app.listen(port, () => console.log(`Listening at port ${port}`));
module.exports = server;
